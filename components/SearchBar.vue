<template>
  <Teleport to="body">
    <div
      v-show="isOpen"
      class="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeSearch"></div>

      <!-- Search panel -->
      <div class="relative w-full max-w-2xl mx-auto mt-20 sm:mt-32 px-4">
        <div class="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl overflow-hidden">
          <!-- Search input -->
          <div class="flex items-center px-5 border-b border-surface-200 dark:border-surface-700">
            <svg class="h-5 w-5 text-surface-400 dark:text-surface-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref="searchInputRef"
              v-model="query"
              type="search"
              placeholder="Search for products, categories..."
              data-i18n-placeholder="search.placeholder"
              autocomplete="off"
              class="flex-1 bg-transparent border-none py-4 px-3 text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none text-base"
              @input="onInput"
            />
            <button
              type="button"
              class="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer"
              aria-label="Close search"
              @click="closeSearch"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Search results (visible when typing) -->
          <div v-if="query.trim().length > 0" class="p-5 max-h-80 overflow-y-auto">
            <div v-if="matches.length > 0" class="space-y-1">
              <NuxtLink
                v-for="p in matches"
                :key="p.id"
                :to="`/shop/${p.slug}`"
                class="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                @click="closeSearch"
              >
                <img
                  v-if="p.image"
                  :src="p.image"
                  :alt="p.title"
                  width="40"
                  height="52"
                  class="w-10 h-13 rounded-md flex-shrink-0 object-cover"
                />
                <div
                  v-else
                  class="w-10 h-13 rounded-md flex-shrink-0 flex items-center justify-center text-white/60 text-[9px]"
                  :style="{ backgroundColor: p.placeholderColor }"
                >
                  {{ p.title.substring(0, 3) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-surface-900 dark:text-white truncate">{{ p.title }}</p>
                  <p class="text-xs text-surface-500 dark:text-surface-400 capitalize">{{ p.category }}</p>
                </div>
                <span class="text-sm font-semibold text-surface-900 dark:text-white">
                  {{ p.salePrice ? `$${p.salePrice.toFixed(2)}` : `$${p.price.toFixed(2)}` }}
                </span>
              </NuxtLink>
            </div>
            <p v-else class="text-sm text-surface-500 dark:text-surface-400 text-center py-4" data-i18n="search.noResults">No products found</p>
          </div>

          <!-- Quick links (visible when input is empty) -->
          <div v-else class="p-5">
            <p class="text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-3" data-i18n="search.popularSearches">Popular Searches</p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                to="/shop"
                class="inline-flex items-center rounded-full bg-surface-100 dark:bg-surface-700 px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 transition-colors"
                @click="closeSearch"
              >
                Dresses
              </NuxtLink>
              <NuxtLink
                to="/shop"
                class="inline-flex items-center rounded-full bg-surface-100 dark:bg-surface-700 px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 transition-colors"
                @click="closeSearch"
              >
                Sweaters
              </NuxtLink>
              <NuxtLink
                to="/shop"
                class="inline-flex items-center rounded-full bg-surface-100 dark:bg-surface-700 px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 transition-colors"
                @click="closeSearch"
              >
                Outerwear
              </NuxtLink>
              <NuxtLink
                to="/sale"
                class="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-950 px-3 py-1.5 text-sm text-primary-700 dark:text-primary-300 font-medium"
                @click="closeSearch"
              >
                Sale Items
              </NuxtLink>
              <NuxtLink
                to="/shop"
                class="inline-flex items-center rounded-full bg-surface-100 dark:bg-surface-700 px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 transition-colors"
                @click="closeSearch"
              >
                Accessories
              </NuxtLink>
              <NuxtLink
                to="/shop"
                class="inline-flex items-center rounded-full bg-surface-100 dark:bg-surface-700 px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 transition-colors"
                @click="closeSearch"
              >
                Sneakers
              </NuxtLink>
            </div>

            <p class="text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-3 mt-6" data-i18n="search.quickLinks">Quick Links</p>
            <div class="space-y-1">
              <NuxtLink
                to="/categories"
                class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                @click="closeSearch"
              >
                <svg class="h-4 w-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                Shop by Category
              </NuxtLink>
              <NuxtLink
                to="/shop"
                class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                @click="closeSearch"
              >
                <svg class="h-4 w-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                All Products
              </NuxtLink>
              <NuxtLink
                to="/blog"
                class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                @click="closeSearch"
              >
                <svg class="h-4 w-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                The Edit (Blog)
              </NuxtLink>
            </div>
          </div>

          <!-- Keyboard shortcut hint -->
          <div class="px-5 py-3 bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700">
            <p class="text-xs text-surface-400 dark:text-surface-500 text-center">
              Press <kbd class="inline-flex items-center rounded border border-surface-300 dark:border-surface-600 px-1.5 py-0.5 text-xs font-mono text-surface-500 dark:text-surface-400 mx-0.5">Esc</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import products from '~/app/data/products.json';

interface SearchProduct {
  id: number;
  slug: string;
  title: string;
  price: number;
  salePrice: number | null;
  category: string;
  image: string;
  placeholderColor: string;
}

const allProducts: SearchProduct[] = products.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  price: p.price,
  salePrice: p.salePrice,
  category: p.category,
  image: p.image,
  placeholderColor: p.placeholderColor,
}));

const isOpen = ref(false);
const query = ref('');
const matches = ref<SearchProduct[]>([]);
const searchInputRef = ref<HTMLInputElement | null>(null);
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function openSearch() {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
  nextTick(() => {
    searchInputRef.value?.focus();
  });
}

function closeSearch() {
  isOpen.value = false;
  document.body.style.overflow = '';
  query.value = '';
  matches.value = [];
}

function onInput() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const q = query.value.trim().toLowerCase();
    if (q.length === 0) {
      matches.value = [];
      return;
    }
    matches.value = allProducts
      .filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 5);
  }, 200);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    closeSearch();
  }
}

onMounted(() => {
  document.addEventListener('bazaar:open-search', openSearch);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('bazaar:open-search', openSearch);
  document.removeEventListener('keydown', handleKeydown);
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>
