<template>
  <HeroAlt title="Press & Media" subtitle="What leading publications are saying about Bazaar Studio" badge="In the News" />

  <!-- As Seen In -->
  <section class="section pb-0">
    <div class="container-custom">
      <p class="text-center text-sm font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-widest mb-8">As Seen In</p>
      <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        <div v-for="pub in press.publications" :key="pub.name" class="flex items-center justify-center">
          <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="pub.name">
            <rect width="120" height="40" rx="6" :fill="pub.placeholderColor" opacity="0.1" />
            <text x="60" y="24" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700" :fill="pub.placeholderColor" opacity="0.6">{{ pub.name }}</text>
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- Press Mentions -->
  <section class="section">
    <div class="container-custom max-w-4xl">
      <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white text-center mb-12">Press Mentions</h2>
      <div class="space-y-6">
        <article
          v-for="mention in press.mentions"
          :key="mention.headline"
          class="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700 hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col sm:flex-row sm:items-start gap-4">
            <div class="shrink-0">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300">{{ mention.publication }}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-heading font-bold text-lg text-surface-900 dark:text-white mb-1">{{ mention.headline }}</h3>
              <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">{{ formatDate(mention.date) }}</p>
              <p class="text-sm text-surface-600 dark:text-surface-400 mb-3">{{ mention.excerpt }}</p>
              <a :href="mention.url" class="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                Read Article
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Media Kit -->
  <section class="section bg-surface-50 dark:bg-surface-900">
    <div class="container-custom max-w-3xl">
      <div class="text-center">
        <h2 class="text-3xl font-heading font-bold text-surface-900 dark:text-white mb-4">Media Kit</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">Download our press kit with brand assets, high-resolution logos, product photos, and founder bios.</p>
        <button class="btn-primary inline-flex items-center gap-2" @click="handleMediaKit">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          Download Media Kit
        </button>
      </div>
    </div>
  </section>

  <!-- Press Contact -->
  <section class="section">
    <div class="container-custom max-w-2xl text-center">
      <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-4">Press Inquiries</h2>
      <p class="text-surface-600 dark:text-surface-400 mb-2">For press inquiries, interview requests, or collaboration opportunities:</p>
      <a href="mailto:press@bazaar-studio.com" class="text-lg font-semibold text-primary-600 dark:text-primary-400 hover:underline">press@bazaar-studio.com</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import press from '~/app/data/press.json';

useBazaarSEO({
  title: 'Press & Media',
  description: 'Bazaar Studio in the press — read what top publications are saying about our brand.',
});

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function handleMediaKit() {
  alert('Media kit download — this is a demo.');
}
</script>
