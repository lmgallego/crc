import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Imágenes optimizadas
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Si Keystatic guarda imágenes en algún CDN externo, añadir aquí
    ],
  },

  // Headers de seguridad básicos
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Experimental features de Next 15
  experimental: {
    // optimizePackageImports: ['lucide-react'], // descomentar si compilación lenta
  },
};

export default withNextIntl(nextConfig);
