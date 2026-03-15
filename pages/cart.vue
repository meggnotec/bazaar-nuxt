<template>
  <HeroAlt title="Your Bag" subtitle="Review your items before checkout" />

  <section class="section">
    <div class="container-custom">
      <ClientOnly>
        <!-- Empty state -->
        <div v-if="cartStore.items.length === 0" class="text-center py-16">
          <svg class="h-24 w-24 text-surface-300 dark:text-surface-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">Your bag is empty</h2>
          <p class="text-surface-500 dark:text-surface-400 mb-6">Looks like you haven't added any items yet.</p>
          <NuxtLink to="/shop" class="btn-primary">Continue Shopping</NuxtLink>
        </div>

        <!-- Cart with items -->
        <div v-else>
          <div class="lg:flex gap-8">
            <!-- Items -->
            <div class="flex-1">
              <div class="space-y-4">
                <div
                  v-for="item in cartStore.items"
                  :key="`${item.id}-${item.size}-${item.color}`"
                  class="flex gap-4 p-4 rounded-xl bg-surface-50 dark:bg-surface-800"
                >
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    width="80"
                    height="96"
                    class="w-20 h-24 rounded-lg flex-shrink-0 object-cover"
                  />
                  <div
                    v-else
                    class="w-20 h-24 rounded-lg flex-shrink-0 flex items-center justify-center text-white/60 text-xs font-heading"
                    :style="{ backgroundColor: item.placeholderColor || '#c4a882' }"
                  >
                    {{ item.title.substring(0, 5) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-heading font-semibold text-surface-900 dark:text-white truncate">{{ item.title }}</h3>
                    <p class="text-sm text-surface-500 dark:text-surface-400">{{ item.size }} / {{ item.color }}</p>
                    <p class="text-sm font-semibold text-surface-900 dark:text-white mt-1">${{ (item.salePrice ?? item.price).toFixed(2) }}</p>
                  </div>
                  <div class="flex flex-col items-end gap-2">
                    <button
                      type="button"
                      class="text-surface-400 hover:text-red-500 transition-colors"
                      aria-label="Remove"
                      @click="cartStore.remove(item.id, item.size, item.color)"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        class="w-7 h-7 rounded border border-surface-300 dark:border-surface-600 text-sm flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-700"
                        @click="decreaseQuantity(item)"
                      >
                        -
                      </button>
                      <span class="text-sm font-medium w-6 text-center">{{ item.quantity }}</span>
                      <button
                        type="button"
                        class="w-7 h-7 rounded border border-surface-300 dark:border-surface-600 text-sm flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-700"
                        @click="cartStore.updateQuantity(item.id, item.size, item.color, item.quantity + 1)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order notes -->
              <div class="mt-6 p-4 rounded-xl bg-surface-50 dark:bg-surface-800">
                <label for="order-notes" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Order Notes</label>
                <textarea
                  id="order-notes"
                  v-model="orderNotes"
                  placeholder="Add any special instructions or notes for your order..."
                  rows="3"
                  class="w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
                ></textarea>
              </div>

              <div class="mt-6 flex items-center justify-between">
                <NuxtLink to="/shop" class="text-primary-500 hover:text-primary-600 text-sm font-medium">
                  &larr; Continue Shopping
                </NuxtLink>
                <button
                  type="button"
                  class="text-sm text-surface-500 hover:text-red-500 transition-colors"
                  @click="cartStore.clear()"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            <!-- Summary sidebar -->
            <div class="lg:w-80 mt-8 lg:mt-0">
              <div class="rounded-2xl bg-surface-50 dark:bg-surface-800 p-6 sticky top-24">
                <h3 class="text-lg font-heading font-bold text-surface-900 dark:text-white mb-4">Order Summary</h3>

                <div class="mb-4">
                  <PromoCodeInput />
                </div>

                <div class="space-y-3 text-sm">
                  <div class="flex justify-between text-surface-600 dark:text-surface-400">
                    <span>Subtotal</span>
                    <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-surface-600 dark:text-surface-400">
                    <span>Shipping</span>
                    <span>{{ shippingLabel }}</span>
                  </div>
                  <hr class="border-surface-200 dark:border-surface-700" />
                  <div class="flex justify-between text-lg font-heading font-bold text-surface-900 dark:text-white">
                    <span>Total</span>
                    <span>${{ orderTotal.toFixed(2) }}</span>
                  </div>
                </div>

                <NuxtLink to="/checkout" class="btn-primary w-full text-center mt-6 block">Checkout</NuxtLink>
                <NuxtLink to="/checkout-steps" class="btn-outline w-full text-center mt-3 block">Multi-Step Checkout</NuxtLink>
                <p class="text-xs text-surface-500 dark:text-surface-400 text-center mt-3">
                  {{ shippingNote }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types';

const cartStore = useCartStore();

useBazaarSEO({
  title: 'Your Bag',
  description: 'Review your shopping bag and proceed to checkout.',
});

const orderNotes = ref('');

const shippingCost = computed(() =>
  cartStore.cartTotal >= 99 ? 0 : 9.95
);

const shippingLabel = computed(() =>
  shippingCost.value === 0 ? 'Free' : `$${shippingCost.value.toFixed(2)}`
);

const orderTotal = computed(() =>
  cartStore.cartTotal + shippingCost.value
);

const shippingNote = computed(() =>
  cartStore.cartTotal < 99
    ? `Add $${(99 - cartStore.cartTotal).toFixed(2)} more for free shipping`
    : 'You qualify for free shipping!'
);

function decreaseQuantity(item: CartItem) {
  if (item.quantity <= 1) {
    cartStore.remove(item.id, item.size, item.color);
  } else {
    cartStore.updateQuantity(item.id, item.size, item.color, item.quantity - 1);
  }
}

onMounted(() => {
  cartStore.hydrate();
  orderNotes.value = localStorage.getItem('bazaar-order-notes') || '';
});

watch(orderNotes, (val) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('bazaar-order-notes', val);
  }
});
</script>
