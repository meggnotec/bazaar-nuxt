<template>
  <HeroAlt title="Track Your Order" subtitle="Enter your order details to see real-time status updates" badge="Order Status" />

  <section class="section">
    <div class="container-custom max-w-2xl">
      <!-- Tracking Form -->
      <div v-if="!showResult" class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-sm border border-surface-200 dark:border-surface-700">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="order-number" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Order Number</label>
            <input
              id="order-number"
              v-model="orderNumber"
              type="text"
              placeholder="e.g. BZR-2026-78432"
              class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label for="order-email" class="block text-sm font-semibold text-surface-900 dark:text-white mb-2">Email Address</label>
            <input
              id="order-email"
              v-model="orderEmail"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              required
            />
          </div>
          <button type="submit" class="btn-primary w-full">Track Order</button>
        </form>
      </div>

      <!-- Mock Result -->
      <div v-if="showResult" class="mt-8 space-y-6">
        <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-sm border border-surface-200 dark:border-surface-700">
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-sm text-surface-500 dark:text-surface-400">Order Number</p>
              <p class="font-heading font-bold text-surface-900 dark:text-white">{{ displayOrderId }}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">In Transit</span>
          </div>

          <!-- Timeline -->
          <div class="relative">
            <div class="absolute start-4 top-0 bottom-0 w-0.5 bg-surface-200 dark:bg-surface-700"></div>
            <div class="space-y-8">
              <div class="relative flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center z-10 shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p class="font-semibold text-surface-900 dark:text-white">Order Placed</p>
                  <p class="text-sm text-surface-500 dark:text-surface-400">March 8, 2026 — 2:34 PM</p>
                </div>
              </div>
              <div class="relative flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center z-10 shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p class="font-semibold text-surface-900 dark:text-white">Processing</p>
                  <p class="text-sm text-surface-500 dark:text-surface-400">March 9, 2026 — 9:15 AM</p>
                </div>
              </div>
              <div class="relative flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center z-10 shrink-0 animate-pulse">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p class="font-semibold text-surface-900 dark:text-white">Shipped</p>
                  <p class="text-sm text-surface-500 dark:text-surface-400">March 10, 2026 — 11:42 AM</p>
                  <p class="text-sm text-primary-600 dark:text-primary-400 mt-1">Tracking: 1Z999AA10123456784</p>
                </div>
              </div>
              <div class="relative flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center z-10 shrink-0">
                  <svg class="w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" /></svg>
                </div>
                <div>
                  <p class="font-semibold text-surface-400 dark:text-surface-500">Delivered</p>
                  <p class="text-sm text-surface-400 dark:text-surface-500">Estimated: March 13, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-sm border border-surface-200 dark:border-surface-700">
          <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-4">Order Details</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4 pb-4 border-b border-surface-200 dark:border-surface-700">
              <div class="w-16 h-20 rounded-lg overflow-hidden bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                <svg class="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-surface-900 dark:text-white">Cashmere Blend Sweater</p>
                <p class="text-sm text-surface-500 dark:text-surface-400">Size: M — Color: Ivory — Qty: 1</p>
              </div>
              <p class="font-semibold text-surface-900 dark:text-white">$129.00</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-16 h-20 rounded-lg overflow-hidden bg-secondary-100 dark:bg-secondary-900/20 flex items-center justify-center shrink-0">
                <svg class="w-8 h-8 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-surface-900 dark:text-white">Leather Crossbody Bag</p>
                <p class="text-sm text-surface-500 dark:text-surface-400">Color: Tan — Qty: 1</p>
              </div>
              <p class="font-semibold text-surface-900 dark:text-white">$189.00</p>
            </div>
          </div>
          <div class="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700 space-y-2">
            <div class="flex justify-between text-sm"><span class="text-surface-500 dark:text-surface-400">Subtotal</span><span class="text-surface-900 dark:text-white">$318.00</span></div>
            <div class="flex justify-between text-sm"><span class="text-surface-500 dark:text-surface-400">Shipping</span><span class="text-emerald-600 dark:text-emerald-400">Free</span></div>
            <div class="flex justify-between text-sm"><span class="text-surface-500 dark:text-surface-400">Tax</span><span class="text-surface-900 dark:text-white">$27.63</span></div>
            <div class="flex justify-between font-bold text-lg pt-2 border-t border-surface-200 dark:border-surface-700"><span class="text-surface-900 dark:text-white">Total</span><span class="text-surface-900 dark:text-white">$345.63</span></div>
          </div>
        </div>

        <div class="text-center">
          <button class="text-primary-600 dark:text-primary-400 hover:underline text-sm font-semibold" @click="trackAnother">Track Another Order</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Order Tracking',
  description: 'Track your Bazaar Studio order status in real-time with your order number and email.',
});

const orderNumber = ref('');
const orderEmail = ref('');
const showResult = ref(false);
const displayOrderId = ref('BZR-2026-78432');

function handleSubmit() {
  displayOrderId.value = orderNumber.value.trim() || 'BZR-2026-78432';
  showResult.value = true;
}

function trackAnother() {
  showResult.value = false;
  orderNumber.value = '';
  orderEmail.value = '';
}
</script>
