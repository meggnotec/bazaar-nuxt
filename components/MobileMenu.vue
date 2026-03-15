<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <div
      v-show="isOpen"
      class="fixed inset-0 bg-black/50 z-50 lg:hidden"
      @click="close"
    ></div>

    <!-- Slide-in panel -->
    <div
      :class="[
        'fixed top-0 end-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-surface-900 z-50 transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div class="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
        <template v-if="siteConfig.logo?.type === 'image'">
          <img
            :src="siteConfig.logo.image"
            :alt="siteConfig.name"
            :width="siteConfig.logo.width || 160"
            :height="siteConfig.logo.height || 40"
            class="h-9 w-auto dark:hidden"
          />
          <img
            :src="siteConfig.logo.imageDark || siteConfig.logo.image"
            :alt="siteConfig.name"
            :width="siteConfig.logo.width || 160"
            :height="siteConfig.logo.height || 40"
            class="h-9 w-auto hidden dark:block"
          />
        </template>
        <template v-else>
          <span class="text-xl font-heading font-bold gradient-text">{{ siteConfig.logo?.text || siteConfig.name }}</span>
        </template>
        <button
          type="button"
          class="rounded-full p-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
          aria-label="Close menu"
          @click="close"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="p-4" aria-label="Mobile navigation">
        <div v-for="item in navigation.mainNav" :key="item.label" class="border-b border-surface-100 dark:border-surface-800">
          <!-- Accordion item (has subcategories) -->
          <template v-if="item.subcategories && item.subcategories.length > 0">
            <div>
              <button
                type="button"
                class="flex items-center justify-between w-full py-3 text-start text-surface-900 dark:text-surface-100 font-medium"
                @click="toggleAccordion(item.label)"
              >
                <span class="flex items-center gap-2">
                  {{ item.label }}
                  <span v-if="item.badge" class="badge-sale text-[10px]">Sale</span>
                </span>
                <svg
                  :class="['h-4 w-4 transition-transform', { 'rotate-180': openAccordion === item.label }]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div v-show="openAccordion === item.label" class="pb-2">
                <NuxtLink
                  :to="item.href"
                  class="block py-2 ps-4 text-sm text-surface-600 dark:text-surface-400 hover:text-primary-500"
                  @click="close"
                >
                  All {{ item.label }}
                </NuxtLink>
                <NuxtLink
                  v-for="sub in item.subcategories"
                  :key="sub.href"
                  :to="sub.href"
                  class="block py-2 ps-4 text-sm text-surface-600 dark:text-surface-400 hover:text-primary-500"
                  @click="close"
                >
                  {{ sub.label }}
                </NuxtLink>
              </div>
            </div>
          </template>
          <!-- Simple link (no subcategories) -->
          <template v-else>
            <NuxtLink
              :to="item.href"
              :class="[
                'flex items-center gap-2 py-3 font-medium',
                item.badge ? 'text-primary-600 dark:text-primary-400' : 'text-surface-900 dark:text-surface-100',
              ]"
              @click="close"
            >
              {{ item.label }}
              <span v-if="item.badge" class="badge-sale text-[10px]">Sale</span>
            </NuxtLink>
          </template>
        </div>
      </nav>

      <div class="p-4 border-t border-surface-200 dark:border-surface-700 space-y-3">
        <NuxtLink to="/account" class="flex items-center gap-3 py-2 text-surface-700 dark:text-surface-300 hover:text-primary-500" @click="close">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span data-i18n="nav.account">Account</span>
        </NuxtLink>
        <NuxtLink to="/wishlist" class="flex items-center gap-3 py-2 text-surface-700 dark:text-surface-300 hover:text-primary-500" @click="close">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span data-i18n="nav.wishlist">Wishlist</span>
        </NuxtLink>

        <!-- Language selector -->
        <div class="pt-3 border-t border-surface-200 dark:border-surface-700">
          <p class="text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-2">Language</p>
          <div class="flex gap-2">
            <button
              v-for="lang in languages"
              :key="lang.locale"
              type="button"
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer',
                currentLocale === lang.locale
                  ? 'border-primary-500 text-primary-500 bg-primary-50 dark:bg-primary-950'
                  : 'border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:border-primary-500 hover:text-primary-500',
              ]"
              @click="setLanguage(lang.locale)"
            >
              {{ lang.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import siteConfig from '~/app/data/site-config.json';
import navigation from '~/app/data/navigation.json';
import type { Locale } from '~/types';

const isOpen = ref(false);
const openAccordion = ref<string | null>(null);
const currentLocale = ref<Locale>('en');

const languages = [
  { locale: 'en' as Locale, label: 'EN' },
  { locale: 'ar' as Locale, label: '\u0639\u0631' },
  { locale: 'fr' as Locale, label: 'FR' },
];

function open() {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function close() {
  isOpen.value = false;
  document.body.style.overflow = '';
}

function toggleAccordion(label: string) {
  openAccordion.value = openAccordion.value === label ? null : label;
}

function setLanguage(locale: Locale) {
  currentLocale.value = locale;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('bazaar-locale', locale);
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('dir', dir);

  // Update data-i18n elements
  const dataEl = document.getElementById('i18n-data');
  if (dataEl) {
    try {
      const translations = JSON.parse(dataEl.textContent || '{}');
      const dict = translations[locale] || translations['en'];
      if (dict) {
        document.querySelectorAll('[data-i18n]').forEach((node) => {
          const key = (node as HTMLElement).dataset.i18n || '';
          if (dict[key]) node.textContent = dict[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
          const key = (node as HTMLElement).dataset.i18nPlaceholder || '';
          if (dict[key]) (node as HTMLInputElement).placeholder = dict[key];
        });
      }
    } catch {
      // ignore parse errors
    }
  }

  document.dispatchEvent(new CustomEvent('bazaar:locale-changed', { detail: { locale, dir } }));
  close();
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    close();
  }
}

onMounted(() => {
  currentLocale.value = (localStorage.getItem('bazaar-locale') as Locale) || 'en';
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('bazaar:open-mobile-menu', open);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('bazaar:open-mobile-menu', open);
});
</script>
