# Bazaar — Nuxt 3 Variant

You are building the **Nuxt 3** variant of the Bazaar fashion ecommerce theme. This is a statically generated site using Nuxt's full-static mode. The visual output and functionality must exactly match the Astro base theme.

**Canonical specification:** Follow `C:\Dev\Themes\bazaar\CLAUDE.md` for the complete list of pages (34), components (49), data schemas, design system, utilities, and quality requirements.

**General quality standards:** Follow `C:\Dev\Themes\CLAUDE.md` for responsive design, SEO, accessibility, performance, and deliverable requirements.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3 (latest) |
| UI | Vue 3 (Composition API, `<script setup>`) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Typography | `@tailwindcss/typography` |
| Fonts | Self-hosted via `@font-face` in CSS |
| Images | `<NuxtImg>` from `@nuxt/image` (unoptimized for static) or standard `<img>` |
| Content | `@nuxt/content` v3 for blog markdown |
| Meta tags | `useHead()` / `useSeoMeta()` composables |
| State | Pinia stores |
| Static | `ssr: false` per-page or full prerender via `nitro.prerender.routes` |
| TypeScript | Strict mode, no `any` types |

---

## Dependencies

```json
{
  "devDependencies": {
    "nuxt": "^3.13.0",
    "@nuxt/content": "^3.0.0",
    "@nuxt/image": "^1.0.0",
    "@pinia/nuxt": "^0.7.0",
    "pinia": "^2.2.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Scaffolding Commands

```bash
# In C:\Dev\Themes\bazaar\bazaar-nuxt\
npx nuxi@latest init . --template minimal
npm install @nuxt/content @nuxt/image @pinia/nuxt pinia
npm install -D tailwindcss @tailwindcss/vite @tailwindcss/typography

# Copy assets from base theme
cp -r ../bazaar-astro/public/fonts ./public/
cp -r ../bazaar-astro/public/images ./public/
cp    ../bazaar-astro/public/favicon.svg ./public/
cp    ../bazaar-astro/public/og-image.svg ./public/
cp    ../bazaar-astro/public/robots.txt ./public/

# Copy data files
mkdir -p app/data
cp ../bazaar-astro/src/data/*.json ./app/data/
cp -r ../bazaar-astro/src/data/translations ./app/data/

# Copy blog content
mkdir -p content/blog
cp ../bazaar-astro/src/content/blog/*.md ./content/blog/
```

---

## Project Configuration

### `nuxt.config.ts`
```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/globals.css'],

  image: {
    quality: 85,
    // For static export — use standard img tags
  },

  content: {
    // Blog markdown in content/blog/
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/shop', '/categories', '/blog', '/cart', '/checkout',
        '/checkout-steps', '/wishlist', '/account', '/sale', '/about',
        '/contact', '/faq', '/privacy', '/terms', '/features', '/careers',
        '/lookbook', '/compare', '/recently-viewed', '/gift-cards',
        '/order-tracking', '/stores', '/press', '/shipping', '/returns',
        '/rewards', '/size-guide', '/sustainability', '/coming-soon',
      ],
    },
  },

  alias: {
    '@components': '~/components',
    '@data': '~/app/data',
    '@utils': '~/utils',
    '@stores': '~/stores',
    '@composables': '~/composables',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en', dir: 'ltr' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
});
```

### `assets/css/globals.css`
Copy the full `global.css` from the Astro base theme. Identical content — `@import "tailwindcss"`, `@theme`, `@font-face`, component classes, dark mode overrides, RTL support.

### FOUC prevention (`app/plugins/theme-init.client.ts`)
```typescript
// Runs only on client (`.client.ts` suffix)
export default defineNuxtPlugin(() => {
  try {
    const theme = localStorage.getItem('bazaar-theme') ?? 'light';
    const locale = localStorage.getItem('bazaar-locale') ?? 'en';
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  } catch { /* ignore */ }
});
```

---

## Routing

Nuxt uses file-based routing in the `pages/` directory:

| Astro page | Nuxt route file |
|------------|----------------|
| `pages/index.astro` | `pages/index.vue` |
| `pages/shop.astro` | `pages/shop.vue` |
| `pages/shop/[slug].astro` | `pages/shop/[slug].vue` |
| `pages/categories.astro` | `pages/categories.vue` |
| `pages/categories/[slug].astro` | `pages/categories/[slug].vue` |
| `pages/blog/index.astro` | `pages/blog/index.vue` |
| `pages/blog/[...slug].astro` | `pages/blog/[...slug].vue` |
| `pages/cart.astro` | `pages/cart.vue` |
| `pages/coming-soon.astro` | `pages/coming-soon.vue` |
| `pages/404.astro` | `error.vue` (Nuxt error page) |
| ... all 34 pages | `pages/{path}.vue` |

---

## Root Layout (`app.vue`)

```vue
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

