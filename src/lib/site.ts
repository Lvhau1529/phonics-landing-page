import { BRAND, CONTENT, GAMES, LOCALE_META, LOCALES, type Locale } from '@/i18n/content';

/** URL app game; nút CTA / từng game trỏ về đây (hash route `#/<game-id>` của phonics-game). */
export const GAME_URL = (import.meta.env.PUBLIC_GAME_URL || 'http://localhost:5173').replace(/\/$/, '');

export const gameLink = (id?: string): string => (id ? `${GAME_URL}/#/${id}` : `${GAME_URL}/`);

/** URL tuyệt đối theo `site` trong astro.config (SITE_URL). */
export const absolute = (site: URL | undefined, path: string): string => new URL(path, site).href;

export const OG_IMAGE = { path: '/og.jpg', width: 1200, height: 630 } as const;

/**
 * JSON-LD (một @graph): Organization + WebSite + WebPage + từng game (VideoGame) + FAQPage.
 * Chỉ khai báo dữ liệu có thật trên trang — không thêm aggregateRating / review / offers khi chưa có.
 */
export function buildJsonLd(
  site: URL | undefined,
  locale: Locale,
  logoUrl: string,
  covers: Record<string, string>,
) {
  const c = CONTENT[locale];
  const home = absolute(site, '/');
  const pageUrl = absolute(site, LOCALE_META[locale].path);
  const orgId = `${home}#organization`;
  const siteId = `${home}#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: BRAND,
        url: home,
        logo: { '@type': 'ImageObject', url: logoUrl, width: 512, height: 512 },
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        name: BRAND,
        url: home,
        inLanguage: LOCALES.map((l) => LOCALE_META[l].htmlLang),
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: LOCALE_META[locale].htmlLang,
        isPartOf: { '@id': siteId },
        about: { '@id': `${pageUrl}#games` },
        primaryImageOfPage: { '@type': 'ImageObject', url: absolute(site, OG_IMAGE.path) },
        potentialAction: { '@type': 'PlayAction', target: gameLink() },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#games`,
        name: c.games.title,
        itemListElement: GAMES.map((game, index) => {
          const copy = c.games.items[game.id];
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'VideoGame',
              name: game.name,
              description: copy.description,
              url: gameLink(game.id),
              image: covers[game.id],
              genre: 'Educational',
              gamePlatform: 'Web browser',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Any (web browser)',
              inLanguage: 'en',
              typicalAgeRange: '4-6',
              teaches: copy.skills,
              educationalUse: 'Phonics practice',
              publisher: { '@id': orgId },
            },
          };
        }),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: LOCALE_META[locale].htmlLang,
        mainEntity: c.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}
