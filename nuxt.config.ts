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

  app: {
    head: {
      htmlAttrs: { lang: 'en', dir: 'ltr' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
    // pageTransition requires single-root pages; disabled for multi-root compatibility
  },
});
