<template>
  <template v-if="category">
    <HeroAlt :title="category.name" :subtitle="category.description" />

    <section class="section">
      <div class="container-custom">
        <Breadcrumbs :items="[
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]" />

        <div class="flex items-center justify-between mb-6 mt-4">
          <p class="text-sm text-surface-600 dark:text-surface-400">
            {{ categoryProducts.length }} product{{ categoryProducts.length !== 1 ? 's' : '' }}
          </p>
          <SortDropdown />
        </div>

        <div
          v-if="categoryProducts.length > 0"
          id="product-grid"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ProductCard v-for="product in categoryProducts" :key="product.id" :product="product" />
        </div>

        <div v-else class="text-center py-16">
          <p class="text-surface-500 dark:text-surface-400 text-lg">No products found in this category.</p>
          <NuxtLink to="/shop" class="btn-primary mt-4 inline-block">Browse All Products</NuxtLink>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
import type { Product, Category } from '~/types';
import categories from '~/app/data/categories.json';
import products from '~/app/data/products.json';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const typedCategories = categories as Category[];
const typedProducts = products as Product[];

const category = computed(() =>
  typedCategories.find((c) => c.slug === slug.value)
);

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' });
}

const categoryProducts = computed(() => {
  if (!category.value) return [];
  if (category.value.slug === 'sale') {
    return typedProducts.filter((p) => p.isSale);
  }
  return typedProducts.filter((p) => p.category === category.value!.slug);
});

useBazaarSEO({
  title: category.value.name,
  description: category.value.description,
});
</script>
