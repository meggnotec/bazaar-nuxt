<template>
  <div>
    <HeroAlt title="Lookbook" subtitle="Seasonal edits and style inspiration" badge="Collections" />

    <section class="section">
      <div class="container-custom">

        <!-- Feature -- full bleed hero card -->
        <NuxtLink to="/shop" class="group block relative overflow-hidden rounded-2xl mb-6">
          <div class="aspect-[16/7] overflow-hidden">
            <img
              :src="lookbook[0].image"
              :alt="lookbook[0].title"
              width="1400"
              height="612"
              loading="eager"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div class="absolute inset-0 flex items-end p-6 md:p-10 lg:p-14">
            <div>
              <p class="text-xs uppercase tracking-widest text-white/60 mb-2">{{ lookbook[0].season }} {{ lookbook[0].year }}</p>
              <h2 class="text-3xl md:text-5xl font-heading font-bold text-white mb-3">{{ lookbook[0].title }}</h2>
              <p class="text-white/70 text-sm max-w-md mb-5 hidden sm:block">{{ lookbook[0].description }}</p>
              <span class="inline-flex items-center gap-2 text-sm font-medium text-white border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                Shop this collection
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- Two-up row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <NuxtLink
            v-for="collection in lookbook.slice(1, 3)"
            :key="collection.id"
            to="/shop"
            class="group block relative overflow-hidden rounded-2xl"
          >
            <div class="aspect-[4/5] overflow-hidden">
              <img
                :src="collection.image"
                :alt="collection.title"
                width="700"
                height="875"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p class="text-[11px] uppercase tracking-widest text-white/50 mb-1.5">{{ collection.season }} {{ collection.year }} &mdash; {{ collection.itemCount }} pieces</p>
              <h3 class="text-2xl md:text-3xl font-heading font-bold text-white mb-2">{{ collection.title }}</h3>
              <span class="inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                View collection &rarr;
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Three-up row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <NuxtLink
            v-for="collection in lookbook.slice(3, 6)"
            :key="collection.id"
            to="/shop"
            class="group block"
          >
            <div class="relative overflow-hidden rounded-2xl mb-4">
              <div class="aspect-[3/4] overflow-hidden">
                <img
                  :src="collection.image"
                  :alt="collection.title"
                  width="500"
                  height="667"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <p class="text-[11px] uppercase tracking-widest text-surface-400 dark:text-surface-500 mb-1">{{ collection.tag }}</p>
            <h3 class="text-lg font-heading font-semibold text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{{ collection.title }}</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400 mt-1">{{ collection.itemCount }} pieces</p>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- Single CTA -->
    <section class="section border-t border-surface-200 dark:border-surface-800">
      <div class="container-custom text-center">
        <p class="text-surface-500 dark:text-surface-400 mb-5">New collections drop every season.</p>
        <NuxtLink to="/shop" class="btn-primary">Shop All Products</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import lookbook from '~/app/data/lookbook.json';

useBazaarSEO({
  title: 'Lookbook',
  description: 'Explore our curated lookbook collections \u2014 seasonal style inspiration from Bazaar Studio.',
});
</script>
