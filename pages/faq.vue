<template>
  <div>
    <HeroAlt title="Frequently Asked Questions" subtitle="Find answers to common questions" />

    <section class="section">
      <div class="container-custom max-w-3xl">
        <div v-for="group in faqData.groups" :key="group.title" class="mb-10">
          <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4">{{ group.title }}</h2>
          <div class="space-y-2">
            <div
              v-for="(item, itemIndex) in group.items"
              :key="itemIndex"
              class="rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden"
            >
              <button
                type="button"
                class="w-full flex items-center justify-between p-4 text-start font-medium text-surface-900 dark:text-white hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                @click="toggleFaq(group.title, itemIndex)"
              >
                <span>{{ item.question }}</span>
                <svg
                  class="h-5 w-5 text-surface-400 transition-transform flex-shrink-0 ms-4"
                  :class="{ 'rotate-180': isOpen(group.title, itemIndex) }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div
                v-show="isOpen(group.title, itemIndex)"
                class="px-4 pb-4"
              >
                <p class="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-12 p-8 rounded-2xl bg-surface-50 dark:bg-surface-800">
          <h3 class="text-xl font-heading font-bold text-surface-900 dark:text-white mb-2">Still have questions?</h3>
          <p class="text-surface-600 dark:text-surface-400 mb-4">Our team is here to help.</p>
          <NuxtLink to="/contact" class="btn-primary">Contact Us</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import faqData from '~/app/data/faq.json';

useBazaarSEO({
  title: 'FAQ',
  description: 'Frequently asked questions about Bazaar Studio.',
});

const openItem = ref<string | null>(null);

function getKey(groupTitle: string, index: number): string {
  return `${groupTitle}-${index}`;
}

function isOpen(groupTitle: string, index: number): boolean {
  return openItem.value === getKey(groupTitle, index);
}

function toggleFaq(groupTitle: string, index: number) {
  const key = getKey(groupTitle, index);
  openItem.value = openItem.value === key ? null : key;
}
</script>
