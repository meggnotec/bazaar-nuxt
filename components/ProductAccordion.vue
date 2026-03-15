<template>
  <div class="divide-y divide-surface-200 dark:divide-surface-700 border-y border-surface-200 dark:border-surface-700">
    <div v-for="(item, index) in items" :key="index">
      <button
        type="button"
        class="w-full flex items-center justify-between py-4 text-start cursor-pointer group"
        :aria-expanded="openIndex === index"
        @click="toggle(index)"
      >
        <span
          class="font-heading font-semibold text-sm text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors"
          :data-i18n="item.i18nKey"
        >
          {{ item.title }}
        </span>
        <svg
          class="h-5 w-5 text-surface-400 dark:text-surface-500 transition-transform duration-200 shrink-0 ms-4"
          :class="openIndex === index && 'rotate-180'"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        ref="contentRefs"
        class="overflow-hidden transition-all duration-300"
        :style="{ maxHeight: openIndex === index ? contentHeights[index] + 'px' : '0px' }"
      >
        <div class="pb-4 text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AccordionItem {
  title: string;
  content: string;
  i18nKey?: string;
}

const props = defineProps<{
  items: AccordionItem[];
}>();

const openIndex = ref(0);
const contentRefs = ref<HTMLElement[]>([]);
const contentHeights = ref<number[]>([]);

function toggle(index: number) {
  if (openIndex.value === index) {
    openIndex.value = -1;
  } else {
    openIndex.value = index;
  }
}

function measureHeights() {
  contentHeights.value = (contentRefs.value || []).map((el: HTMLElement) => {
    if (el) return el.scrollHeight;
    return 0;
  });
}

onMounted(() => {
  nextTick(() => {
    measureHeights();
  });
});

watch(() => props.items, () => {
  nextTick(() => {
    measureHeights();
  });
});
</script>
