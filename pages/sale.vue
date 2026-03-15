<template>
  <!-- Sale hero -->
  <section class="gradient-sale py-16 md:py-24 text-center relative overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
      <div class="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
    </div>
    <div class="container-custom relative">
      <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">Limited Time</span>
      <h1 class="text-4xl md:text-6xl font-heading font-bold text-white mb-4">Flash Sale</h1>
      <p class="text-xl text-white/90 mb-8">Up to 60% off selected styles</p>

      <!-- Countdown -->
      <div class="flex justify-center gap-4 mb-8">
        <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
          <div class="text-3xl font-heading font-bold text-white">{{ countdown.days }}</div>
          <div class="text-xs text-white/70 uppercase tracking-wider">Days</div>
        </div>
        <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
          <div class="text-3xl font-heading font-bold text-white">{{ countdown.hours }}</div>
          <div class="text-xs text-white/70 uppercase tracking-wider">Hours</div>
        </div>
        <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
          <div class="text-3xl font-heading font-bold text-white">{{ countdown.minutes }}</div>
          <div class="text-xs text-white/70 uppercase tracking-wider">Mins</div>
        </div>
        <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-3 min-w-[70px]">
          <div class="text-3xl font-heading font-bold text-white">{{ countdown.seconds }}</div>
          <div class="text-xs text-white/70 uppercase tracking-wider">Secs</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container-custom">
      <div v-if="saleProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in saleProducts" :key="product.id" :product="product" />
      </div>
      <div v-else class="text-center py-16">
        <p class="text-surface-500 text-lg">No sale items currently available. Check back soon!</p>
        <NuxtLink to="/shop" class="btn-primary mt-4 inline-block">Shop All Products</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import products from '~/app/data/products.json';

useBazaarSEO({
  title: 'Sale',
  description: 'Shop our sale collection — up to 60% off selected styles.',
});

const typedProducts = products as Product[];
const saleProducts = computed(() => typedProducts.filter((p) => p.isSale));

// Countdown timer
const countdown = reactive({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
});

let targetTime: number;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

function updateCountdown() {
  const now = Date.now();
  const diff = targetTime - now;
  if (diff <= 0) {
    countdown.days = '00';
    countdown.hours = '00';
    countdown.minutes = '00';
    countdown.seconds = '00';
    if (countdownInterval) clearInterval(countdownInterval);
    return;
  }

  countdown.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  countdown.hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  countdown.minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  countdown.seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
}

onMounted(() => {
  targetTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval);
});
</script>
