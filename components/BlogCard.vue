<template>
  <article class="card group overflow-hidden">
    <!-- Image area -->
    <NuxtLink :to="`/blog/${slug}`" class="block relative aspect-[16/10] overflow-hidden rounded-t-2xl">
      <img
        v-if="image && !image.includes('placeholder.svg')"
        :src="image"
        :alt="title"
        width="800"
        height="500"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
        :style="{ backgroundColor: bgColor }"
      >
        <svg class="h-12 w-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
      </div>
      <!-- Category badge -->
      <div class="absolute top-3 start-3">
        <span :class="['badge text-[10px]', colors.bg, colors.text, colors.darkBg, colors.darkText]">
          {{ category }}
        </span>
      </div>
    </NuxtLink>
    <!-- Content -->
    <div class="p-5">
      <time class="text-xs text-surface-500 dark:text-surface-400 mb-2 block" :datetime="pubDate">
        {{ formattedDate }}
      </time>
      <NuxtLink :to="`/blog/${slug}`" class="block group/title">
        <h3 class="font-heading font-bold text-lg text-surface-900 dark:text-white mb-2 line-clamp-2 group-hover/title:text-primary-500 transition-colors">
          {{ title }}
        </h3>
      </NuxtLink>
      <p class="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mb-4">
        {{ description }}
      </p>
      <NuxtLink :to="`/blog/${slug}`" class="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        <span data-i18n="blog.readMore">Read More</span>
        <svg class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  pubDate: string;
  category: string;
  slug: string;
  image?: string;
}>();

const formattedDate = computed(() => {
  return new Date(props.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const categoryColors: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  Style: { bg: 'bg-primary-100', text: 'text-primary-700', darkBg: 'dark:bg-primary-950', darkText: 'dark:text-primary-300' },
  Sustainability: { bg: 'bg-emerald-100', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-950', darkText: 'dark:text-emerald-300' },
  Guides: { bg: 'bg-secondary-100', text: 'text-secondary-700', darkBg: 'dark:bg-secondary-950', darkText: 'dark:text-secondary-300' },
  'Behind the Scenes': { bg: 'bg-accent-100', text: 'text-accent-700', darkBg: 'dark:bg-accent-950', darkText: 'dark:text-accent-300' },
  Fashion: { bg: 'bg-secondary-100', text: 'text-secondary-700', darkBg: 'dark:bg-secondary-950', darkText: 'dark:text-secondary-300' },
  Care: { bg: 'bg-emerald-100', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-950', darkText: 'dark:text-emerald-300' },
  Design: { bg: 'bg-accent-100', text: 'text-accent-700', darkBg: 'dark:bg-accent-950', darkText: 'dark:text-accent-300' },
};
const colors = computed(() => categoryColors[props.category] || categoryColors['Style']);

const placeholderColors = ['#c4a882', '#a08968', '#d4b896', '#b07d62', '#8b9a6d', '#c8956c'];
const colorIndex = props.title.length % placeholderColors.length;
const bgColor = placeholderColors[colorIndex];
</script>
