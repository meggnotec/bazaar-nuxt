<template>
  <HeroAlt title="Shop by Category" subtitle="Find exactly what you're looking for" />

  <section class="section">
    <div class="container-custom">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import categories from '~/app/data/categories.json';

useBazaarSEO({
  title: 'Shop by Category',
  description: 'Explore our curated fashion categories.',
});
</script>
