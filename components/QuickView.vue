<template>
  <Teleport to="body">
    <div v-if="isOpen">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/60 z-60 quickview-backdrop-show"
        @click="close"
      />

      <!-- Modal -->
      <div
        class="fixed inset-0 z-60 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Quick view product details"
      >
        <div class="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative quickview-modal-show">
          <!-- Close button -->
          <button
            type="button"
            class="absolute top-3 end-3 z-10 w-9 h-9 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-500 hover:text-surface-900 dark:hover:text-white hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors cursor-pointer"
            aria-label="Close quick view"
            @click="close"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div v-if="currentProduct" class="grid grid-cols-1 md:grid-cols-2 gap-0">
            <!-- Image -->
            <div class="relative aspect-[3/4] md:aspect-[3/4] rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none overflow-hidden bg-surface-100 dark:bg-surface-800">
              <!-- Badges -->
              <div class="absolute top-3 start-3 flex flex-col gap-1.5 z-[1]">
                <span v-if="currentProduct.isNew" class="badge-new text-[10px]">New</span>
                <span v-if="currentProduct.isSale && currentProduct.salePrice" class="badge-sale text-[10px]">
                  -{{ Math.round((1 - currentProduct.salePrice / currentProduct.price) * 100) }}%
                </span>
              </div>
              <img
                v-if="currentProduct.image"
                :src="currentProduct.image"
                :alt="currentProduct.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center"
                :style="{ backgroundColor: currentProduct.placeholderColor }"
              >
                <span class="text-white/60 font-heading text-sm text-center px-4">{{ currentProduct.title }}</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-6 flex flex-col gap-4">
              <div>
                <h2 class="font-heading text-xl font-bold text-surface-900 dark:text-white">{{ currentProduct.title }}</h2>
                <div class="flex items-center gap-2 mt-1">
                  <StarRating :rating="currentProduct.rating" :review-count="0" size="sm" />
                  <span class="text-sm text-surface-500 dark:text-surface-400">({{ currentProduct.reviewCount }})</span>
                </div>
              </div>

              <!-- Price -->
              <div class="flex items-center gap-3">
                <template v-if="currentProduct.salePrice">
                  <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">${{ currentProduct.salePrice.toFixed(2) }}</span>
                  <span class="text-lg text-surface-400 line-through">${{ currentProduct.price.toFixed(2) }}</span>
                  <span class="badge-sale text-[10px]">-{{ Math.round((1 - currentProduct.salePrice / currentProduct.price) * 100) }}%</span>
                </template>
                <template v-else>
                  <span class="text-2xl font-bold text-surface-900 dark:text-white">${{ currentProduct.price.toFixed(2) }}</span>
                </template>
              </div>

              <!-- Stock -->
              <div class="text-sm font-medium">
                <span v-if="currentProduct.inStock" class="text-emerald-600 dark:text-emerald-400">&#x2713; In Stock</span>
                <span v-else class="text-red-500">Out of Stock</span>
              </div>

              <!-- Description -->
              <p class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{{ currentProduct.shortDescription }}</p>

              <!-- Size picker -->
              <div v-if="currentProduct.sizes.length > 0 && currentProduct.sizes[0] !== 'One Size'">
                <label class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Size</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="s in currentProduct.sizes"
                    :key="s"
                    type="button"
                    class="px-3 py-1.5 text-sm rounded-md border cursor-pointer transition-all"
                    :class="selectedSize === s
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 font-semibold'
                      : 'border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:border-primary-400'"
                    @click="selectedSize = s"
                  >
                    {{ s }}
                  </button>
                </div>
              </div>

              <!-- Color picker -->
              <div v-if="currentProduct.colors.length > 0">
                <label class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Color: <span class="font-normal text-surface-500 dark:text-surface-400">{{ selectedColor }}</span></label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="c in currentProduct.colors"
                    :key="c.name"
                    type="button"
                    class="w-8 h-8 rounded-full cursor-pointer transition-all"
                    :class="[
                      selectedColor === c.name ? 'ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-surface-900' : '',
                      isLightColor(c.hex) ? 'border border-surface-300' : '',
                    ]"
                    :style="{ backgroundColor: c.hex }"
                    :aria-label="c.name"
                    @click="selectedColor = c.name"
                  />
                </div>
              </div>

              <!-- Quantity -->
              <div>
                <label class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Quantity</label>
                <div class="flex items-center border border-surface-300 dark:border-surface-600 rounded-lg w-fit">
                  <button
                    type="button"
                    class="w-10 h-10 flex items-center justify-center text-surface-500 hover:text-surface-900 dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                    @click="quantity > 1 && quantity--"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" /></svg>
                  </button>
                  <span class="w-10 text-center text-sm font-semibold text-surface-900 dark:text-white">{{ quantity }}</span>
                  <button
                    type="button"
                    class="w-10 h-10 flex items-center justify-center text-surface-500 hover:text-surface-900 dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                    @click="quantity < 10 && quantity++"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>

              <!-- Add to cart -->
              <button
                type="button"
                class="btn-primary w-full py-3.5 text-base mt-1 cursor-pointer"
                :class="[
                  !currentProduct.inStock && 'opacity-50 cursor-not-allowed',
                  addedFeedback && 'bg-emerald-500 from-emerald-500 to-emerald-500',
                ]"
                :disabled="!currentProduct.inStock"
                @click="addToCart"
              >
                {{ addedFeedback ? '&#x2713; Added!' : (currentProduct.inStock ? 'Add to Cart' : 'Out of Stock') }}
              </button>

              <!-- View full details -->
              <NuxtLink
                :to="`/shop/${currentProduct.slug}`"
                class="text-center text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
                @click="close"
              >
                View Full Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import productsData from '~/app/data/products.json';

const cartStore = useCartStore();

const isOpen = ref(false);
const currentProduct = ref<Product | null>(null);
const selectedSize = ref('');
const selectedColor = ref('');
const quantity = ref(1);
const addedFeedback = ref(false);

const products = productsData as unknown as Product[];

function isLightColor(hex: string): boolean {
  const upper = hex.toUpperCase();
  return upper === '#FFFFFF' || upper === '#FFFFF0' || upper === '#FAF9F6';
}

function open(productId: number) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentProduct.value = product;
  selectedSize.value = product.sizes[0] || '';
  selectedColor.value = product.colors[0]?.name || '';
  quantity.value = 1;
  addedFeedback.value = false;
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function close() {
  isOpen.value = false;
  currentProduct.value = null;
  document.body.style.overflow = '';
}

function addToCart() {
  if (!currentProduct.value || !currentProduct.value.inStock) return;

  cartStore.add({
    id: currentProduct.value.id,
    slug: currentProduct.value.slug,
    title: currentProduct.value.title,
    price: currentProduct.value.price,
    salePrice: currentProduct.value.salePrice,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    image: currentProduct.value.image,
    placeholderColor: currentProduct.value.placeholderColor,
  });

  addedFeedback.value = true;
  setTimeout(() => {
    addedFeedback.value = false;
    close();
    document.dispatchEvent(new CustomEvent('bazaar:open-cart'));
  }, 1500);
}

// Listen for quickview open events
onMounted(() => {
  const handler = ((e: CustomEvent) => {
    const productId = e.detail?.productId;
    if (productId) open(Number(productId));
  }) as EventListener;

  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) close();
  };

  document.addEventListener('bazaar:quickview-open', handler);
  document.addEventListener('keydown', escHandler);

  onUnmounted(() => {
    document.removeEventListener('bazaar:quickview-open', handler);
    document.removeEventListener('keydown', escHandler);
  });
});
</script>
