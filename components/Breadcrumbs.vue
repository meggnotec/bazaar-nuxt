<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm text-surface-500 dark:text-surface-400">
      <li>
        <NuxtLink to="/" class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Home</NuxtLink>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <svg class="h-4 w-4 text-surface-400 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <NuxtLink
          v-if="item.href && index < items.length - 1"
          :to="item.href"
          class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="text-surface-900 dark:text-surface-100 font-medium">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/types';

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>
