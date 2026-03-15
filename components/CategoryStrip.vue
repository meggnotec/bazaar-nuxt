<template>
  <section class="py-8 border-b border-surface-100 dark:border-surface-800">
    <div class="container-custom">
      <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/categories/${cat.slug}`"
          class="flex-shrink-0 px-6 py-2.5 rounded-full border border-surface-200 dark:border-surface-700 text-sm font-medium text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all"
        >
          {{ cat.name }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Category } from '~/types';
import categoriesData from '~/app/data/categories.json';

const categories = categoriesData as Category[];
</script>
