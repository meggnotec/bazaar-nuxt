<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-surface-950">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <AnnouncementBar />
    <Header />
    <main id="main-content" class="flex-1">
      <section class="section">
        <div class="container-custom text-center py-16">
          <h1 class="text-8xl md:text-9xl font-heading font-bold gradient-text mb-4">{{ error?.statusCode || 404 }}</h1>
          <h2 class="text-2xl md:text-3xl font-heading font-bold text-surface-900 dark:text-white mb-4">
            {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
          </h2>
          <p class="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
            {{ error?.statusCode === 404
              ? "Sorry, we couldn't find the page you're looking for. It might have been moved or no longer exists."
              : error?.message || 'An unexpected error occurred. Please try again later.'
            }}
          </p>

          <!-- Popular categories -->
          <div class="mb-8">
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-4">Popular Categories</p>
            <div class="flex flex-wrap justify-center gap-2">
              <NuxtLink
                v-for="cat in popularCategories"
                :key="cat.slug"
                :to="`/categories/${cat.slug}`"
                class="rounded-full border border-surface-300 dark:border-surface-600 px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-500 transition-colors"
              >
                {{ cat.name }}
              </NuxtLink>
            </div>
          </div>

          <button class="btn-primary" @click="handleClearError">Back to Home</button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import categories from '~/app/data/categories.json';

const props = defineProps<{
  error: {
    statusCode: number;
    message: string;
  };
}>();

useSeoMeta({
  title: `${props.error?.statusCode || 404} - Page Not Found | Bazaar Studio`,
  description: "The page you're looking for doesn't exist.",
});

const popularCategories = categories.slice(0, 5);

function handleClearError() {
  clearError({ redirect: '/' });
}
</script>
