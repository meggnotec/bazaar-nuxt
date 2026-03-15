<template>
  <section class="py-12 border-t border-surface-200 dark:border-surface-700" id="reviews">
    <div class="container-custom">
      <h2 class="font-heading font-bold text-2xl text-surface-900 dark:text-white mb-8">Customer Reviews</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 text-center">
            <div class="text-5xl font-heading font-bold text-surface-900 dark:text-white mb-1">{{ rating.toFixed(1) }}</div>
            <div class="mb-2">
              <StarRating :rating="rating" :review-count="0" size="md" />
            </div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-6">Based on {{ reviewCount }} reviews</p>

            <!-- Distribution bars -->
            <div class="space-y-2">
              <div v-for="d in distribution" :key="d.star" class="flex items-center gap-2 text-sm">
                <span class="w-8 text-end text-surface-600 dark:text-surface-400">{{ d.star }}&#x2605;</span>
                <div class="flex-1 h-2 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
                  <div
                    class="h-full rounded-full bg-accent-400"
                    :style="{ width: `${d.pct}%` }"
                  />
                </div>
                <span class="w-8 text-surface-400 dark:text-surface-500 text-xs">{{ d.pct }}%</span>
              </div>
            </div>

            <button
              type="button"
              class="mt-6 w-full btn-primary py-2.5 text-sm cursor-pointer"
              @click="showWriteForm = true"
            >
              Write a Review
            </button>
          </div>
        </div>

        <!-- Reviews list + Write form -->
        <div class="lg:col-span-2">
          <!-- Write review form -->
          <div v-if="showWriteForm" class="mb-8 p-6 rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
            <h3 class="font-heading font-semibold text-lg text-surface-900 dark:text-white mb-4">Write a Review</h3>
            <div v-if="!submitSuccess">
              <form class="space-y-4" @submit.prevent="submitReview">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    v-model="reviewForm.name"
                    type="text"
                    placeholder="Your name"
                    required
                    class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  />
                  <input
                    v-model="reviewForm.email"
                    type="email"
                    placeholder="Your email"
                    required
                    class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  />
                </div>
                <!-- Star rating picker -->
                <div>
                  <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Rating</label>
                  <div class="flex items-center gap-1">
                    <button
                      v-for="s in 5"
                      :key="s"
                      type="button"
                      class="cursor-pointer transition-colors"
                      :class="s <= pickedRating ? 'text-accent-400' : 'text-surface-300 dark:text-surface-600 hover:text-accent-400'"
                      :aria-label="`${s} star${s > 1 ? 's' : ''}`"
                      @click="pickedRating = s"
                    >
                      <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </button>
                  </div>
                </div>
                <input
                  v-model="reviewForm.title"
                  type="text"
                  placeholder="Review title"
                  required
                  class="w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                />
                <textarea
                  v-model="reviewForm.body"
                  placeholder="Share your experience with this product..."
                  required
                  rows="4"
                  class="w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-2.5 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
                />
                <div class="flex items-center gap-3">
                  <button type="submit" class="btn-primary py-2.5 px-6 text-sm">Submit Review</button>
                  <button type="button" class="text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 cursor-pointer" @click="showWriteForm = false">Cancel</button>
                </div>
              </form>
            </div>
            <div v-else class="py-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">
              Thank you for your review! It has been submitted successfully.
            </div>
          </div>

          <!-- Sort dropdown -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-surface-500 dark:text-surface-400">
              Showing {{ visibleReviews.length }} of {{ reviews.length }} reviews
            </p>
            <select
              v-model="sortMode"
              class="rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300 focus:border-primary-500 outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>

          <!-- Reviews list -->
          <div class="space-y-6">
            <div
              v-for="review in visibleReviews"
              :key="`${review.author}-${review.date}`"
              class="p-5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800/50"
            >
              <div class="flex items-start justify-between mb-2">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-surface-900 dark:text-white text-sm">{{ review.author }}</span>
                    <span v-if="review.verified" class="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-full px-2 py-0.5">
                      <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
                      Verified
                    </span>
                  </div>
                  <div class="flex items-center gap-0.5">
                    <svg
                      v-for="s in 5"
                      :key="s"
                      :class="['h-3.5 w-3.5', s <= review.rating ? 'text-accent-400' : 'text-surface-200 dark:text-surface-700']"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
                <time class="text-xs text-surface-400 dark:text-surface-500">{{ formatDate(review.date) }}</time>
              </div>
              <h4 class="font-medium text-surface-900 dark:text-white text-sm mb-1">{{ review.title }}</h4>
              <p class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-3">{{ review.body }}</p>
              <button type="button" class="inline-flex items-center gap-1.5 text-xs text-surface-400 dark:text-surface-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/></svg>
                Helpful ({{ review.helpful }})
              </button>
            </div>
          </div>

          <!-- Load More button -->
          <button
            v-if="visibleCount < sortedReviews.length"
            type="button"
            class="mt-6 w-full py-3 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors cursor-pointer"
            @click="visibleCount += 3"
          >
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Review } from '~/types';

const props = defineProps<{
  productId: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}>();

const sortMode = ref('recent');
const visibleCount = ref(3);
const showWriteForm = ref(false);
const submitSuccess = ref(false);
const pickedRating = ref(0);

const reviewForm = reactive({
  name: '',
  email: '',
  title: '',
  body: '',
});

const distribution = computed(() => {
  return [5, 4, 3, 2, 1].map((star) => {
    const count = props.reviews.filter((r) => r.rating === star).length;
    const pct = props.reviews.length > 0 ? Math.round((count / props.reviews.length) * 100) : 0;
    return { star, count, pct };
  });
});

const sortedReviews = computed(() => {
  const sorted = [...props.reviews];
  if (sortMode.value === 'highest') sorted.sort((a, b) => b.rating - a.rating);
  else if (sortMode.value === 'helpful') sorted.sort((a, b) => b.helpful - a.helpful);
  else sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sorted;
});

const visibleReviews = computed(() => sortedReviews.value.slice(0, visibleCount.value));

watch(sortMode, () => {
  visibleCount.value = 3;
});

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function submitReview() {
  if (pickedRating.value === 0) return;
  submitSuccess.value = true;
  setTimeout(() => {
    showWriteForm.value = false;
    submitSuccess.value = false;
    pickedRating.value = 0;
    reviewForm.name = '';
    reviewForm.email = '';
    reviewForm.title = '';
    reviewForm.body = '';
  }, 3000);
}
</script>
