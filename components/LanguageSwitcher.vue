<template>
  <div ref="switcherRef" class="relative">
    <button
      type="button"
      class="p-2 rounded-lg text-surface-600 dark:text-surface-300 hover:text-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
      aria-label="Change language"
      title="Language"
      @click.stop="isOpen = !isOpen"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    </button>
    <div
      v-show="isOpen"
      class="absolute top-full end-0 mt-2 w-40 bg-white dark:bg-surface-800 rounded-xl shadow-xl border border-surface-200 dark:border-surface-700 overflow-hidden z-50"
    >
      <button
        v-for="locale in locales"
        :key="locale.code"
        type="button"
        class="w-full px-4 py-2.5 text-start text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors flex items-center justify-between cursor-pointer"
        @click="selectLocale(locale.code)"
      >
        <span>{{ locale.label }}</span>
        <span
          v-show="currentLocale === locale.code"
          class="text-primary-500 text-xs font-bold"
        >&#10003;</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const locales = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' },
  { code: 'fr', label: 'Fran\u00E7ais' },
] as const;

const isOpen = ref(false);
const currentLocale = ref('en');
const switcherRef = ref<HTMLElement | null>(null);

let translationsCache: Record<string, Record<string, string>> | null = null;

function getTranslation(locale: string, key: string): string {
  if (!translationsCache) {
    try {
      const el = document.getElementById('i18n-data');
      if (el) {
        translationsCache = JSON.parse(el.textContent || '{}');
      }
    } catch {
      return key;
    }
  }
  return translationsCache?.[locale]?.[key] || translationsCache?.['en']?.[key] || key;
}

function selectLocale(locale: string) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  localStorage.setItem('bazaar-locale', locale);
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('dir', dir);
  currentLocale.value = locale;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = (node as HTMLElement).dataset.i18n || '';
    const translated = getTranslation(locale, key);
    if (translated && translated !== key) {
      node.textContent = translated;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = (node as HTMLElement).dataset.i18nPlaceholder || '';
    const translated = getTranslation(locale, key);
    if (translated && translated !== key) {
      (node as HTMLInputElement).placeholder = translated;
    }
  });

  isOpen.value = false;

  document.dispatchEvent(new CustomEvent('bazaar:locale-changed', { detail: { locale, dir } }));
}

function handleOutsideClick(e: MouseEvent) {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  currentLocale.value = localStorage.getItem('bazaar-locale') || 'en';
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>
