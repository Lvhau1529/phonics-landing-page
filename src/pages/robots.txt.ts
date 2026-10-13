import type { APIRoute } from 'astro';

/** robots.txt sinh lúc build để link sitemap luôn khớp SITE_URL. */
export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap-index.xml', site).href}`, ''].join('\n'),
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
