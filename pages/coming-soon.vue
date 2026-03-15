<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-surface-950 relative overflow-hidden">
    <!-- Background gradient blobs -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

    <div class="relative z-10 text-center px-6 max-w-2xl mx-auto">
      <!-- Logo -->
      <NuxtLink to="/" class="inline-block mb-8">
        <span class="font-heading font-bold text-2xl text-surface-900 dark:text-white">
          {{ siteConfig.name }}
        </span>
      </NuxtLink>

      <!-- Heading -->
      <h1 class="font-heading font-bold text-5xl md:text-7xl mb-4">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500">
          Coming Soon
        </span>
      </h1>

      <p class="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-10 max-w-md mx-auto">
        We're crafting something extraordinary. Be the first to experience our new collection.
      </p>

      <!-- Countdown -->
      <div class="flex items-center justify-center gap-4 md:gap-6 mb-10">
        <div class="text-center">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-1">
            <span class="font-heading font-bold text-2xl md:text-3xl text-surface-900 dark:text-white">{{ pad(countdown.days) }}</span>
          </div>
          <span class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-wider">Days</span>
        </div>
        <span class="text-2xl font-bold text-surface-300 dark:text-surface-600 mt-[-1rem]">:</span>
        <div class="text-center">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-1">
            <span class="font-heading font-bold text-2xl md:text-3xl text-surface-900 dark:text-white">{{ pad(countdown.hours) }}</span>
          </div>
          <span class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-wider">Hours</span>
        </div>
        <span class="text-2xl font-bold text-surface-300 dark:text-surface-600 mt-[-1rem]">:</span>
        <div class="text-center">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-1">
            <span class="font-heading font-bold text-2xl md:text-3xl text-surface-900 dark:text-white">{{ pad(countdown.minutes) }}</span>
          </div>
          <span class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-wider">Min</span>
        </div>
        <span class="text-2xl font-bold text-surface-300 dark:text-surface-600 mt-[-1rem]">:</span>
        <div class="text-center">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-1">
            <span class="font-heading font-bold text-2xl md:text-3xl text-primary-500">{{ pad(countdown.seconds) }}</span>
          </div>
          <span class="text-xs text-surface-500 dark:text-surface-400 uppercase tracking-wider">Sec</span>
        </div>
      </div>

      <!-- Email signup -->
      <form v-if="!submitted" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10" @submit.prevent="handleSubmit">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email address"
          required
          class="flex-1 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 px-4 py-3 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
        />
        <button type="submit" class="btn-primary py-3 px-6 text-sm whitespace-nowrap">
          Notify Me
        </button>
      </form>
      <div v-else class="max-w-md mx-auto mb-10">
        <p class="text-emerald-600 dark:text-emerald-400 font-medium py-3 text-center w-full">Thanks! We'll notify you when we launch.</p>
      </div>

      <!-- Social links -->
      <div class="flex items-center justify-center gap-4">
        <a
          v-for="(url, platform) in siteConfig.social"
          :key="platform"
          :href="url as string"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 flex items-center justify-center transition-colors"
          :aria-label="`Follow on ${platform}`"
        >
          <!-- Twitter / X -->
          <svg v-if="platform === 'twitter'" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <!-- Instagram -->
          <svg v-else-if="platform === 'instagram'" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          <!-- Facebook -->
          <svg v-else-if="platform === 'facebook'" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <!-- Pinterest -->
          <svg v-else-if="platform === 'pinterest'" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.042-3.441.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteConfig from '~/app/data/site-config.json';

definePageMeta({ layout: 'standalone' });

useBazaarSEO({
  title: 'Coming Soon',
  description: `${siteConfig.name} is launching soon. Sign up to be the first to know.`,
  noindex: true,
});

const email = ref('');
const submitted = ref(false);

function handleSubmit() {
  if (email.value) {
    submitted.value = true;
  }
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

const countdown = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let intervalId: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  const target = new Date();
  target.setDate(target.getDate() + 30);

  function update() {
    const now = Date.now();
    const diff = target.getTime() - now;
    if (diff <= 0) return;

    countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdown.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    countdown.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    countdown.seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }

  update();
  intervalId = setInterval(update, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
