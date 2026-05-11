import fs from 'node:fs';
import path from 'node:path';
import { PUBLICATIONS as SEEDS, type Publication, type PublicationTopic } from './publications';

type OverlayEntry = Partial<
  Pick<
    Publication,
    'isFeatured' | 'topics' | 'quartile' | 'impactFactor' | 'citations' | 'title'
  >
>;

function loadCache(): Publication[] {
  try {
    const p = path.join(process.cwd(), 'lib/data/orcid-cache.json');
    const raw = fs.readFileSync(p, 'utf8');
    const parsed = JSON.parse(raw);
    const arr: Publication[] = Array.isArray(parsed) ? parsed : (parsed.publications ?? []);
    return arr.map((p) => ({ ...p, topics: p.topics ?? [] }));
  } catch {
    return [];
  }
}

function loadOverlay(): Record<string, OverlayEntry> {
  try {
    const p = path.join(process.cwd(), 'lib/data/publications-overlay.json');
    const raw = fs.readFileSync(p, 'utf8');
    const parsed = JSON.parse(raw) as Record<string, OverlayEntry>;
    return Object.fromEntries(
      Object.entries(parsed).filter(([k]) => !k.startsWith('__')),
    ) as Record<string, OverlayEntry>;
  } catch {
    return {};
  }
}

const ORCID_CACHE = loadCache();
const OVERLAY = loadOverlay();

function applyOverlay(p: Publication): Publication {
  if (!p.doi) return p;
  const o = OVERLAY[p.doi.toLowerCase()];
  if (!o) return p;
  return {
    ...p,
    ...o,
    topics: (o.topics as PublicationTopic[] | undefined) ?? p.topics,
  };
}

export function getMergedPublications(): Publication[] {
  const keyFor = (p: Publication) => (p.doi ? p.doi.toLowerCase() : p.id);
  const byKey = new Map<string, Publication>();
  for (const p of ORCID_CACHE) {
    byKey.set(keyFor(p), applyOverlay(p));
  }
  for (const seed of SEEDS) {
    const k = keyFor(seed);
    const existing = byKey.get(k);
    if (existing) {
      byKey.set(k, {
        ...existing,
        ...seed,
        crcAuthors: Array.from(
          new Set([...(existing.crcAuthors ?? []), ...(seed.crcAuthors ?? [])]),
        ),
        topics: seed.topics?.length ? seed.topics : existing.topics,
      });
    } else {
      byKey.set(k, seed);
    }
  }
  return Array.from(byKey.values()).sort((a, b) => b.year - a.year);
}

export function getPublicationsByAuthor(slug: string): Publication[] {
  return getMergedPublications().filter((p) => p.crcAuthors.includes(slug));
}

export function getPublicationStats(pubs: Publication[]) {
  const total = pubs.length;
  const years = pubs.map((p) => p.year).filter((y) => Number.isFinite(y));
  const currentYear = new Date().getFullYear();
  const oldestYear = years.length ? Math.min(...years) : currentYear;
  const newestYear = years.length ? Math.max(...years) : currentYear;
  const yearsActive = years.length ? newestYear - oldestYear + 1 : 0;
  const q1Count = pubs.filter((p) => p.quartile === 'Q1').length;
  const authorCounts = new Map<string, number>();
  for (const p of pubs) {
    for (const a of p.crcAuthors) {
      authorCounts.set(a, (authorCounts.get(a) ?? 0) + 1);
    }
  }
  const topAuthor = Array.from(authorCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
  return { total, oldestYear, newestYear, yearsActive, q1Count, topAuthor };
}
