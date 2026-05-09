import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

type Locale = 'es' | 'en';

export type PostListItem = {
  slug: string;
  title: string;
  publishedAt: string;
  category: string;
  author: string;
  excerpt: string;
  coverImage: string | null;
};

export async function getPosts(locale: Locale): Promise<PostListItem[]> {
  const collection = locale === 'es' ? 'posts_es' : 'posts_en';
  try {
    const posts = await reader.collections[collection].all();
    return posts
      .map((p) => ({
        slug: p.slug,
        title: p.entry.title,
        publishedAt: p.entry.publishedAt ?? '',
        category: p.entry.category,
        author: p.entry.author,
        excerpt: p.entry.excerpt,
        coverImage: p.entry.coverImage ?? null,
      }))
      .filter((p) => p.publishedAt)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  } catch {
    return [];
  }
}

export async function getPost(locale: Locale, slug: string) {
  const collection = locale === 'es' ? 'posts_es' : 'posts_en';
  try {
    return await reader.collections[collection].read(slug);
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(locale: Locale) {
  const collection = locale === 'es' ? 'posts_es' : 'posts_en';
  try {
    return await reader.collections[collection].list();
  } catch {
    return [];
  }
}
