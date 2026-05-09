import { config, fields, collection } from '@keystatic/core';

const AUTHOR_OPTIONS = [
  { label: 'Mikel Zabala', value: 'mikel-zabala' },
  { label: 'Manuel Mateo-March', value: 'manuel-mateo-march' },
  { label: 'Daniel Sanabria', value: 'daniel-sanabria' },
  { label: 'Cristóbal Sánchez-Muñoz', value: 'cristobal-sanchez-munoz' },
  { label: 'Alejandro Javaloyes', value: 'alejandro-javaloyes' },
  { label: 'José Joaquín Muros', value: 'jose-joaquin-muros' },
  { label: 'Juan José Pérez Díaz', value: 'juan-jose-perez-diaz' },
  { label: 'Alejandro de Rozas', value: 'alejandro-de-rozas' },
  { label: 'Xabier Zabala', value: 'xabier-zabala' },
  { label: 'Ignacio Valdivia', value: 'ignacio-valdivia' },
  { label: 'Luisma Gallego', value: 'luisma-gallego' },
];

const CATEGORY_OPTIONS = [
  { label: 'Fisiología', value: 'physiology' },
  { label: 'Biomecánica', value: 'biomechanics' },
  { label: 'Nutrición', value: 'nutrition' },
  { label: 'Entrenamiento', value: 'training' },
  { label: 'Ciclismo 3.0', value: 'cycling-3-0' },
  { label: 'Antidopaje', value: 'doping' },
  { label: 'Equipo', value: 'team' },
];

const postSchema = {
  title: fields.slug({ name: { label: 'Título' } }),
  publishedAt: fields.date({ label: 'Fecha de publicación' }),
  category: fields.select({
    label: 'Categoría',
    options: CATEGORY_OPTIONS,
    defaultValue: 'training',
  }),
  author: fields.select({
    label: 'Autor',
    options: AUTHOR_OPTIONS,
    defaultValue: 'mikel-zabala',
  }),
  excerpt: fields.text({ label: 'Resumen', multiline: true }),
  coverImage: fields.image({
    label: 'Imagen de portada',
    directory: 'public/blog',
    publicPath: '/blog/',
  }),
  relatedPublications: fields.array(
    fields.text({ label: 'DOI o URL del paper' }),
    { label: 'Publicaciones relacionadas', itemLabel: (p) => p.value },
  ),
  content: fields.markdoc({
    label: 'Contenido',
    options: {
      image: { directory: 'public/blog', publicPath: '/blog/' },
    },
  }),
};

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Cycling Research Center' },
  },
  collections: {
    posts_es: collection({
      label: 'Artículos (ES)',
      slugField: 'title',
      path: 'content/posts/es/*',
      format: { contentField: 'content' },
      schema: postSchema,
    }),
    posts_en: collection({
      label: 'Posts (EN)',
      slugField: 'title',
      path: 'content/posts/en/*',
      format: { contentField: 'content' },
      schema: postSchema,
    }),
  },
});
