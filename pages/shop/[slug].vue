<template>
  <template v-if="product">
    <div class="container-custom py-6">
      <Breadcrumbs :items="breadcrumbItems" />
    </div>

    <!-- Wide Layout -->
    <section v-if="isWideLayout" class="container-custom pb-16">
      <div class="max-w-4xl mx-auto mb-8">
        <ProductGallery
          :title="product.title"
          :image="product.image"
          :placeholder-color="product.placeholderColor"
          :colors="product.colors"
          :video="product.video"
        />
      </div>
      <div class="max-w-2xl mx-auto">
        <ProductInfo :product="product" />
      </div>
    </section>

    <!-- Default Layout -->
    <section v-else class="container-custom pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductGallery
          :title="product.title"
          :image="product.image"
          :placeholder-color="product.placeholderColor"
          :colors="product.colors"
          :video="product.video"
        />
        <ProductInfo :product="product" />
      </div>
    </section>

    <FrequentlyBoughtTogether
      v-if="companions.length > 0"
      :product="product"
      :companions="companions"
    />

    <RelatedProducts :products="relatedProducts" />

    <ProductReviews
      :product-id="product.id"
      :rating="product.rating"
      :review-count="product.reviewCount"
      :reviews="productReviews"
    />

    <StickyAddToCart :product="product" />
  </template>
</template>

<script setup lang="ts">
import type { Product, Review } from '~/types';
import products from '~/app/data/products.json';
import allReviews from '~/app/data/reviews.json';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const typedProducts = products as Product[];
const typedReviews = allReviews as Review[];

const product = computed(() =>
  typedProducts.find((p) => p.slug === slug.value)
);

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' });
}

const isWideLayout = computed(() => product.value?.layout === 'wide');

const breadcrumbItems = computed(() => {
  if (!product.value) return [];
  const catName = product.value.category.charAt(0).toUpperCase() + product.value.category.slice(1);
  return [
    { label: 'Shop', href: '/shop' },
    { label: catName, href: `/categories/${product.value.category}` },
    { label: product.value.title },
  ];
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return typedProducts
    .filter((p) => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 4);
});

const companions = computed(() => {
  if (!product.value) return [];
  const fbtIds = product.value.frequentlyBoughtWith || [];
  return fbtIds
    .map((id) => typedProducts.find((p) => p.id === Number(id)))
    .filter(Boolean) as Product[];
});

const productReviews = computed(() => {
  if (!product.value) return [];
  return typedReviews.filter((r) => r.productId === product.value!.id);
});

useBazaarSEO({
  title: product.value.title,
  description: product.value.shortDescription,
  image: product.value.image || '/og-image.svg',
  type: 'product',
});

// Track recently viewed
onMounted(() => {
  const key = 'bazaar-recently-viewed';
  const max = 6;
  try {
    const items: string[] = JSON.parse(localStorage.getItem(key) || '[]').filter(
      (s: string) => s !== slug.value
    );
    items.unshift(slug.value);
    localStorage.setItem(key, JSON.stringify(items.slice(0, max)));
  } catch { /* ignore */ }
});

// Re-track on client-side navigation
watch(slug, (newSlug) => {
  const key = 'bazaar-recently-viewed';
  const max = 6;
  try {
    const items: string[] = JSON.parse(localStorage.getItem(key) || '[]').filter(
      (s: string) => s !== newSlug
    );
    items.unshift(newSlug);
    localStorage.setItem(key, JSON.stringify(items.slice(0, max)));
  } catch { /* ignore */ }
});
</script>
