<template>
  <HeroAlt title="Checkout" subtitle="Complete your purchase" />

  <section class="section">
    <div class="container-custom max-w-3xl">
      <CheckoutSteps :current-step="1" />

      <!-- Order summary -->
      <ClientOnly>
        <div class="mb-8 rounded-xl bg-surface-50 dark:bg-surface-800 p-4">
          <h3 class="text-sm font-heading font-semibold text-surface-900 dark:text-white mb-3">Order Items</h3>
          <div class="space-y-2 text-sm text-surface-600 dark:text-surface-400">
            <template v-if="cartStore.items.length > 0">
              <div v-for="item in cartStore.items" :key="`${item.id}-${item.size}-${item.color}`" class="flex justify-between">
                <span>{{ item.title }} &times; {{ item.quantity }}</span>
                <span>${{ ((item.salePrice ?? item.price) * item.quantity).toFixed(2) }}</span>
              </div>
            </template>
            <p v-else class="text-surface-400">
              No items in cart. <NuxtLink to="/shop" class="text-primary-500 hover:underline">Shop now</NuxtLink>
            </p>
          </div>
          <hr class="border-surface-200 dark:border-surface-700 my-3" />
          <div class="flex justify-between font-heading font-bold text-surface-900 dark:text-white">
            <span>Total</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </ClientOnly>

      <CheckoutForm />
    </div>
  </section>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

useBazaarSEO({
  title: 'Checkout',
  description: 'Complete your order securely.',
});

onMounted(() => {
  cartStore.hydrate();
});
</script>
