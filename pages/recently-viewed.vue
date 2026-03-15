<template>
  <div>
    <HeroAlt title="Recently Viewed" subtitle="Pick up where you left off" badge="Your History" />

    <section class="section">
      <div class="container-custom">
        <ClientOnly>
          <!-- Empty State -->
          <div v-if="recentProducts.length === 0" class="text-center py-16">
            <svg class="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-2">No recently viewed products</h2>
            <p class="text-surface-500 dark:text-surface-400 mb-6">Start browsing to see your history here</p>
            <NuxtLink to="/shop" class="btn-primary">Start Shopping</NuxtLink>
          </div>

          <!-- Product Grid -->
          <div v-else>
            <div class="flex items-center justify-between mb-6">
              <p class="text-sm text-surface-500 dark:text-surface-400">
                {{ recentProducts.length }} recently viewed product{{ recentProducts.length !== 1 ? 's' : '' }}
              </p>
              <button
                class="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                @click="clearHistory"
              >
                Clear History
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard
                v-for="product in recentProducts"
                :key="product.id"
                :product="product"
              />
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import allProducts from '~/app/data/products.json';
import type { Product } from '~/types';

useBazaarSEO({
  title: 'Recently Viewed',
  description: 'See the products you\'ve recently browsed at Bazaar Studio.',
});

const recentSlugs = ref<string[]>([]);

function loadRecentlyViewed(): string[] {
  try {
    const stored = localStorage.getItem('bazaar-recently-viewed');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const recentProducts = computed(() => {
  return recentSlugs.value
    .map((slug) => (allProducts as Product[]).find((p) => p.slug === slug))
    .filter(Boolean) as Product[];
});

function clearHistory() {
  localStorage.removeItem('bazaar-recently-viewed');
  recentSlugs.value = [];
}

onMounted(() => {
  recentSlugs.value = loadRecentlyViewed();
});
</script>
