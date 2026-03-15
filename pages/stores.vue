<template>
  <HeroAlt title="Our Stores" subtitle="Visit us in person at one of our flagship locations worldwide" badge="Locations" />

  <!-- Map Placeholder -->
  <section class="section pb-0">
    <div class="container-custom">
      <div class="relative rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800 aspect-[16/7]">
        <svg class="w-full h-full" viewBox="0 0 1200 525" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Store locations map">
          <rect width="1200" height="525" fill="currentColor" class="text-surface-200 dark:text-surface-700" />
          <text x="600" y="240" text-anchor="middle" font-family="system-ui" font-size="16" class="fill-surface-400 dark:fill-surface-500">Interactive Map</text>
          <text x="600" y="265" text-anchor="middle" font-family="system-ui" font-size="13" class="fill-surface-400 dark:fill-surface-500">Connect your preferred maps provider</text>
          <g v-for="pin in mapPins" :key="pin.label">
            <circle :cx="pin.x" :cy="pin.y" r="8" fill="#e11d48" opacity="0.9" />
            <circle :cx="pin.x" :cy="pin.y" r="12" fill="#e11d48" opacity="0.2" />
            <text :x="pin.x" :y="pin.y - 18" text-anchor="middle" font-family="system-ui" font-size="10" font-weight="600" fill="#e11d48">{{ pin.label }}</text>
          </g>
        </svg>
      </div>
    </div>
  </section>

  <!-- Store Cards -->
  <section class="section">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="store in stores"
          :key="store.id"
          class="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 hover:shadow-lg transition-shadow"
        >
          <div class="aspect-[3/2] overflow-hidden">
            <Placeholder :width="600" :height="400" :label="store.city" :bg-color="store.placeholderColor" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h3 class="font-heading font-bold text-lg text-surface-900 dark:text-white mb-1">{{ store.name }}</h3>
            <p class="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-4">{{ store.city }}</p>
            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-3">
                <svg class="w-4 h-4 text-surface-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                <span class="text-surface-600 dark:text-surface-400">{{ store.address }}</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-4 h-4 text-surface-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                <span class="text-surface-600 dark:text-surface-400">{{ store.phone }}</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-4 h-4 text-surface-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="text-surface-600 dark:text-surface-400">{{ store.hours }}</span>
              </div>
            </div>
            <a href="#" class="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
              Get Directions
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom text-center">
      <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">Can't Visit In Person?</h2>
      <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">Shop our full collection online with free shipping on orders over $99.</p>
      <NuxtLink to="/shop" class="btn-primary">Shop Online</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import stores from '~/app/data/stores.json';

useBazaarSEO({
  title: 'Our Stores',
  description: 'Visit Bazaar Studio in person. Find our flagship stores in New York, Los Angeles, London, Paris, Tokyo, and Sydney.',
});

const mapPins = [
  { x: 310, y: 180, label: 'NYC' },
  { x: 220, y: 200, label: 'LA' },
  { x: 560, y: 160, label: 'LON' },
  { x: 580, y: 175, label: 'PAR' },
  { x: 920, y: 185, label: 'TKY' },
  { x: 960, y: 350, label: 'SYD' },
];
</script>
