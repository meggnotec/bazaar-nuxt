<template>
  <nav v-if="totalPages > 1" aria-label="Pagination" class="flex items-center justify-center gap-2 mt-12">
    <NuxtLink
      v-if="currentPage > 1"
      :to="pageUrl(currentPage - 1)"
      class="rounded-lg border border-surface-300 dark:border-surface-600 px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-500 transition-colors"
    >
      &larr; Previous
    </NuxtLink>

    <NuxtLink
      v-for="page in pages"
      :key="page"
      :to="pageUrl(page)"
      class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      :class="page === currentPage
        ? 'bg-primary-600 text-white shadow-md'
        : 'border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-500'"
      :aria-current="page === currentPage ? 'page' : undefined"
    >
      {{ page }}
    </NuxtLink>

    <NuxtLink
      v-if="currentPage < totalPages"
      :to="pageUrl(currentPage + 1)"
      class="rounded-lg border border-surface-300 dark:border-surface-600 px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-500 transition-colors"
    >
      Next &rarr;
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
  basePath: string;
}>();

const pages = computed(() => {
  const result: number[] = [];
  for (let i = 1; i <= props.totalPages; i++) {
    result.push(i);
  }
  return result;
});

function pageUrl(page: number): string {
  return page === 1 ? props.basePath : `${props.basePath}?page=${page}`;
}
</script>
