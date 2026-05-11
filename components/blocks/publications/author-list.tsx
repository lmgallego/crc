import { TEAM } from '@/lib/data/team';

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

function authorMatchesMemberSlug(author: string, slug: string): boolean {
  const member = TEAM.find((m) => m.slug === slug);
  if (!member) return false;
  const a = normalize(author);
  const surnameTokens = normalize(member.surname)
    .split(/[\s-]+/)
    .filter((t) => t.length >= 3);
  return surnameTokens.some((token) => a.includes(token));
}

export function AuthorList({
  authors,
  crcAuthors,
  className,
}: {
  authors: string[];
  crcAuthors: string[];
  className?: string;
}) {
  return (
    <p className={className ?? 'text-xs md:text-sm text-foreground/70 mt-1.5'}>
      {authors.map((author, i) => {
        const isCrc = crcAuthors.some((slug) =>
          authorMatchesMemberSlug(author, slug),
        );
        return (
          <span key={`${i}-${author}`}>
            {i > 0 ? ', ' : ''}
            <span className={isCrc ? 'text-accent-dark font-medium' : ''}>
              {author}
            </span>
          </span>
        );
      })}
    </p>
  );
}
