# Bazaar — Fashion Ecommerce Nuxt Theme

A premium fashion and lifestyle ecommerce theme built with Nuxt 3, Vue 3 Composition API, Pinia, and Tailwind CSS v4. Features 34 pages, 49 components, dark mode, RTL support, and 3-language i18n.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **34 pages** — Home, Shop, Product Detail, Categories, Cart, Checkout (single + multi-step), Wishlist, Compare, Blog, Account, Sale, About, Contact, FAQ, Features, Careers, Lookbook, Gift Cards, Order Tracking, Stores, Press, Shipping, Returns, Rewards, Size Guide, Sustainability, Privacy, Terms, Coming Soon, 404
- **49 Vue 3 components** — ProductCard, ProductGallery, QuickView, CartDrawer, FilterSidebar, Mega Menu Header, and more
- **Pinia stores** — Cart, Wishlist, Compare, Theme with localStorage persistence
- **Dark mode** — Toggle with smooth transitions, every component designed for both modes
- **i18n** — English, French, Arabic with RTL support
- **Blog** — Powered by @nuxt/content with markdown posts
- **SEO** — useSeoMeta composable, Open Graph, Twitter Cards
- **Responsive** — Mobile-first, tested at 320px, 768px, 1024px, 1440px
- **TypeScript** — Strict mode, fully typed

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3 |
| UI | Vue 3 (Composition API, `<script setup>`) |
| Styling | Tailwind CSS v4 |
| State | Pinia |
| Blog | @nuxt/content v3 |
| Images | @nuxt/image |
| Fonts | Self-hosted (Outfit + Inter variable) |

## Project Structure

```
bazaar-nuxt/
├── app/data/           # JSON data files (products, categories, etc.)
├── assets/css/         # Global CSS with Tailwind v4 theme
├── components/         # 49 Vue 3 components (auto-imported)
├── composables/        # useBazaarSEO composable
├── content/blog/       # 6 markdown blog posts
├── layouts/            # default + standalone layouts
├── pages/              # 33 page routes
├── plugins/            # Theme init (FOUC prevention)
├── public/             # Fonts, images, favicon
├── stores/             # Pinia stores (cart, wishlist, compare, theme)
├── types/              # TypeScript interfaces
├── utils/              # i18n, filters, recently-viewed
├── error.vue           # 404/error page
├── app.vue             # Root component
└── nuxt.config.ts      # Nuxt configuration
```

## Customization

Edit `app/data/site-config.json` to change:
- Site name and tagline
- Logo paths
- Social media links
- Contact information
- Announcement bar text
- Free shipping threshold
- Footer copyright

All product, category, and content data is in `app/data/*.json`.

## Build Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview production build
```

## Design System

- **Primary (Rose):** Fashion-forward accent color
- **Accent (Amber):** Sale badges and CTAs
- **Secondary (Violet):** Supporting accent
- **Surface (Slate):** Neutral backgrounds and text
- **Fonts:** Outfit (headings) + Inter (body), self-hosted variable fonts

## License

MIT License. See [LICENSE](./LICENSE).
