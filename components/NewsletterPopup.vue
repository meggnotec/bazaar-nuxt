<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        :class="isAnimating ? 'opacity-100' : 'opacity-0'"
        @click="dismiss"
      ></div>

      <!-- Modal -->
      <div
        class="relative w-full max-w-md rounded-2xl bg-white dark:bg-surface-800 shadow-2xl overflow-hidden transition-all duration-300"
        :class="isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
      >
        <!-- Gradient header -->
        <div class="gradient-hero px-6 py-8 text-center text-white">
          <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 class="font-heading font-bold text-2xl mb-1">Get 15% Off</h2>
          <p class="text-white/80 text-sm">Subscribe to our newsletter for exclusive deals and style updates.</p>
        </div>

        <!-- Close button -->
        <button
          type="button"
          class="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close newsletter popup"
          @click="dismiss"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Form -->
        <div class="p-6">
          <form v-if="!submitted" class="space-y-3" @submit.prevent="handleSubmit">
            <input
              v-model="popupEmail"
              type="email"
              placeholder="Enter your email address"
              required
              class="w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-3 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
            />
            <button
              type="submit"
              class="w-full btn-primary py-3 text-sm"
            >
              Subscribe & Get 15% Off
            </button>
          </form>
          <p v-if="submitted" class="text-center text-emerald-600 dark:text-emerald-400 font-medium py-2">
            Thanks for subscribing! Check your inbox for your 15% off code.
          </p>
          <p class="text-xs text-center text-surface-400 dark:text-surface-500 mt-3">
            No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy.
          </p>
          <button
            type="button"
            class="block mx-auto mt-3 text-xs text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors cursor-pointer"
            @click="dismiss"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const isVisible = ref(false);
const isAnimating = ref(false);
const popupEmail = ref('');
const submitted = ref(false);

let timer: ReturnType<typeof setTimeout> | null = null;

function show() {
  isVisible.value = true;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isAnimating.value = true;
    });
  });
}

function dismiss() {
  isAnimating.value = false;
  setTimeout(() => {
    isVisible.value = false;
  }, 300);
  localStorage.setItem('bazaar-newsletter-dismissed', 'true');
}

function handleSubmit() {
  if (popupEmail.value.trim()) {
    submitted.value = true;
    setTimeout(dismiss, 3000);
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isVisible.value) {
    dismiss();
  }
}

function handleOpenNewsletter() {
  localStorage.removeItem('bazaar-newsletter-dismissed');
  show();
}

onMounted(() => {
  if (!localStorage.getItem('bazaar-newsletter-dismissed')) {
    timer = setTimeout(show, 5000);
  }

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('bazaar:open-newsletter', handleOpenNewsletter);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('bazaar:open-newsletter', handleOpenNewsletter);
});
</script>
