/**
 * Feature flags del sitio CRC.
 * Permiten activar/desactivar funcionalidades sin tocar código.
 */
export const FEATURES = {
  /**
   * Integración con ORCID para sincronización automática de publicaciones.
   * Si false: las fichas muestran el placeholder "100+ publicaciones..." y
   * la página /publicaciones usa solo los seeds de publications.ts.
   * Si true: activo todo el sistema ORCID.
   */
  orcidPublications: true,
} as const;