### Default layout (`layouts/default.vue`)

```vue
<template>
  <div>
    <a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>
    <AnnouncementBar />
    <Header />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
    <MobileMenu />
    <CartDrawer />
    <QuickView />
    <BackToTop />
    <NewsletterPopup />
    <MobileBottomNav />
  </div>
</template>

<script setup lang="ts">
// Components auto-imported by Nuxt — no explicit imports needed
</script>
```

### Coming Soon layout (`layouts/standalone.vue`)

```vue
<template>
  <slot />
</template>
```

Use in the coming-soon page:
```vue
<!-- pages/coming-soon.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'standalone' });
</script>
```

---

## Components

All components are `.vue` files in `components/`. Nuxt auto-imports all components — no explicit `import` statements needed in templates.

```vue
<!-- components/ProductCard.vue -->
<template>
  <article
    class="card group"
    :data-category="product.category"
    :data-price="product.price"
  >
    <div class="relative overflow-hidden rounded-t-2xl aspect-[3/4]">
      <img
        :src="`/images/products/${product.slug}.jpg`"
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <!-- badges, overlay actions -->
    </div>
    <div class="p-4">
      <NuxtLink :to="`/shop/${product.slug}`" class="font-heading font-semibold">
        {{ product.title }}
      </NuxtLink>
      <StarRating :rating="product.rating" :review-count="product.reviewCount" />
      <PriceDisplay :price="product.price" :sale-price="product.salePrice" />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { useWishlistStore } from '~/stores/wishlist';

const props = defineProps<{ product: Product }>();
const wishlistStore = useWishlistStore();
const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id));
</script>
```

---

## SEO

Use `useSeoMeta()` and `useHead()` composables in each page. Create a reusable composable:

### `composables/useBazaarSEO.ts`
```typescript
import siteConfig from '~/app/data/site-config.json';

interface SEOOptions {
  title: string;
  description: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

export function useBazaarSEO(options: SEOOptions) {
  const fullTitle = `${options.title} | ${siteConfig.name}`;
  const image = options.image ?? '/og-image.svg';

  useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    description: options.description,
    ogDescription: options.description,
    ogImage: image,
    ogType: options.type ?? 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: options.description,
    twitterImage: image,
  });

  if (options.noindex) {
    useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] });
  }
}
```

Use in pages:
```vue
<script setup lang="ts">
useBazaarSEO({ title: 'Shop All', description: 'Browse our full collection.' });
</script>
```

---

## State Management (Pinia)

### `stores/cart.ts`
```typescript
import { defineStore } from 'pinia';
import type { CartItem } from '~/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  // Hydrate from localStorage on client
  onMounted(() => {
    try {
      const stored = localStorage.getItem('bazaar-cart');
      if (stored) items.value = JSON.parse(stored);
    } catch { /* ignore */ }
  });

  // Persist on change
  watch(items, (val) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bazaar-cart', JSON.stringify(val));
      document.dispatchEvent(new CustomEvent('bazaar:cart-updated', { detail: val }));
    }
  }, { deep: true });

  const cartCount = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0));
  const cartTotal = computed(() => items.value.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0));

  function add(item: CartItem) {
    const existing = items.value.find(i =>
      i.id === item.id && i.size === item.size && i.color === item.color
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.value.push(item);
    }
  }

  function remove(id: number, size: string, color: string) {
    items.value = items.value.filter(i =>
      !(i.id === id && i.size === size && i.color === color)
    );
  }

  function updateQuantity(id: number, size: string, color: string, qty: number) {
    const item = items.value.find(i => i.id === id && i.size === size && i.color === color);
    if (item) item.quantity = qty;
  }

  function clear() { items.value = []; }

  return { items, cartCount, cartTotal, add, remove, updateQuantity, clear };
});
```

Create equivalent `stores/wishlist.ts` and `stores/compare.ts`.

---

## Blog (`@nuxt/content`)

Blog posts live in `content/blog/*.md`.

### Blog listing page (`pages/blog/index.vue`)
```vue
<template>
  <HeroAlt title="The Edit" badge="Blog" />
  <!-- ... featured post, blog grid, sidebar -->
</template>

<script setup lang="ts">
useBazaarSEO({ title: 'The Edit', description: 'Fashion insights and style guides.' });

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent('blog').sort({ pubDate: -1 }).find()
);
</script>
```

