import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { THEME_COLOR } from '@/i18n/content';
import { OG_IMAGE } from '@/lib/site';

/**
 * Ảnh chia sẻ mạng xã hội 1200×630 (JPEG cho nhẹ) ghép lúc build từ logo + bìa 3 game (không cần sửa tay khi đổi bìa).
 * Không vẽ chữ: librsvg trên máy build không chắc có font Baloo 2.
 */
// Đường dẫn theo thư mục gốc project (import.meta.url đổi chỗ sau khi bundle).
const asset = (name: string) => readFile(join(process.cwd(), 'src/assets', name));

async function card(name: string, width: number, angle: number) {
  const height = Math.round((width * 9) / 16);
  const border = 8;
  const radius = 22;
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius - border}"/></svg>`,
  );
  const cover = await sharp(await asset(`games/${name}.png`))
    .resize(width - border * 2, height - border * 2, { fit: 'cover' })
    .composite([
      {
        input: await sharp(mask)
          .resize(width - border * 2, height - border * 2)
          .png()
          .toBuffer(),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();
  const frame = Buffer.from(
    `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`,
  );
  return sharp(frame)
    .composite([{ input: cover, top: border, left: border }])
    .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

export const GET: APIRoute = async () => {
  const { width, height } = OG_IMAGE;
  const background = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${THEME_COLOR}"/>
          <stop offset="1" stop-color="#3d1767"/>
        </linearGradient>
        <radialGradient id="sun" cx="0.85" cy="0.1" r="0.5">
          <stop offset="0" stop-color="#ffd23f" stop-opacity="0.45"/>
          <stop offset="1" stop-color="#ffd23f" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#sun)"/>
    </svg>`);

  const logoSize = 300;
  const logo = await sharp(await asset('logo.png'))
    .resize(logoSize, logoSize)
    .png()
    .toBuffer();
  const [left, middle, right] = await Promise.all([
    card('bread-catcher', 400, -7),
    card('phonics-ocean', 400, 6),
    card('food-stream', 500, -2),
  ]);

  const png = await sharp(background)
    .composite([
      { input: logo, top: Math.round((height - logoSize) / 2), left: 70 },
      { input: left, top: 40, left: 430 },
      { input: middle, top: 330, left: 760 },
      { input: right, top: 160, left: 560 },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/jpeg' } });
};
