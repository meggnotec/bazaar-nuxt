<template>
  <!-- Hero -->
  <Hero />

  <!-- Category Strip -->
  <section class="py-8 border-b border-surface-100 dark:border-surface-800">
    <div class="container-custom">
      <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/categories/${cat.slug}`"
          class="flex-shrink-0 px-6 py-2.5 rounded-full border border-surface-200 dark:border-surface-700 text-sm font-medium text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all"
        >
          {{ cat.name }}
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Featured / Trending Now -->
  <FeaturedCollection title="Trending Now" :products="featuredProducts" view-all-link="/shop" />

  <!-- Promo Banner -->
  <PromoBanner />

  <!-- New Arrivals -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-surface-900 dark:text-white">Just Dropped</h2>
        <NuxtLink to="/shop" class="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center gap-1">
          View All
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in newArrivals" :key="product.id" :product="product" />
      </div>
    </div>
  </section>

  <!-- Sale Banner -->
  <SaleBanner />

  <!-- Best Sellers -->
  <FeaturedCollection title="Most Loved" :products="bestSellers" view-all-link="/shop" />

  <!-- Testimonials -->
  <Testimonials />

  <!-- Instagram Grid -->
  <InstagramGrid />

  <!-- Newsletter -->
  <NewsletterSignup />
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import siteConfig from '~/app/data/site-config.json';
import products from '~/app/data/products.json';
import categories from '~/app/data/categories.json';

useBazaarSEO({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
});

const typedProducts = products as Product[];

const featuredProducts = computed(() =>
  typedProducts.filter((p) => p.isFeatured).slice(0, 4)
);

const newArrivals = computed(() =>
  typedProducts.filter((p) => p.isNew).slice(0, 8)
);

const bestSellers = computed(() =>
  [...typedProducts].sort((a, b) => b.rating - a.rating).slice(0, 4)
);
</script>