### Blog post page (`pages/blog/[...slug].vue`)
```vue
<template>
  <BlogLayout v-if="post" :post="post" :related-posts="relatedPosts">
    <ContentRenderer :value="post" class="prose dark:prose-invert max-w-none" />
  </BlogLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug;

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryContent('blog', slug).findOne()
);

if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' });

const { data: relatedPosts } = await useAsyncData(`related-${slug}`, () =>
  queryContent('blog')
    .where({ category: post.value!.category, _path: { $ne: post.value!._path } })
    .limit(3)
    .find()
);

useBazaarSEO({
  title: post.value.title,
  description: post.value.description,
  image: post.value.image,
  type: 'article',
});
</script>
```

---

## Page Transitions

Nuxt handles page transitions via `app.pageTransition` in `nuxt.config.ts`. Add the CSS:

```css
/* In globals.css */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
```

---

## Navigation

Use `<NuxtLink>` (auto-imported) instead of `<a>`:

```vue
<NuxtLink to="/shop" class="btn-primary">Shop Now</NuxtLink>
```

Active link detection with `useRoute`:
```vue
<script setup>
const route = useRoute();
const isActive = computed(() => route.path === props.href || route.path.startsWith(props.href + '/'));
</script>
```

Programmatic navigation:
```typescript
const router = useRouter();
await router.push('/checkout');
```

---

## Data Loading

Data files in `app/data/*.json` are imported directly since Nuxt handles them as static assets:

```typescript
// In any component or page
import products from '~/app/data/products.json';
import categories from '~/app/data/categories.json';
```

For product detail pages, prerender all slugs by adding to `nitro.prerender.routes` in `nuxt.config.ts`, or use `asyncData` which Nuxt automatically prerenders:

```vue
<!-- pages/shop/[slug].vue -->
<script setup lang="ts">
import products from '~/app/data/products.json';

const route = useRoute();
const product = computed(() => products.find(p => p.slug === route.params.slug));

if (!product.value) throw createError({ statusCode: 404 });

useBazaarSEO({ title: product.value.title, description: product.value.shortDescription });
</script>
```

---

## Lifecycle Equivalents

| Astro concept | Nuxt 3 / Vue 3 equivalent |
|---------------|--------------------------|
| `astro:page-load` | `onMounted()` composable |
| Inline `<script>` | `<script setup lang="ts">` |
| Re-init after navigation | `watch(() => route.path, () => { ... })` |
| Custom events dispatch | `document.dispatchEvent(new CustomEvent(...))` |
| Custom events listen | `useEventListener` composable or `onMounted` |

---

## File Structure

```
bazaar-nuxt/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── favicon.svg
│   ├── og-image.svg
│   └── robots.txt
├── content/
│   └── blog/              (6 .md files for @nuxt/content)
├── app/
│   ├── data/              (all JSON files)
│   └── plugins/
│       └── theme-init.client.ts
├── assets/
│   └── css/
│       └── globals.css
├── components/            (49 .vue files, auto-imported)
├── composables/
│   ├── useBazaarSEO.ts
│   ├── useCart.ts         (optional wrapper around cart store)
│   └── useTheme.ts
├── layouts/
│   ├── default.vue
│   └── standalone.vue
├── pages/                 (34 .vue files)
│   ├── index.vue
│   ├── shop/
│   │   ├── index.vue
│   │   └── [slug].vue
│   ├── categories/
│   │   ├── index.vue
│   │   └── [slug].vue
│   ├── blog/
│   │   ├── index.vue
│   │   └── [...slug].vue
│   ├── cart.vue
│   ├── checkout.vue
│   ├── checkout-steps.vue
│   ├── wishlist.vue
│   ├── account.vue
│   ├── sale.vue
│   ├── about.vue
│   ├── contact.vue
│   ├── faq.vue
│   ├── privacy.vue
│   ├── terms.vue
│   ├── features.vue
│   ├── careers.vue
│   ├── lookbook.vue
│   ├── compare.vue
│   ├── recently-viewed.vue
│   ├── gift-cards.vue
│   ├── order-tracking.vue
│   ├── stores.vue
│   ├── press.vue
│   ├── shipping.vue
│   ├── returns.vue
│   ├── rewards.vue
│   ├── size-guide.vue
│   ├── sustainability.vue
│   └── coming-soon.vue
├── stores/
│   ├── cart.ts
│   ├── wishlist.ts
│   ├── compare.ts
│   └── theme.ts
├── types/
│   └── index.ts
├── utils/
│   ├── recently-viewed.ts
│   ├── filters.ts
│   └── i18n.ts
├── error.vue              (Nuxt 404/error page)
├── app.vue
├── nuxt.config.ts
├── tsconfig.json
├── package.json
├── .gitignore
├── README.md
├── LICENSE
└── theme.json
```

