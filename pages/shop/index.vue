<template>
  <HeroAlt title="Shop All" subtitle="Discover our curated collection of premium fashion essentials" badge="New Season" />

  <section class="section">
    <div class="container-custom">
      <div class="lg:flex gap-6">
        <!-- Sidebar -->
        <aside class="lg:w-72 flex-shrink-0 mb-8 lg:mb-0 lg:border-r lg:border-surface-200 lg:dark:border-surface-700 lg:pe-6">
          <FilterSidebar
            :selected-categories="filterState.categories"
            :selected-sizes="filterState.sizes"
            :selected-colors="filterState.colors"
            :price-min="filterState.priceMin"
            :price-max="filterState.priceMax"
            :in-stock-only="filterState.inStock"
            @update:filters="onFilterUpdate"
          />
        </aside>

        <!-- Product grid -->
        <div class="flex-1">
          <!-- Active filter tags -->
          <div
            v-if="activeFilterTags.length > 0"
            class="flex flex-wrap items-center gap-2 mb-4"
          >
            <span class="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider me-1">Filters:</span>
            <button
              v-for="tag in activeFilterTags"
              :key="tag.type + tag.value"
              type="button"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-xs font-medium hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors cursor-pointer"
              @click="removeFilter(tag)"
            >
              {{ tag.label }}
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button
              type="button"
              class="ms-2 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-pointer"
              @click="clearAllFilters"
            >
              Clear All
            </button>
          </div>

          <!-- Toolbar -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-surface-600 dark:text-surface-400">
              Showing {{ Math.min(visibleLimit, sortedProducts.length) }} of {{ sortedProducts.length }} products
            </p>
            <div class="flex items-center gap-3">
              <!-- Grid/List toggle -->
              <div class="hidden sm:flex items-center gap-1 border border-surface-200 dark:border-surface-700 rounded-lg p-0.5">
                <button
                  type="button"
                  class="p-1.5 rounded-md transition-colors cursor-pointer"
                  :class="currentView === 'grid' ? 'bg-primary-500 text-white' : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'"
                  aria-label="Grid view"
                  @click="setView('grid')"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                </button>
                <button
                  type="button"
                  class="p-1.5 rounded-md transition-colors cursor-pointer"
                  :class="currentView === 'list' ? 'bg-primary-500 text-white' : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'"
                  aria-label="List view"
                  @click="setView('list')"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
                </button>
              </div>
              <SortDropdown v-model="filterState.sort" />
            </div>
          </div>

          <div
            id="product-grid"
            class="grid grid-cols-1 gap-6"
            :class="currentView === 'list' ? 'sm:grid-cols-1 product-list-view' : 'sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'"
          >
            <ProductCard
              v-for="product in visibleProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Empty state -->
          <div v-if="sortedProducts.length === 0" class="text-center py-16">
            <svg class="h-16 w-16 mx-auto mb-4 text-surface-300 dark:text-surface-600" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <h3 class="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-2">No products found</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
            <button type="button" class="btn-primary" @click="clearAllFilters">Clear All Filters</button>
          </div>

          <!-- Load More button -->
          <div v-if="visibleLimit < sortedProducts.length" class="mt-8 text-center">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors cursor-pointer"
              @click="loadMore"
            >
              <span>Load More Products</span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product, FilterState } from '~/types';
import products from '~/app/data/products.json';

useBazaarSEO({
  title: 'Shop All',
  description: 'Browse our full collection of premium fashion and accessories.',
});

const allProducts = products as Product[];
const visibleLimit = ref(12);
const currentView = ref('grid');

const filterState = reactive<FilterState>({
  categories: [],
  priceMin: null,
  priceMax: null,
  sizes: [],
  colors: [],
  inStock: false,
  sort: 'featured',
});

// Filtered products (reactive)
const filteredProducts = computed(() => {
  return allProducts.filter((p) => {
    if (filterState.categories.length && !filterState.categories.includes(p.category)) return false;
    const price = p.salePrice ?? p.price;
    if (filterState.priceMin !== null && price < filterState.priceMin) return false;
    if (filterState.priceMax !== null && price > filterState.priceMax) return false;
    if (filterState.sizes.length && !filterState.sizes.some((s) => p.sizes.includes(s))) return false;
    if (filterState.colors.length && !filterState.colors.some((c) => p.colors.some((pc) => pc.name === c))) return false;
    if (filterState.inStock && !p.inStock) return false;
    return true;
  });
});

