<template>
  <section v-if="products.length > 0" class="section">
    <div class="container-custom">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-heading font-bold text-2xl md:text-3xl text-surface-900 dark:text-white" data-i18n="product.relatedProducts">
          {{ title }}
        </h2>
        <NuxtLink to="/shop" class="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          View All
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="p in products.slice(0, 4)" :key="p.id" :product="p" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

withDefaults(defineProps<{
  products: Product[];
  title?: string;
}>(), {
  title: 'You May Also Like',
});
</script>
