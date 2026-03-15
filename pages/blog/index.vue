<template>
  <div>
    <HeroAlt title="The Edit" subtitle="Style guides, trends, and stories from our studio" badge="Blog" />

    <section class="section">
      <div class="container-custom">
        <!-- Featured post -->
        <NuxtLink
          v-if="featuredPost"
          :to="`/blog/${featuredPost.path?.replace('/blog/', '') ?? featuredPost.stem}`"
          class="block mb-12 group"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div class="aspect-[16/10] rounded-2xl overflow-hidden">
              <img
                v-if="featuredPost.image && !featuredPost.image.includes('placeholder.svg')"
                :src="featuredPost.image"
                :alt="featuredPost.title"
                width="800"
                height="500"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="w-full h-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center"
              >
                <span class="text-surface-400 dark:text-surface-600 font-heading">Featured Image</span>
              </div>
            </div>
            <div>
              <span class="badge-primary mb-3 inline-block">{{ featuredPost.category }}</span>
              <h2 class="text-2xl md:text-3xl font-heading font-bold text-surface-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                {{ featuredPost.title }}
              </h2>
              <p class="text-surface-600 dark:text-surface-400 mb-4">{{ featuredPost.description }}</p>
              <div class="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400">
                <span>{{ featuredPost.author }}</span>
                <span>&middot;</span>
                <time :datetime="featuredPost.pubDate">
                  {{ formatDate(featuredPost.pubDate) }}
                </time>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Content + Sidebar -->
        <div class="lg:flex gap-8">
          <div class="flex-1 min-w-0">
            <!-- Post grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BlogCard
                v-for="post in remainingPosts"
                :key="post.path"
                :title="post.title"
                :description="post.description"
                :pub-date="post.pubDate"
                :category="post.category"
                :slug="post.path?.replace('/blog/', '') ?? post.stem"
                :image="post.image"
              />
            </div>
          </div>
          <div class="w-full lg:w-72 flex-shrink-0 mt-8 lg:mt-0">
            <BlogSidebar :posts="sidebarPosts" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'The Edit \u2014 Blog',
  description: 'Style guides, fashion tips, and behind-the-scenes stories from Bazaar Studio.',
});

const { data: allPosts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('pubDate', 'DESC').all()
);

const filteredPosts = computed(() => {
  if (!allPosts.value) return [];
  return allPosts.value.filter((p: any) => !p.draft);
});

const featuredPost = computed(() => filteredPosts.value[0] ?? null);
const remainingPosts = computed(() => filteredPosts.value.slice(1));

const sidebarPosts = computed(() => {
  return filteredPosts.value.map((p: any) => ({
    id: p.path?.replace('/blog/', '') ?? p.stem,
    data: {
      title: p.title,
      category: p.category,
      pubDate: p.pubDate,
      tags: p.tags,
      image: p.image,
    },
  }));
});

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
