<template>
  <aside class="w-full shrink-0">
    <!-- Mobile filter toggle -->
    <button
      type="button"
      class="lg:hidden w-full flex items-center justify-between gap-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 px-4 py-3 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors mb-4 cursor-pointer"
      :aria-expanded="mobileOpen"
      @click="mobileOpen = !mobileOpen"
    >
      <span class="flex items-center gap-2">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        Filters
      </span>
      <svg :class="['h-4 w-4 transition-transform', mobileOpen ? 'rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    <!-- Filter panel -->
    <div :class="[mobileOpen ? 'block' : 'hidden', 'lg:block space-y-6']">
      <!-- Categories -->
      <div class="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5">
        <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-4">Category</h3>
        <div class="space-y-2.5">
          <label v-for="cat in categoryList" :key="cat" class="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              :checked="selectedCategories.includes(cat)"
              class="h-4 w-4 rounded border-surface-300 dark:border-surface-600 text-primary-500 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
              @change="toggleCategory(cat)"
            />
            <span class="text-sm text-surface-700 dark:text-surface-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors capitalize">
              {{ cat }}
            </span>
            <span class="ms-auto text-xs text-surface-400 dark:text-surface-500">
              ({{ categoryCounts[cat] || 0 }})
            </span>
          </label>
        </div>
      </div>

      <!-- Price Range -->
      <div class="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5">
        <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-4">Price Range</h3>
        <div class="flex items-center gap-3">
          <div class="flex-1">
            <label for="price-min" class="sr-only">Minimum price</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500 text-sm pointer-events-none">$</span>
              <input
                type="number"
                id="price-min"
                :value="priceMin"
                placeholder="Min"
                min="0"
                class="input py-2.5 text-sm"
                style="padding-left: 1.75rem"
                @input="onPriceMinInput"
              />
            </div>
          </div>
          <span class="text-surface-400 dark:text-surface-500 text-sm font-medium">to</span>
          <div class="flex-1">
            <label for="price-max" class="sr-only">Maximum price</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500 text-sm pointer-events-none">$</span>
              <input
                type="number"
                id="price-max"
                :value="priceMax"
                placeholder="Max"
                min="0"
                class="input py-2.5 text-sm"
                style="padding-left: 1.75rem"
                @input="onPriceMaxInput"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Sizes -->
      <div class="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5">
        <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-4">Size</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in allSizes"
            :key="size"
            type="button"
            :class="[
              'px-3 py-1.5 rounded-lg border text-sm transition-colors cursor-pointer',
              selectedSizes.includes(size)
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300',
            ]"
            @click="toggleSize(size)"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <!-- Colors -->
      <div class="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5">
        <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-4">Color</h3>
        <div class="flex flex-wrap gap-2.5">
          <button
            v-for="color in uniqueColors"
            :key="color.name"
            type="button"
            :title="color.name"
            :class="[
              'w-7 h-7 rounded-full border-2 hover:scale-110 transition-transform cursor-pointer ring-offset-2 ring-offset-white dark:ring-offset-surface-800 focus:outline-none',
              selectedColors.includes(color.name) ? 'ring-2 ring-primary-500 border-transparent' : 'border-transparent',
            ]"
            :style="{
              backgroundColor: color.hex,
              borderColor: isLightColor(color.hex) ? '#cbd5e1' : 'transparent',
            }"
            :aria-label="`Filter by ${color.name}`"
            @click="toggleColor(color.name)"
          ></button>
        </div>
      </div>

      <!-- Availability -->
      <div class="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-5">
        <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-4">Availability</h3>
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-sm text-surface-700 dark:text-surface-300">In Stock Only</span>
          <div class="relative">
            <input
              type="checkbox"
              :checked="inStockOnly"
              class="sr-only peer"
              @change="toggleInStock"
            />
            <div class="w-10 h-5 bg-surface-300 dark:bg-surface-600 rounded-full peer-checked:bg-primary-500 transition-colors cursor-pointer"></div>
            <div class="absolute start-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>

      <!-- Clear filters button -->
      <button
        type="button"
        class="w-full flex items-center justify-center gap-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 px-4 py-2.5 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary-600 hover:border-primary-500 dark:hover:text-primary-400 dark:hover:border-primary-400 transition-colors cursor-pointer"
        @click="clearAll"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Clear All Filters
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import products from '~/app/data/products.json';

const props = defineProps<{
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  priceMin: number | null;
  priceMax: number | null;
  inStockOnly: boolean;
}>();

const emit = defineEmits<{
  'update:filters': [update: Record<string, unknown>];
}>();

const mobileOpen = ref(false);
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const categoryList = computed(() => [...new Set(products.map((p) => p.category))].sort());

const categoryCounts = computed(() => {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return counts;
});

const uniqueColors = computed(() => {
  const colorMap = new Map<string, string>();
  products.forEach((p) => {
    p.colors.forEach((c: { name: string; hex?: string; value?: string }) => {
      if (!colorMap.has(c.name)) {
        colorMap.set(c.name, c.hex || c.value || '#888');
      }
    });
  });
  return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
});

function isLightColor(hex: string): boolean {
  return hex === '#FFFFFF' || hex === '#FAF9F6' || hex === '#FFFFF0';
}

function toggleCategory(cat: string) {
  const cats = [...props.selectedCategories];
  const idx = cats.indexOf(cat);
  if (idx >= 0) cats.splice(idx, 1);
  else cats.push(cat);
  emit('update:filters', { categories: cats });
}

function toggleSize(size: string) {
  const sizes = [...props.selectedSizes];
  const idx = sizes.indexOf(size);
  if (idx >= 0) sizes.splice(idx, 1);
  else sizes.push(size);
  emit('update:filters', { sizes });
}

function toggleColor(colorName: string) {
  const colors = [...props.selectedColors];
  const idx = colors.indexOf(colorName);
  if (idx >= 0) colors.splice(idx, 1);
  else colors.push(colorName);
  emit('update:filters', { colors });
}

function onPriceMinInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit('update:filters', { priceMin: val === '' ? null : Number(val) });
}

function onPriceMaxInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit('update:filters', { priceMax: val === '' ? null : Number(val) });
}

function toggleInStock() {
  emit('update:filters', { inStock: !props.inStockOnly });
}

function clearAll() {
  emit('update:filters', {
    categories: [],
    sizes: [],
    colors: [],
    priceMin: null,
    priceMax: null,
    inStock: false,
  });
}
</script>
