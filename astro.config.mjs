// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { existsSync } from 'node:fs';

// .env chỉ bổ sung, không ghi đè biến môi trường đã có (vd biến cấu hình trên Vercel).
if (existsSync('.env')) process.loadEnvFile('.env');
const env = process.env;
const isBuild = process.argv.includes('build');

// Canonical / hreflang / sitemap / OG đều lấy từ `site` — build production mà thiếu thì dừng hẳn,
// tránh phát hành trang với canonical trỏ về localhost.
// Landing ở domain gốc (SITE_URL); nút chơi trỏ sang domain game (PUBLIC_GAME_URL). Thiếu một trong hai thì dừng
// build để không phát hành canonical / link CTA trỏ về localhost.
if (isBuild) {
  const missing = ['SITE_URL', 'PUBLIC_GAME_URL'].filter((key) => !env[key]);
  if (missing.length) throw new Error(`Thiếu ${missing.join(', ')} khi build. Xem .env.example.`);
}
/** @typedef {{ src: [string]; weight: number; style: 'normal'; display: 'swap'; unicodeRange: [string] }} FontVariant */

// unicode-range theo Fontsource: trình duyệt chỉ tải subset vietnamese khi trang có chữ có dấu.
const FONT_SUBSETS = {
  latin:
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  vietnamese:
    'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB',
};

const site = (env.SITE_URL || 'http://localhost:4321').replace(/\/$/, '');

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  // Tiếng Việt là ngôn ngữ chính (giáo viên / phụ huynh VN) ở "/", tiếng Anh ở "/en/".
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'vi', locales: { vi: 'vi', en: 'en' } },
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  // Font tự host từ file của @fontsource (không gọi mạng lúc build / lúc chạy); Astro sinh fallback có
  // size-adjust → giảm CLS. Khai báo tay từng weight × subset vì provider npm chỉ lấy được weight 400.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Baloo 2',
      cssVariable: '--font-baloo',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: /** @type {[FontVariant, ...FontVariant[]]} */ (
          [500, 700, 800].flatMap((weight) =>
            Object.entries(FONT_SUBSETS).map(([subset, unicodeRange]) => ({
              src: /** @type {[string]} */ ([
                `@fontsource/baloo-2/files/baloo-2-${subset}-${weight}-normal.woff2`,
              ]),
              weight,
              style: /** @type {const} */ ('normal'),
              display: /** @type {const} */ ('swap'),
              unicodeRange: /** @type {[string]} */ ([unicodeRange]),
            })),
          )
        ),
      },
    },
  ],
  image: { responsiveStyles: true },
});
