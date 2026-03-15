<template>
  <section v-if="companions.length > 0" class="py-10 border-t border-surface-200 dark:border-surface-700">
    <div class="container-custom">
      <h2 class="font-heading font-bold text-xl text-surface-900 dark:text-white mb-6" data-i18n="product.frequentlyBought">Frequently Bought Together</h2>

      <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
        <!-- Products row -->
        <div class="flex items-center gap-3 flex-wrap">
          <div v-for="(item, i) in allItems" :key="item.id" class="flex items-center gap-3">
            <div class="flex items-center gap-3 p-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
              <input
                type="checkbox"
                :checked="checkedIds.has(item.id)"
                class="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
                :aria-label="`Include ${item.title}`"
                :disabled="i === 0"
                @change="toggleCheck(item.id)"
              />
              <div class="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-100 dark:bg-surface-800">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  width="64"
                  height="80"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full"
                  :style="{ backgroundColor: item.placeholderColor }"
                />
              </div>
              <div class="min-w-0">
                <NuxtLink :to="`/shop/${item.slug}`" class="text-sm font-medium text-surface-900 dark:text-white hover:text-primary-500 transition-colors line-clamp-1">{{ item.title }}</NuxtLink>
                <div class="text-sm">
                  <span v-if="item.salePrice" class="text-primary-500 font-semibold">${{ item.salePrice.toFixed(2) }}</span>
                  <span v-else class="text-surface-700 dark:text-surface-300 font-semibold">${{ item.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
            <span v-if="i < allItems.length - 1" class="text-2xl text-surface-300 dark:text-surface-600 font-light">+</span>
          </div>
        </div>

        <!-- Total + Add all button -->
        <div class="flex-shrink-0 text-center md:text-start md:ms-auto">
          <div class="mb-2">
            <span class="text-sm text-surface-500 dark:text-surface-400" data-i18n="product.totalPrice">Total price:</span>
            <span class="text-xl font-heading font-bold text-surface-900 dark:text-white ms-1">${{ totalPrice.toFixed(2) }}</span>
          </div>
          <button type="button" class="btn-primary py-2.5 px-6 text-sm cursor-pointer" @click="addAllToCart">
            <span>{{ addedFeedback ? 'Added!' : 'Add All to Cart' }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

const props = defineProps<{
  product: Product;
  companions: Product[];
}>();

const cartStore = useCartStore();
const addedFeedback = ref(false);

const allItems = computed(() => [props.product, ...props.companions.slice(0, 2)]);
const checkedIds = ref(new Set(allItems.value.map((item) => item.id)));

// Ensure the main product is always checked
watch(allItems, (items) => {
  checkedIds.value = new Set(items.map((item) => item.id));
});

function toggleCheck(id: number) {
  // Don't allow unchecking the main product
  if (id === props.product.id) return;
  if (checkedIds.value.has(id)) {
    checkedIds.value.delete(id);
  } else {
    checkedIds.value.add(id);
  }
  // Force reactivity
  checkedIds.value = new Set(checkedIds.value);
}

const totalPrice = computed(() => {
  return allItems.value
    .filter((item) => checkedIds.value.has(item.id))
    .reduce((sum, p) => sum + (p.salePrice || p.price), 0);
});

function addAllToCart() {
  const checked = allItems.value.filter((item) => checkedIds.value.has(item.id));
  checked.forEach((item) => {
    cartStore.add({
      id: item.id,
      slug: item.slug,
      title: item.title,
      price: item.price,
      salePrice: item.salePrice,
      size: '',
      color: '',
      quantity: 1,
      image: item.image,
      placeholderColor: item.placeholderColor,
    });
  });

  addedFeedback.value = true;
  setTimeout(() => {
    addedFeedback.value = false;
  }, 1500);
}
</script>
