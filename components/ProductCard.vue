<template>
  <div
    class="card group overflow-hidden"
    data-product-card
    :data-category="product.category"
    :data-price="product.salePrice || product.price"
    :data-sizes="product.sizes.join(',')"
    :data-instock="String(product.inStock)"
    :data-isnew="String(product.isNew)"
    :data-issale="String(product.isSale)"
    :data-rating="product.rating"
    :data-featured="product.isFeatured ? '1' : '0'"
  >
    <!-- Image area -->
    <div class="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
      <NuxtLink :to="`/shop/${product.slug}`" class="block w-full h-full">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.title"
          width="600"
          height="800"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          :style="{ backgroundColor: product.placeholderColor }"
        >
          <span class="text-white/60 font-heading text-sm text-center px-4">{{ product.title }}</span>
        </div>
        <!-- Hover image swap -->
        <div
          v-if="hasHover"
          class="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          :style="{ backgroundColor: product.hoverPlaceholderColor }"
        >
          <span class="text-white/60 font-heading text-sm text-center px-4">{{ product.title }}</span>
        </div>
      </NuxtLink>
      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none">
        <!-- Action buttons -->
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-white dark:bg-surface-800 shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
            :class="isCompared ? '!bg-secondary-500 !text-white' : 'text-surface-700 dark:text-surface-200 hover:bg-secondary-500 hover:text-white'"
            :aria-label="`Add ${product.title} to compare`"
            title="Compare"
            @click.prevent.stop="toggleCompare"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-white dark:bg-surface-800 shadow-lg flex items-center justify-center text-surface-700 dark:text-surface-200 hover:bg-primary-500 hover:text-white transition-all duration-200 cursor-pointer"
            :aria-label="`Quick view ${product.title}`"
            title="Quick View"
            @click.prevent.stop="openQuickView"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button
            type="button"
            class="w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
            :class="quickAddFeedback ? '!bg-emerald-500 !text-white' : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 hover:bg-primary-500 hover:text-white'"
            :aria-label="`Add ${product.title} to cart`"
            title="Quick Add"
            @click.prevent.stop="quickAdd"
          >
            <svg v-if="!quickAddFeedback" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Badges -->
      <div class="absolute top-3 start-3 flex flex-col gap-1.5">
        <span v-if="product.isNew" class="badge-new text-[10px]">New</span>
        <span v-if="product.isSale" class="badge-sale text-[10px]">-{{ discount }}%</span>
      </div>
      <!-- Wishlist -->
      <button
        type="button"
        class="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
        :class="isWishlisted ? 'text-primary-500' : 'text-surface-400 hover:text-primary-500'"
        :aria-label="`Add ${product.title} to wishlist`"
        @click.prevent.stop="toggleWishlist"
      >
        <svg class="h-4 w-4" :fill="isWishlisted ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
    </div>
    <!-- Info -->
    <div class="p-4">
      <NuxtLink :to="`/shop/${product.slug}`" class="block">
        <h3 class="font-heading font-semibold text-surface-900 dark:text-white mb-1 truncate hover:text-primary-500 transition-colors">{{ product.title }}</h3>
      </NuxtLink>
      <StarRating :rating="product.rating" :review-count="product.reviewCount" />
      <div class="mt-2 flex items-center justify-between">
        <PriceDisplay :price="product.price" :sale-price="product.salePrice" size="sm" />
        <div v-if="displayColors.length > 0" class="flex items-center gap-1">
          <span
            v-for="c in displayColors"
            :key="c.name"
            class="w-4 h-4 rounded-full inline-block"
            :class="isLightColor(c.hex) ? 'border border-surface-300' : ''"
            :style="{ backgroundColor: c.hex }"
            :title="c.name"
          />
          <span v-if="overflowCount > 0" class="text-[10px] text-surface-500 dark:text-surface-400 font-medium ms-0.5">+{{ overflowCount }}</span>
        </div>
      </div>
      <span v-if="!product.inStock" class="mt-2 inline-block text-xs text-red-500 font-medium">Out of Stock</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

const props = defineProps<{
  product: Product;
}>();

const wishlistStore = useWishlistStore();
const compareStore = useCompareStore();
const cartStore = useCartStore();

const quickAddFeedback = ref(false);

const hasHover = computed(() => !!props.product.hoverPlaceholderColor);
const discount = computed(() =>
  props.product.salePrice ? Math.round((1 - props.product.salePrice / props.product.price) * 100) : 0
);
const displayColors = computed(() => props.product.colors.slice(0, 4));
const overflowCount = computed(() => props.product.colors.length - 4);
const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id));
const isCompared = computed(() => compareStore.isInCompare(props.product.id));

function isLightColor(hex: string): boolean {
  const upper = hex.toUpperCase();
  return upper === '#FFFFFF' || upper === '#FFFFF0' || upper === '#FAF9F6';
}

function toggleWishlist() {
  if (isWishlisted.value) {
    wishlistStore.remove(props.product.id);
  } else {
    wishlistStore.add({
      id: props.product.id,
      slug: props.product.slug,
      title: props.product.title,
      price: props.product.price,
      salePrice: props.product.salePrice,
      image: props.product.image,
      placeholderColor: props.product.placeholderColor,
    });
  }
}

function toggleCompare() {
  if (isCompared.value) {
    compareStore.remove(props.product.id);
  } else {
    compareStore.add({
      id: props.product.id,
      slug: props.product.slug,
      title: props.product.title,
      price: props.product.price,
      salePrice: props.product.salePrice,
      image: props.product.image,
      placeholderColor: props.product.placeholderColor,
    });
  }
}

function openQuickView() {
  document.dispatchEvent(new CustomEvent('bazaar:quickview-open', { detail: { productId: props.product.id } }));
}

function quickAdd() {
  if (!props.product.inStock) return;

  cartStore.add({
    id: props.product.id,
    slug: props.product.slug,
    title: props.product.title,
    price: props.product.price,
    salePrice: props.product.salePrice,
    size: props.product.sizes[0] || '',
    color: props.product.colors[0]?.name || '',
    quantity: 1,
    image: props.product.image,
    placeholderColor: props.product.placeholderColor,
  });

  quickAddFeedback.value = true;
  setTimeout(() => {
    quickAddFeedback.value = false;
  }, 1200);
}
</script>
