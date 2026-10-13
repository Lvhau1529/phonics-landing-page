# 🌼 Phonics Arcade — Landing page

Landing page tĩnh (Astro, SSG) cho bộ game phonics **Phonics Arcade**, tối ưu SEO. Chạy ở **domain gốc**; mọi nút
"Chơi ngay" / "Chơi <game>" dẫn sang **domain game** (repo `phonics-game`, hash route `/#/<game-id>`).

| Trang       | Ngôn ngữ                           |
| ----------- | ---------------------------------- |
| `/`         | Tiếng Việt (mặc định, `x-default`) |
| `/en/`      | English                            |
| `/404.html` | noindex                            |

## Chạy

```bash
pnpm install
cp .env.example .env   # điền SITE_URL (domain gốc) + PUBLIC_GAME_URL (domain game)
pnpm dev               # http://localhost:4321
pnpm build             # astro check + build vào dist/ (thiếu SITE_URL / PUBLIC_GAME_URL thì dừng)
pnpm preview
```

Trên Vercel: đặt `SITE_URL` và `PUBLIC_GAME_URL` trong Environment Variables của project (`vercel.json` đã có
header bảo mật + cache dài hạn cho `/_astro/*`).

## SEO đã làm

- **HTML render sẵn, 0 KB JavaScript** phía client (FAQ dùng `<details>`); CSS inline → không có request chặn render.
- Mỗi trang: `title` / `description` riêng theo ngôn ngữ, `canonical`, `hreflang` vi / en / x-default, `robots`
  (`max-image-preview:large`), Open Graph + Twitter Card (ảnh `og.jpg` 1200×630 ghép tự động lúc build từ logo + bìa game).
- **JSON-LD** (`@graph`): `Organization`, `WebSite`, `WebPage` (+ `PlayAction` sang domain game), `ItemList` các
  `VideoGame` (kỹ năng, độ tuổi 4–6), `FAQPage`. Không khai báo rating / review / giá khi chưa có dữ liệu thật.
- `sitemap-index.xml` (có `xhtml:link` hreflang), `robots.txt` sinh theo `SITE_URL`.
- Heading đúng thứ bậc (1 H1, H2 mỗi section, H3 từng thẻ), landmark `header` / `nav` / `main` / `footer`, skip link,
  alt ảnh mô tả, vùng bấm ≥ 44px, `lang` đúng cho từng link ngôn ngữ.
- Core Web Vitals: ảnh WebP responsive (`srcset` / `sizes`, có `width` / `height`), ảnh LCP `fetchpriority="high"`;
  font Baloo 2 tự host, chỉ preload weight heading, fallback có `size-adjust` (giảm CLS), tách subset vietnamese
  bằng `unicode-range`.

## Sửa nội dung

- Toàn bộ chữ: `src/i18n/content.ts` (object `vi` / `en` cùng kiểu `Content`). Thêm game: thêm vào `GAMES` + mục
  `games.items` của cả hai ngôn ngữ, đặt bìa ở `src/assets/games/<id>.png`.
- Thẻ SEO: `src/components/Seo.astro`; JSON-LD: `buildJsonLd` trong `src/lib/site.ts`.
- Ảnh bìa / icon chép từ `phonics-game/public` — game đổi bìa thì chép lại.

## Sau khi deploy

1. Google Search Console: xác minh domain gốc, gửi `https://<domain>/sitemap-index.xml`.
2. Kiểm tra [Rich Results Test](https://search.google.com/test/rich-results) và PageSpeed Insights.
3. Ở `phonics-game` (domain game): nên đặt `<link rel="canonical">` về chính domain game và mô tả riêng, tránh
   trùng nội dung với landing.
