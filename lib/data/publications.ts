export type PublicationTopic =
  | 'physiology'
  | 'biomechanics'
  | 'nutrition'
  | 'training'
  | 'doping'
  | 'psychology'
  | 'ai'
  | 'methodology';

export type Publication = {
  id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  topics: PublicationTopic[];
  crcAuthors: string[];
  isFeatured?: boolean;
  citations?: number;
  quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  impactFactor?: number;
};

export const PUBLICATIONS: Publication[] = [
  {
    id: 'zabala-2025-cycling-3',
    year: 2025,
    title:
      'From Cycling 1.0 and 2.0 to Cycling 3.0: A New Paradigm for Performance, Ethics, and Artificial Intelligence in the Era of Data-Driven Cycling Science',
    authors: ['Zabala M'],
    journal: 'Journal of Science and Cycling',
    topics: ['methodology', 'ai', 'doping'],
    crcAuthors: ['mikel-zabala'],
    isFeatured: true,
    url: 'https://www.jsc-journal.com',
  },
  {
    id: 'zabala-atkinson-2012-athlete-2',
    year: 2012,
    title: 'Cycling Studies — A modest contribution',
    authors: ['Zabala M', 'Atkinson G'],
    journal: 'Journal of Science and Cycling',
    topics: ['methodology'],
    crcAuthors: ['mikel-zabala'],
    isFeatured: true,
    url: 'https://www.jsc-journal.com',
  },
];

export const ALL_TOPICS: PublicationTopic[] = [
  'physiology',
  'biomechanics',
  'nutrition',
  'training',
  'doping',
  'psychology',
  'ai',
  'methodology',
];

export type PublicationFilters = {
  year?: number;
  topics?: PublicationTopic[];
  authors?: string[];
  q?: string;
};

export function filterPublications(
  pubs: Publication[],
  filters: PublicationFilters,
) {
  const q = filters.q?.toLowerCase().trim();
  return pubs.filter((p) => {
    if (filters.year && p.year !== filters.year) return false;
    if (filters.topics && filters.topics.length > 0) {
      const has = filters.topics.some((t) => p.topics.includes(t));
      if (!has) return false;
    }
    if (filters.authors && filters.authors.length > 0) {
      const has = filters.authors.some((a) => p.crcAuthors.includes(a));
      if (!has) return false;
    }
    if (q) {
      const haystack = (p.title + ' ' + p.authors.join(' ')).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function groupPublicationsByYear(pubs: Publication[]) {
  const map = new Map<number, Publication[]>();
  for (const p of pubs) {
    const arr = map.get(p.year) ?? [];
    arr.push(p);
    map.set(p.year, arr);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export function publicationsForMember(slug: string) {
  return PUBLICATIONS.filter((p) => p.crcAuthors.includes(slug));
}
