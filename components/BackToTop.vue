<template>
  <button
    type="button"
    class="fixed bottom-6 end-6 z-40 w-11 h-11 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/25 flex items-center justify-center transition-all duration-300 hover:bg-primary-600 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer"
    :class="isVisible
      ? 'opacity-100 translate-y-0 pointer-events-auto'
      : 'opacity-0 translate-y-4 pointer-events-none'"
    aria-label="Back to top"
    @click="scrollToTop"
  >
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  </button>
</template>

<script setup lang="ts">
const isVisible = ref(false);

function handleScroll() {
  isVisible.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