---

## Astro → Nuxt Concept Mapping

| Astro concept | Nuxt 3 equivalent |
|---------------|------------------|
| `.astro` component | `.vue` component |
| `---` frontmatter | `<script setup lang="ts">` |
| `Astro.props` | `defineProps<{...}>()` |
| `<slot />` | `<slot />` (same in Vue) |
| `<style>` | `<style scoped>` or Tailwind classes |
| `<script>` block | `<script setup lang="ts">` |
| `astro:page-load` | `onMounted()` |
| Content Collections | `@nuxt/content` queryContent() |
| `getCollection()` | `queryContent('blog').find()` |
| `render()` | `<ContentRenderer :value="post" />` |
| `<ClientRouter />` | Nuxt router (built-in SPA navigation) |
| `Astro.url.pathname` | `useRoute().path` |
| `<Image />` | `<img>` or `<NuxtImg>` |
| `import.meta.env.SITE` | `useRuntimeConfig().public.siteUrl` |
| `getStaticPaths` | `nitro.prerender.routes` + crawlLinks |
| Layouts (slot-based) | `layouts/*.vue` + `definePageMeta({ layout })` |
| `SEOHead` component | `useSeoMeta()` composable |

---

## Critical Implementation Notes

1. **Auto-imports** — Nuxt auto-imports all `components/`, `composables/`, and `utils/` exports. Never write explicit imports for these — just use them directly in templates.

2. **`@pinia/nuxt` module** — Pinia stores are also auto-imported. `useCartStore()` is available in any component without importing.

3. **`onMounted` for localStorage** — Nuxt prerenders pages on the server where `localStorage` doesn't exist. Always access `localStorage` inside `onMounted()`:
   ```typescript
   onMounted(() => {
     const stored = localStorage.getItem('bazaar-cart');
     // ...
   });
   ```

4. **Client-only components** — Components that rely heavily on browser APIs (CartDrawer, QuickView, etc.) can be wrapped in `<ClientOnly>` to skip SSR:
   ```vue
   <ClientOnly><CartDrawer /></ClientOnly>
   ```

5. **`@nuxt/content` v3 API** — Uses `queryContent()` which returns a composable-friendly async function. Call inside `useAsyncData` for proper SSR and caching.

6. **`definePageMeta`** — Used for per-page configuration (layout, middleware, etc.). Must be called at the top level of `<script setup>`.

7. **Coming Soon page** — Use `definePageMeta({ layout: 'standalone' })` to opt out of the default layout (no Header/Footer).

8. **Prerendering all dynamic routes** — Product and category slugs must be listed in `nitro.prerender.routes` OR Nuxt must be able to discover them via `crawlLinks: true`. Ensure the product listing page links to each product page.

9. **JSON data import path** — Use `~/app/data/filename.json` where `~` is the Nuxt root alias for the project root.

10. **`error.vue`** — The global error page handles 404s and other errors. It does NOT use the default layout automatically — apply the header/footer manually inside `error.vue`.

---

## Build & Dev Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Build (generates .output/ for server or dist/ for static)
npm run generate   # Static export — creates .output/public/
npm run preview    # Preview the generated static output
npx nuxi typecheck # TypeScript checking
```

For static hosting, use `npm run generate`. The output is in `.output/public/`.

---

## theme.json

```json
{
  "name": "Bazaar — Fashion Ecommerce Nuxt Theme",
  "slug": "bazaar-nuxt-theme",
  "platform": "nuxt",
  "type": "template",
  "description": "A vibrant fashion ecommerce theme built with Nuxt 3, Vue 3, and Tailwind CSS v4. 34 pages, 49 components, dark mode, i18n.",
  "features": [
    "34 fully designed pages",
    "49 reusable components",
    "Nuxt 3 with Vue 3 Composition API",
    "Pinia stores for cart/wishlist/compare",
    "Static generation via nuxi generate",
    "Tailwind CSS v4",
    "Dark mode + RTL support",
    "@nuxt/content for blog",
    "useSeoMeta composable",
    "TypeScript strict mode"
  ],
  "price": "$59.00",
  "demoUrl": "",
  "category": "nuxt-themes"
}
```
