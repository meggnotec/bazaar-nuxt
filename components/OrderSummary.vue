<template>
  <div class="rounded-2xl bg-surface-50 dark:bg-surface-800 p-6 sticky top-24">
    <h3 class="text-lg font-heading font-bold text-surface-900 dark:text-white mb-4">Order Summary</h3>

    <div class="space-y-3 text-sm">
      <div class="flex justify-between text-surface-600 dark:text-surface-400">
        <span>Subtotal</span>
        <span>${{ computedSubtotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-surface-600 dark:text-surface-400">
        <span>Shipping</span>
        <span>{{ computedSubtotal >= 99 ? 'Free' : '$9.95' }}</span>
      </div>
      <div class="flex justify-between text-surface-600 dark:text-surface-400">
        <span>Tax (estimated)</span>
        <span>${{ tax.toFixed(2) }}</span>
      </div>
      <hr class="border-surface-200 dark:border-surface-700" />
      <div class="flex justify-between text-lg font-heading font-bold text-surface-900 dark:text-white">
        <span>Total</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <NuxtLink v-if="showCheckoutBtn" to="/checkout" class="btn-primary w-full text-center mt-6">
      Proceed to Checkout
    </NuxtLink>

    <p class="text-xs text-surface-500 dark:text-surface-400 text-center mt-3">
      {{ computedSubtotal < 99 ? `Add $${(99 - computedSubtotal).toFixed(2)} more for free shipping` : 'You qualify for free shipping!' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  subtotal?: number;
  showCheckoutBtn?: boolean;
}>(), {
  subtotal: 0,
  showCheckoutBtn: true,
});

const computedSubtotal = computed(() => props.subtotal);
const shipping = computed(() => computedSubtotal.value >= 99 ? 0 : 9.95);
const tax = computed(() => computedSubtotal.value * 0.08);
const total = computed(() => computedSubtotal.value + shipping.value + tax.value);
</script>
