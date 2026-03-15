<template>
  <aside class="blog-sidebar space-y-8">
    <!-- Categories -->
    <div class="rounded-2xl bg-surface-50 dark:bg-surface-800 p-5">
      <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-4" data-i18n="blog.categories">Categories</h3>
      <div class="space-y-2">
        <div v-for="[cat, count] in categories" :key="cat" class="flex items-center justify-between">
          <span class="text-sm text-surface-700 dark:text-surface-300">{{ cat }}</span>
          <span class="text-xs font-medium text-surface-400 dark:text-surface-500 bg-surface-200 dark:bg-surface-700 rounded-full px-2 py-0.5">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Posts -->
    <div class="rounded-2xl bg-surface-50 dark:bg-surface-800 p-5">
      <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-4" data-i18n="blog.recentPosts">Recent Posts</h3>
      <div class="space-y-4">
        <NuxtLink
          v-for="post in recentPosts"
          :key="post.id"
          :to="`/blog/${post.id}`"
          class="flex items-start gap-3 group"
        >
          <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-200 dark:bg-surface-700">
            <img
              v-if="post.data.image && !post.data.image.includes('placeholder.svg')"
              :src="post.data.image"
              :alt="post.data.title"
              width="64"
              height="64"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-surface-400 dark:text-surface-600 text-xs">img</div>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-medium text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2">{{ post.data.title }}</h4>
            <time class="text-xs text-surface-400 dark:text-surface-500" :datetime="post.data.pubDate">
              {{ formatDate(post.data.pubDate) }}
            </time>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Tags Cloud -->
    <div v-if="tags.length > 0" class="rounded-2xl bg-surface-50 dark:bg-surface-800 p-5">
      <h3 class="font-heading font-bold text-surface-900 dark:text-white mb-4" data-i18n="blog.tags">Tags</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="[tag] in tags"
          :key="tag"
          class="rounded-full bg-surface-200 dark:bg-surface-700 px-3 py-1 text-xs font-medium text-surface-600 dark:text-surface-400 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 transition-colors cursor-default"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface BlogPost {
  id: string;
  data: {
    title: string;
    category: string;
    pubDate: string;
    tags?: string[];
    image?: string;
  };
}

const props = defineProps<{
  posts: BlogPost[];
}>();

// Categories with counts
const categories = computed(() => {
  const categoryMap = new Map<string, number>();
  props.posts.forEach((p) => {
    const cat = p.data.category;
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });
  return Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);
});

// Recent posts (first 3)
const recentPosts = computed(() => props.posts.slice(0, 3));

// Tags cloud
const tags = computed(() => {
  const tagMap = new Map<string, number>();
  props.posts.forEach((p) => {
    p.data.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);
});

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
</script>
