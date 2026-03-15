<template>
  <div>
    <HeroAlt title="Compare Products" subtitle="Side-by-side comparison of your selected products" badge="Compare" />

    <section class="section">
      <div class="container-custom">
        <ClientOnly>
          <!-- Empty State -->
          <div v-if="compareProducts.length === 0" class="text-center py-16">
            <svg class="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-2">No products to compare</h2>
            <p class="text-surface-500 dark:text-surface-400 mb-2">Add up to 4 products to compare by clicking the compare button on any product.</p>
            <p class="text-sm text-surface-400 dark:text-surface-500 mb-6">
              Look for the
              <svg class="inline w-4 h-4 align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              icon on product cards.
            </p>
            <NuxtLink to="/shop" class="btn-primary">Browse Shop</NuxtLink>
          </div>

          <!-- Comparison Content -->
          <div v-else>
            <div class="flex items-center justify-between mb-6">
              <p class="text-sm text-surface-500 dark:text-surface-400">
                Comparing {{ compareProducts.length }} product{{ compareProducts.length !== 1 ? 's' : '' }}
              </p>
              <button
                class="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                @click="compareStore.clear()"
              >
                Clear All
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <tr
                  v-for="(row, rowIndex) in tableRows"
                  :key="row.label"
                  class="border-b border-surface-200 dark:border-surface-700"
                  :class="rowIndex % 2 === 0 ? 'bg-surface-50 dark:bg-surface-800/50' : ''"
                >
                  <td class="px-4 py-3 font-heading font-semibold text-surface-900 dark:text-white whitespace-nowrap align-middle min-w-[100px]">
                    {{ row.label }}
                  </td>
                  <td
                    v-for="product in compareProducts"
                    :key="`${row.label}-${product.id}`"
                    class="px-4 py-3 text-center text-surface-600 dark:text-surface-400 align-middle min-w-[180px]"
                  >
                    <!-- Image row -->
                    <template v-if="row.key === 'image'">
                      <div class="relative">
                        <button
                          class="absolute -top-1 -end-1 w-6 h-6 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-surface-500 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 transition-colors"
                          title="Remove from compare"
                          @click="compareStore.remove(product.id)"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <img
                          v-if="product.image"
                          :src="product.image"
                          :alt="product.title"
                          class="w-24 h-32 rounded-lg object-cover mx-auto"
                        />
                        <div
                          v-else
                          class="w-24 h-32 rounded-lg mx-auto"
                          :style="{ backgroundColor: product.placeholderColor || '#c4a882' }"
                        />
                      </div>
                    </template>
                    <!-- Name row -->
                    <template v-else-if="row.key === 'name'">
                      <NuxtLink
                        :to="`/shop/${product.slug}`"
                        class="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {{ product.title }}
                      </NuxtLink>
                    </template>
                    <!-- Price row -->
                    <template v-else-if="row.key === 'price'">
                      <span v-if="product.salePrice">
                        <span class="line-through text-surface-400 me-1">${{ product.price.toFixed(2) }}</span>
                        <span class="text-primary-600 dark:text-primary-400 font-bold">${{ product.salePrice.toFixed(2) }}</span>
                      </span>
                      <span v-else class="font-bold">${{ product.price.toFixed(2) }}</span>
                    </template>
                    <!-- Rating row -->
                    <template v-else-if="row.key === 'rating'">
                      <span class="text-accent-500">{{ '\u2605'.repeat(Math.floor(product.rating)) }}{{ '\u2606'.repeat(5 - Math.floor(product.rating)) }}</span>
                      <span class="text-surface-400 text-xs">({{ product.reviewCount }})</span>
                    </template>
                    <!-- Category row -->
                    <template v-else-if="row.key === 'category'">
                      {{ product.category.charAt(0).toUpperCase() + product.category.slice(1) }}
                    </template>
                    <!-- Material row -->
                    <template v-else-if="row.key === 'material'">
                      {{ product.details?.material || '\u2014' }}
                    </template>
                    <!-- Care row -->
                    <template v-else-if="row.key === 'care'">
                      {{ product.details?.care || '\u2014' }}
                    </template>
                    <!-- Fit row -->
                    <template v-else-if="row.key === 'fit'">
                      {{ product.details?.fit || '\u2014' }}
                    </template>
                    <!-- Sizes row -->
                    <template v-else-if="row.key === 'sizes'">
                      {{ product.sizes?.join(', ') || '\u2014' }}
                    </template>
                    <!-- Colors row -->
                    <template v-else-if="row.key === 'colors'">
                      <span
                        v-for="color in (product.colors || [])"
                        :key="color.name"
                        class="inline-block w-4 h-4 rounded-full border border-surface-300 dark:border-surface-600 me-1"
                        :style="{ background: color.hex || color.value }"
                        :title="color.name"
                      />
                      <span v-if="!product.colors?.length">&mdash;</span>
                    </template>
                    <!-- In Stock row -->
                    <template v-else-if="row.key === 'inStock'">
                      <span v-if="product.inStock" class="text-emerald-600 dark:text-emerald-400 font-semibold">In Stock</span>
                      <span v-else class="text-red-500 font-semibold">Out of Stock</span>
                    </template>
                    <!-- Action row -->
                    <template v-else-if="row.key === 'action'">
                      <NuxtLink :to="`/shop/${product.slug}`" class="btn-primary text-xs px-4 py-2 inline-block">View Product</NuxtLink>
                    </template>
                  </td>
                </tr>
              </table>
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
  title: 'Compare Products',
  description: 'Compare Bazaar Studio products side by side to find the perfect match for your style.',
});

const compareStore = useCompareStore();

onMounted(() => {
  compareStore.hydrate();
});

const compareProducts = computed(() => {
  const ids = compareStore.items.map((item) => item.id);
  return ids
    .map((id) => (allProducts as Product[]).find((p) => p.id === id))
    .filter(Boolean) as Product[];
});

const tableRows = [
  { label: '', key: 'image' },
  { label: 'Name', key: 'name' },
  { label: 'Price', key: 'price' },
  { label: 'Rating', key: 'rating' },
  { label: 'Category', key: 'category' },
  { label: 'Material', key: 'material' },
  { label: 'Care', key: 'care' },
  { label: 'Fit', key: 'fit' },
  { label: 'Sizes', key: 'sizes' },
  { label: 'Colors', key: 'colors' },
  { label: 'In Stock', key: 'inStock' },
  { label: '', key: 'action' },
];
</script>
