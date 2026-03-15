<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-50"
      @click="closeCart"
    />

    <!-- Cart drawer -->
    <aside
      class="fixed top-0 bottom-0 w-96 max-w-[90vw] bg-white dark:bg-surface-900 z-50 transition-transform duration-300 ease-out shadow-2xl flex flex-col"
      :class="isOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'"
      :style="{ right: dir === 'ltr' ? '0' : 'auto', left: dir === 'rtl' ? '0' : 'auto' }"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
        <h2 class="text-lg font-heading font-bold text-surface-900 dark:text-white" data-i18n="cart.yourBag">Your Bag</h2>
        <button
          type="button"
          class="rounded-full p-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors cursor-pointer"
          aria-label="Close cart"
          @click="closeCart"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Free shipping progress bar -->
      <div v-if="cartStore.items.length > 0" class="px-4 py-3 border-b border-surface-200 dark:border-surface-700">
        <div class="flex items-center justify-between text-xs mb-1.5">
          <span :class="shippingUnlocked ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-surface-600 dark:text-surface-400'">
            {{ shippingUnlocked ? 'Free shipping unlocked!' : `You're $${remaining.toFixed(2)} away from free shipping!` }}
          </span>
          <span v-if="shippingUnlocked" class="text-emerald-500">
            <svg class="h-4 w-4 inline" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
          </span>
        </div>
        <div class="h-1.5 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
          <div
            class="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
            :style="{ width: progressPct + '%' }"
          />
        </div>
      </div>

      <!-- Items -->
      <div v-if="cartStore.items.length > 0" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="`${item.id}-${item.size}-${item.color}`"
          class="flex gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            width="64"
            height="80"
            class="w-16 h-20 rounded-lg flex-shrink-0 object-cover"
          />
          <div
            v-else
            class="w-16 h-20 rounded-lg flex-shrink-0 flex items-center justify-center text-white/70 text-xs"
            :style="{ backgroundColor: item.placeholderColor || '#c4a882' }"
          >
            {{ item.title.substring(0, 3) }}
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-medium text-surface-900 dark:text-white truncate">{{ item.title }}</h4>
            <p class="text-xs text-surface-500 dark:text-surface-400">{{ item.size }} / {{ item.color }}</p>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="w-6 h-6 rounded border border-surface-300 dark:border-surface-600 text-xs flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer"
                  @click="decreaseQuantity(item)"
                >-</button>
                <span class="text-sm">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="w-6 h-6 rounded border border-surface-300 dark:border-surface-600 text-xs flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer"
                  @click="cartStore.updateQuantity(item.id, item.size, item.color, item.quantity + 1)"
                >+</button>
              </div>
              <span class="text-sm font-semibold text-surface-900 dark:text-white">
                ${{ ((item.salePrice || item.price) * item.quantity).toFixed(2) }}
              </span>
            </div>
          </div>
          <button
            type="button"
            class="text-surface-400 hover:text-red-500 transition-colors self-start cursor-pointer"
            aria-label="Remove item"
            @click="cartStore.remove(item.id, item.size, item.color)"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <!-- Upsells -->
      <div v-if="cartStore.items.length > 0 && upsellProducts.length > 0" class="px-4 pb-3">
        <p class="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">You might also like</p>
        <div class="space-y-2">
          <div
            v-for="p in upsellProducts"
            :key="p.id"
            class="flex items-center gap-3 p-2 rounded-lg bg-surface-50 dark:bg-surface-800"
          >
            <img
              v-if="p.image"
              :src="p.image"
              :alt="p.title"
              width="40"
              height="48"
              class="w-10 h-12 rounded flex-shrink-0 object-cover"
            />
            <div
              v-else
              class="w-10 h-12 rounded flex-shrink-0"
              :style="{ backgroundColor: p.placeholderColor }"
            />
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium text-surface-900 dark:text-white truncate">{{ p.title }}</p>
              <p class="text-xs text-surface-500">${{ (p.salePrice || p.price).toFixed(2) }}</p>
            </div>
            <button
              type="button"
              class="text-xs font-semibold text-primary-500 hover:text-primary-600 cursor-pointer whitespace-nowrap"
              @click="addUpsell(p)"
            >+ Add</button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="cartStore.items.length === 0" class="flex-1 flex flex-col items-center justify-center p-8">
        <svg class="h-16 w-16 text-surface-300 dark:text-surface-600 mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <p class="text-surface-500 dark:text-surface-400 text-center mb-4">Your bag is empty</p>
        <NuxtLink to="/shop" class="btn-primary text-sm" @click="closeCart">Continue Shopping</NuxtLink>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.items.length > 0" class="border-t border-surface-200 dark:border-surface-700 p-4 space-y-3">
        <div class="flex items-center justify-between text-lg font-heading font-bold text-surface-900 dark:text-white">
          <span>Subtotal</span>
          <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
        </div>
        <p class="text-xs text-surface-500 dark:text-surface-400">Shipping and taxes calculated at checkout.</p>
        <NuxtLink to="/cart" class="btn-primary w-full text-center" @click="closeCart">View Bag</NuxtLink>
        <NuxtLink to="/checkout" class="btn-outline w-full text-center" data-i18n="cart.checkout" @click="closeCart">Checkout</NuxtLink>
        <NuxtLink to="/checkout-steps" class="block w-full text-center text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors mt-2" @click="closeCart">Multi-Step Checkout &rarr;</NuxtLink>
      </div>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import productsData from '~/app/data/products.json';
import siteConfig from '~/app/data/site-config.json';

const cartStore = useCartStore();
const isOpen = ref(false);
const dir = ref('ltr');
const threshold = siteConfig.freeShippingThreshold || 99;

const products = productsData as unknown as Product[];

const shippingUnlocked = computed(() => cartStore.cartTotal >= threshold);
const remaining = computed(() => Math.max(0, threshold - cartStore.cartTotal));
const progressPct = computed(() => Math.min(100, (cartStore.cartTotal / threshold) * 100));

const upsellProducts = computed(() => {
  const cartIds = cartStore.items.map((i) => i.id);
  const available = products.filter((p) => p.inStock && !cartIds.includes(p.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
});

function decreaseQuantity(item: { id: number; size: string; color: string; quantity: number }) {
  if (item.quantity <= 1) {
    cartStore.remove(item.id, item.size, item.color);
  } else {
    cartStore.updateQuantity(item.id, item.size, item.color, item.quantity - 1);
  }
}

function addUpsell(p: Product) {
  cartStore.add({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: p.price,
    salePrice: p.salePrice,
    size: '',
    color: '',
    quantity: 1,
    image: p.image,
    placeholderColor: p.placeholderColor,
  });
}

function openCart() {
  cartStore.hydrate();
  isOpen.value = true;
}

function closeCart() {
  isOpen.value = false;
}

onMounted(() => {
  cartStore.hydrate();
  dir.value = document.documentElement.dir || 'ltr';

  const openHandler = () => openCart();
  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) closeCart();
  };
  const localeHandler = () => {
    dir.value = document.documentElement.dir || 'ltr';
  };

  document.addEventListener('bazaar:open-cart', openHandler);
  document.addEventListener('keydown', escHandler);
  document.addEventListener('bazaar:locale-changed', localeHandler);

  onUnmounted(() => {
    document.removeEventListener('bazaar:open-cart', openHandler);
    document.removeEventListener('keydown', escHandler);
    document.removeEventListener('bazaar:locale-changed', localeHandler);
  });
});
</script>
