/**
 * Sincroniza publicaciones desde ORCID para todos los miembros del CRC
 * que tengan orcidId definido en team.ts.
 *
 * Uso: pnpm fetch:orcid
 *
 * Output: lib/data/orcid-cache.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { TEAM } from '../lib/data/team';
import { FEATURES } from '../lib/config/features';
import type { PublicationTopic } from '../lib/data/publications';

const TOPIC_KEYWORDS: Record<PublicationTopic, string[]> = {
  physiology: [
    'vo2', 'lactate', 'physiolog', 'oxygen', 'hemoglobin', 'hypoxia',
    'altitude', 'critical power', 'threshold', 'aerobic', 'anaerobic',
    'spo2', 'erythropoietin', 'oxidative', 'antioxidant',
    'anthropometric', 'body composition', 'somatotype',
  ],
  training: [
    'training', 'periodization', 'load', 'workload', 'zone 2', 'durability',
    'fatigue', 'recovery', 'taper', 'overreaching', 'detraining',
    'high-intensity', 'hiit', 'endurance', 'pacing',
  ],
  nutrition: [
    'nutrition', 'carbohydrate', 'supplementation', 'l-carnitine',
    'alpha-lipoic', 'hydration', 'dietary', 'ergogenic', 'caffeine',
    'sodium bicarbonate', 'bicarbonate', 'beetroot', 'eating disorder',
    'food', 'diet',
  ],
  biomechanics: [
    'biomechan', 'pedaling', 'pedalling', 'cadence', 'torque',
    'kinematic', 'asymmetr', 'q-ring', 'chainring', 'crank',
    'aerodynamic', 'drag area', 'bike fit', 'spine', 'hamstring',
  ],
  psychology: [
    'psycholog', 'cognitive', 'mental', 'attention', 'attentional',
    'perception', 'effort', 'rpe', 'subjective experience',
    'self-paced', 'eeg', 'brain', 'tdcs', 'transcranial',
    'mental fatigue', 'stimulation', 'neural', 'oscillatory',
  ],
  doping: [
    'doping', 'antidoping', 'anti-doping', 'wada', 'ethics',
    'tramadol', 'attitude', 'enhancement', 'tdcs', 'transcranial',
  ],
  ai: [
    'artificial intelligence', 'machine learning', 'neural network',
    'deep learning', 'algorithm',
  ],
  methodology: [
    'review', 'meta-analysis', 'systematic', 'methodology',
    'reliability', 'validity', 'normative values',
    'record power profile', 'validation', 'reproducib',
  ],
};

function inferTopics(title: string, journal: string): PublicationTopic[] {
  const text = `${title} ${journal}`.toLowerCase();
  const topics: PublicationTopic[] = [];
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS) as [
    PublicationTopic,
    string[],
  ][]) {
    if (keywords.some((kw) => text.includes(kw))) {
      topics.push(topic);
    }
  }
  return topics.length > 0 ? topics : ['training'];
}

const ORCID_BASE = 'https://pub.orcid.org/v3.0';
const HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'CRC-Web/1.0 (https://crc.org)',
};
const THROTTLE_MS = 250;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type FetchedWork = {
  id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  doi?: string;
  url?: string;
  topics: string[];
  crcAuthors: string[];
};

async function fetchJson(url: string, retries = 3): Promise<any> {
  let lastErr: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.status === 404) return { __notFound: true };
      if (res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      if (i < retries - 1) await sleep(500 * Math.pow(2, i));
    }
  }
  throw lastErr;
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function normalizeDoi(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .trim();
}

function mapWork(work: any, ownerSlug: string): FetchedWork | null {
  const ext = work['external-ids']?.['external-id'] ?? [];
  const doiEntry = ext.find(
    (e: any) => e['external-id-type']?.toLowerCase() === 'doi',
  );
  const doi = doiEntry?.['external-id-value']
    ? normalizeDoi(doiEntry['external-id-value'])
    : undefined;
  const yearVal = work['publication-date']?.year?.value;
  const year = yearVal ? parseInt(yearVal, 10) : NaN;
  const title = work.title?.title?.value;
  if (!title || !Number.isFinite(year)) return null;
  const authors: string[] = (work.contributors?.contributor ?? [])
    .map((c: any) => c['credit-name']?.value)
    .filter(Boolean);
  const journal = work['journal-title']?.value ?? '';
  const id = doi ?? `${slugifyTitle(title)}-${year}`;
  const url = doi ? `https://doi.org/${doi}` : work.url?.value;
  return {
    id,
    year,
    title,
    authors,
    journal,
    doi,
    url,
    topics: FEATURES.orcidAutoTopics ? inferTopics(title, journal) : [],
    crcAuthors: [ownerSlug],
  };
}

async function fetchMember(
  orcidId: string,
  slug: string,
): Promise<FetchedWork[]> {
  const summary = await fetchJson(`${ORCID_BASE}/${orcidId}/works`);
  if (summary?.__notFound) {
    console.warn(`  ⚠  ORCID 404 for ${slug} (${orcidId}) — verificar ID`);
    return [];
  }
  const groups = summary?.group ?? [];
  const putCodes: number[] = [];
  for (const g of groups) {
    const sum = g['work-summary']?.[0];
    if (sum?.['put-code']) putCodes.push(sum['put-code']);
  }
  const works: FetchedWork[] = [];
  let skipped = 0;
  for (const pc of putCodes) {
    await sleep(THROTTLE_MS);
    try {
      const detail = await fetchJson(`${ORCID_BASE}/${orcidId}/work/${pc}`);
      const mapped = mapWork(detail, slug);
      if (mapped) works.push(mapped);
      else skipped++;
    } catch (e) {
      skipped++;
      console.warn(
        `  ⚠  Error en put-code ${pc} de ${slug}: ${(e as Error).message}`,
      );
    }
  }
  if (skipped > 0) console.warn(`  ⚠  ${skipped} works skipped`);
  return works;
}

async function main() {
  const members = TEAM.filter((m) => m.orcidId);
  console.log(`Fetching ORCID data for ${members.length} members...\n`);

  const all: FetchedWork[] = [];
  let memberErrors = 0;

  for (const m of members) {
    console.log(`→ ${m.slug} (${m.orcidId})`);
    try {
      const works = await fetchMember(m.orcidId!, m.slug);
      console.log(`  ✓ ${works.length} works`);
      all.push(...works);
    } catch (e) {
      memberErrors++;
      console.error(`  ✗ Falló para ${m.slug}: ${(e as Error).message}`);
      console.error('Abortando. El cache anterior se conserva intacto.');
      process.exit(1);
    }
    await sleep(THROTTLE_MS);
  }

  // Dedupe by DOI (fallback compuesto)
  const byKey = new Map<string, FetchedWork>();
  for (const w of all) {
    const key =
      w.doi ?? `${slugifyTitle(w.title)}|${w.year}|${(w.authors[0] ?? '').toLowerCase()}`;
    const existing = byKey.get(key);
    if (existing) {
      existing.crcAuthors = Array.from(
        new Set([...existing.crcAuthors, ...w.crcAuthors]),
      );
    } else {
      byKey.set(key, { ...w });
    }
  }
  const deduped = Array.from(byKey.values()).sort((a, b) => b.year - a.year);

  const outPath = path.join(process.cwd(), 'lib/data/orcid-cache.json');
  fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2) + '\n', 'utf8');

  const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`\n=== Resumen ===`);
  console.log(`Total fetched:      ${all.length}`);
  console.log(`After deduplication: ${deduped.length}`);
  console.log(`Member errors:      ${memberErrors}`);
  console.log(`Output:             ${outPath} (${sizeKb} KB)`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
