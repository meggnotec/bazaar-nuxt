<template>
  <section class="relative bg-surface-50 dark:bg-surface-900 py-16 md:py-20 overflow-hidden">
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
    </div>
    <div class="container-custom relative text-center">
      <span v-if="badge" class="badge-primary mb-4 inline-block">{{ badge }}</span>
      <h1 class="text-4xl md:text-5xl font-heading font-bold text-surface-900 dark:text-white mb-4">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  badge?: string;
}>();
</script>
