<template>
  <div v-if="post">
    <article>
      <!-- Hero image -->
      <div v-if="post.image && !post.image.includes('placeholder.svg')" class="w-full h-64 md:h-96 overflow-hidden">
        <img
          :src="post.image"
          :alt="post.title"
          width="1200"
          height="675"
          class="w-full h-full object-cover"
        />
      </div>
      <div v-else class="w-full h-64 md:h-96 bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
        <div class="text-surface-400 dark:text-surface-600 text-lg font-heading">Featured Image</div>
      </div>

      <div class="container-custom py-8 md:py-12">
        <div class="max-w-3xl mx-auto">
          <Breadcrumbs :items="breadcrumbs" />

          <!-- Article header -->
          <header class="mb-8">
            <span class="badge-primary mb-3 inline-block">{{ post.category }}</span>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-surface-900 dark:text-white mb-4">{{ post.title }}</h1>
            <div class="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
              <span>{{ post.author }}</span>
              <span>&middot;</span>
              <time :datetime="post.pubDate">{{ formattedDate }}</time>
            </div>
          </header>

          <!-- Article content -->
          <div class="prose prose-lg dark:prose-invert prose-headings:font-heading prose-a:text-primary-500 hover:prose-a:text-primary-600">
            <ContentRenderer :value="post" />
          </div>

          <!-- Tags -->
          <div v-if="post.tags && post.tags.length > 0" class="mt-8 pt-8 border-t border-surface-200 dark:border-surface-700">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="rounded-full bg-surface-100 dark:bg-surface-800 px-3 py-1 text-xs font-medium text-surface-600 dark:text-surface-400"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Share buttons -->
          <div class="mt-6">
            <ShareButtons :url="`https://bazaar-studio.com/blog/${slug}`" :title="post.title" />
          </div>

          <!-- Author card -->
          <div class="mt-8 p-6 rounded-2xl bg-surface-50 dark:bg-surface-800 flex items-center gap-4">
            <div class="w-14 h-14 rounded-full gradient-hero flex items-center justify-center text-white font-heading font-bold text-lg">
              {{ authorInitials }}
            </div>
            <div>
              <p class="font-heading font-semibold text-surface-900 dark:text-white">{{ post.author }}</p>
              <p class="text-sm text-surface-500 dark:text-surface-400">Fashion editor and trend forecaster at Bazaar Studio.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Related posts -->
      <section v-if="relatedPosts && relatedPosts.length > 0" class="section bg-surface-50 dark:bg-surface-900">
        <div class="container-custom">
          <h2 class="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-8 text-center">Related Articles</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <BlogCard
              v-for="related in relatedPosts.slice(0, 3)"
              :key="related.path"
              :title="related.title"
              :description="related.description"
              :pub-date="related.pubDate"
              :category="related.category"
              :slug="related.path?.replace('/blog/', '') ?? related.stem"
              :image="related.image"
            />
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '~/types';

const route = useRoute();
const slug = computed(() => {
  const params = route.params.slug;
  return Array.isArray(params) ? params.join('/') : params;
});

const { data: post } = await useAsyncData(`blog-${slug.value}`, () =>
  queryCollection('blog').path(`/blog/${slug.value}`).first()
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' });
}

useBazaarSEO({
  title: post.value.title,
  description: post.value.description,
  image: post.value.image,
  type: 'article',
});

const formattedDate = computed(() => {
  if (!post.value?.pubDate) return '';
  return new Date(post.value.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const authorInitials = computed(() => {
  if (!post.value?.author) return '';
  return post.value.author
    .split(' ')
    .map((n: string) => n[0])
    .join('');
});

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Blog', href: '/blog' },
  { label: post.value?.title ?? '' },
]);

const { data: relatedPosts } = await useAsyncData(`related-${slug.value}`, () =>
  queryCollection('blog')
    .where('category', '=', post.value!.category)
    .where('path', '<>', post.value!.path)
    .limit(3)
    .all()
);
</script>
