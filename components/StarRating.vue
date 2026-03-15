<template>
  <div class="flex items-center gap-1">
    <div class="flex" role="img" :aria-label="`Rating: ${rating} out of 5 stars`">
      <svg
        v-for="i in fullStars"
        :key="`full-${i}`"
        :class="[starSize, 'text-accent-500 shrink-0']"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        v-if="hasHalf"
        :class="[starSize, 'text-accent-500 shrink-0']"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <defs>
          <linearGradient :id="starId">
            <stop offset="50%" stop-color="currentColor" />
            <stop offset="50%" stop-color="transparent" />
          </linearGradient>
        </defs>
        <path :fill="`url(#${starId})`" stroke="currentColor" stroke-width="1" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <svg
        v-for="i in emptyStars"
        :key="`empty-${i}`"
        :class="[starSize, 'text-surface-300 dark:text-surface-600 shrink-0']"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
    <span v-if="reviewCount !== undefined" class="text-xs text-surface-500 dark:text-surface-400">({{ reviewCount }})</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}>(), {
  size: 'sm',
});

const fullStars = computed(() => Math.floor(props.rating));
const hasHalf = computed(() => props.rating % 1 >= 0.5);
const emptyStars = computed(() => 5 - fullStars.value - (hasHalf.value ? 1 : 0));
const starSize = computed(() => props.size === 'md' ? 'h-5 w-5' : 'h-4 w-4');
const starId = `half-star-${Math.random().toString(36).slice(2, 8)}`;
</script>
