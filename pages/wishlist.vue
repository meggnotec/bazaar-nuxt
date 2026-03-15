<template>
  <HeroAlt title="Your Wishlist" subtitle="Items you've saved for later" />

  <section class="section">
    <div class="container-custom">
      <ClientOnly>
        <!-- Empty state -->
        <div v-if="wishlistStore.items.length === 0" class="text-center py-16">
          <svg class="h-24 w-24 text-surface-300 dark:text-surface-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p class="text-surface-500 dark:text-surface-400 mb-6">Start adding items you love!</p>
          <NuxtLink to="/shop" class="btn-primary">Browse Products</NuxtLink>
        </div>

        <!-- Wishlist items -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="item in wishlistStore.items" :key="item.id" class="card overflow-hidden">
            <NuxtLink
              v-if="item.image"
              :to="`/shop/${item.slug}`"
              class="block aspect-[3/4] overflow-hidden"
            >
              <img
                :src="item.image"
                :alt="item.title"
                width="300"
                height="400"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </NuxtLink>
            <NuxtLink
              v-else
              :to="`/shop/${item.slug}`"
              class="block aspect-[3/4] flex items-center justify-center text-white/60 font-heading text-sm"
              :style="{ backgroundColor: item.placeholderColor || '#c4a882' }"
            >
              {{ item.title }}
            </NuxtLink>
            <div class="p-4">
              <NuxtLink
                :to="`/shop/${item.slug}`"
                class="font-heading font-semibold text-surface-900 dark:text-white hover:text-primary-500 transition-colors block truncate"
              >
                {{ item.title }}
              </NuxtLink>
              <p class="text-sm font-heading font-bold text-surface-900 dark:text-white mt-1">
                <template v-if="item.salePrice">
                  <span class="text-primary-500">${{ item.salePrice.toFixed(2) }}</span>
                  <span class="text-surface-400 line-through text-xs ms-1">${{ item.price.toFixed(2) }}</span>
                </template>
                <template v-else>
                  ${{ item.price.toFixed(2) }}
                </template>
              </p>
              <div class="flex gap-2 mt-3">
                <NuxtLink :to="`/shop/${item.slug}`" class="btn-primary text-xs flex-1 text-center">
                  View Product
                </NuxtLink>
                <button
                  type="button"
                  class="btn-outline text-xs px-3"
                  aria-label="Remove from wishlist"
                  @click="wishlistStore.remove(item.id)"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
const wishlistStore = useWishlistStore();

useBazaarSEO({
  title: 'Your Wishlist',
  description: 'View and manage your saved items.',
});

onMounted(() => {
  wishlistStore.hydrate();
});
</script>
