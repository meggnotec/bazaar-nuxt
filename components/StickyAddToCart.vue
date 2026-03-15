<template>
  <div
    class="fixed bottom-16 lg:bottom-0 inset-x-0 z-30 transition-transform duration-300 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    :class="isVisible ? 'translate-y-0' : 'translate-y-full'"
  >
    <div class="container-custom flex items-center gap-4 py-3">
      <!-- Thumbnail -->
      <div class="hidden sm:block w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-100 dark:bg-surface-800">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.title"
          width="48"
          height="48"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full"
          :style="{ backgroundColor: product.placeholderColor }"
        />
      </div>

      <!-- Title & Price -->
      <div class="flex-1 min-w-0">
        <p class="font-heading font-semibold text-sm text-surface-900 dark:text-white truncate">{{ product.title }}</p>
        <div class="flex items-center gap-2">
          <template v-if="product.salePrice">
            <span class="text-sm font-bold text-primary-500">${{ product.salePrice.toFixed(2) }}</span>
            <span class="text-xs text-surface-400 line-through">${{ product.price.toFixed(2) }}</span>
          </template>
          <template v-else>
            <span class="text-sm font-bold text-surface-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
          </template>
        </div>
      </div>

      <!-- Size selector -->
      <select
        v-model="selectedSize"
        class="hidden md:block rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-3 py-2 text-sm text-surface-700 dark:text-surface-300 focus:border-primary-500 outline-none"
        aria-label="Select size"
      >
        <option value="">Size</option>
        <option v-for="size in product.sizes" :key="size" :value="size">{{ size }}</option>
      </select>

      <!-- Add to Cart -->
      <button
        type="button"
        class="btn-primary py-2.5 px-6 text-sm whitespace-nowrap"
        :class="!product.inStock && 'opacity-50 cursor-not-allowed pointer-events-none'"
        :disabled="!product.inStock"
        @click="addToCart"
      >
        <span>{{ addedFeedback ? 'Added!' : (product.inStock ? 'Add to Cart' : 'Sold Out') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const isVisible = ref(false);
const selectedSize = ref('');
const addedFeedback = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const mainBtn = document.getElementById('add-to-cart-main');
  if (!mainBtn) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = !entry.isIntersecting;
    },
    { threshold: 0 }
  );
  observer.observe(mainBtn);
});

onUnmounted(() => {
  observer?.disconnect();
});

function addToCart() {
  if (!props.product.inStock) return;

  cartStore.add({
    id: props.product.id,
    slug: props.product.slug,
    title: props.product.title,
    price: props.product.price,
    salePrice: props.product.salePrice,
    size: selectedSize.value,
    color: '',
    quantity: 1,
    image: props.product.image,
    placeholderColor: props.product.placeholderColor,
  });

  addedFeedback.value = true;
  setTimeout(() => {
    addedFeedback.value = false;
  }, 1500);
}
</script>