// Sorted products
const sortedProducts = computed(() => {
  const arr = [...filteredProducts.value];
  switch (filterState.sort) {
    case 'price-asc':
      return arr.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    case 'price-desc':
      return arr.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    case 'newest':
      return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating);
    default:
      return arr.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
});

// Visible products (pagination)
const visibleProducts = computed(() => sortedProducts.value.slice(0, visibleLimit.value));

// Active filter tags
interface FilterTag {
  label: string;
  type: string;
  value: string;
}

const activeFilterTags = computed<FilterTag[]>(() => {
  const tags: FilterTag[] = [];
  filterState.categories.forEach((c) => tags.push({ label: c.charAt(0).toUpperCase() + c.slice(1), type: 'category', value: c }));
  filterState.sizes.forEach((s) => tags.push({ label: `Size: ${s}`, type: 'size', value: s }));
  filterState.colors.forEach((c) => tags.push({ label: `Color: ${c}`, type: 'color', value: c }));
  if (filterState.priceMin !== null) tags.push({ label: `Min: $${filterState.priceMin}`, type: 'priceMin', value: '' });
  if (filterState.priceMax !== null) tags.push({ label: `Max: $${filterState.priceMax}`, type: 'priceMax', value: '' });
  if (filterState.inStock) tags.push({ label: 'In Stock', type: 'inStock', value: '' });
  return tags;
});

function onFilterUpdate(update: Partial<FilterState>) {
  Object.assign(filterState, update);
  visibleLimit.value = 12;
  syncURL();
}

function removeFilter(tag: FilterTag) {
  if (tag.type === 'category') filterState.categories = filterState.categories.filter((c) => c !== tag.value);
  else if (tag.type === 'size') filterState.sizes = filterState.sizes.filter((s) => s !== tag.value);
  else if (tag.type === 'color') filterState.colors = filterState.colors.filter((c) => c !== tag.value);
  else if (tag.type === 'priceMin') filterState.priceMin = null;
  else if (tag.type === 'priceMax') filterState.priceMax = null;
  else if (tag.type === 'inStock') filterState.inStock = false;
  syncURL();
}

function clearAllFilters() {
  filterState.categories = [];
  filterState.priceMin = null;
  filterState.priceMax = null;
  filterState.sizes = [];
  filterState.colors = [];
  filterState.inStock = false;
  filterState.sort = 'featured';
  visibleLimit.value = 12;
  syncURL();
}

function syncURL() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (filterState.categories.length) params.set('cat', filterState.categories.join(','));
  if (filterState.priceMin !== null) params.set('min', String(filterState.priceMin));
  if (filterState.priceMax !== null) params.set('max', String(filterState.priceMax));
  if (filterState.sizes.length) params.set('sizes', filterState.sizes.join(','));
  if (filterState.colors.length) params.set('colors', filterState.colors.join(','));
  if (filterState.inStock) params.set('instock', '1');
  if (filterState.sort !== 'featured') params.set('sort', filterState.sort);
  const qs = params.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState({}, '', url);
}

function setView(view: string) {
  currentView.value = view;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('bazaar-shop-view', view);
  }
}

function loadMore() {
  visibleLimit.value += 6;
}

// Initialize from URL params and localStorage
onMounted(() => {
  const savedView = localStorage.getItem('bazaar-shop-view');
  if (savedView === 'list' || savedView === 'grid') {
    currentView.value = savedView;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('cat')) filterState.categories = params.get('cat')!.split(',').filter(Boolean);
  if (params.get('min')) filterState.priceMin = Number(params.get('min'));
  if (params.get('max')) filterState.priceMax = Number(params.get('max'));
  if (params.get('sizes')) filterState.sizes = params.get('sizes')!.split(',').filter(Boolean);
  if (params.get('colors')) filterState.colors = params.get('colors')!.split(',').filter(Boolean);
  if (params.get('instock') === '1') filterState.inStock = true;
  if (params.get('sort')) filterState.sort = params.get('sort')!;
});
</script>
