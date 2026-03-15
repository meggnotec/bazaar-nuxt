<template>
  <div class="min-h-screen flex flex-col pb-16 lg:pb-0">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <AnnouncementBar />
    <Header />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <Footer />
    <ClientOnly>
      <MobileMenu />
      <CartDrawer />
      <QuickView />
      <BackToTop />
      <NewsletterPopup />
      <MobileBottomNav />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import en from '~/app/data/translations/en.json';
import ar from '~/app/data/translations/ar.json';
import fr from '~/app/data/translations/fr.json';

const translations: Record<string, Record<string, string>> = { en, ar, fr };

function applyTranslations() {
  if (typeof localStorage === 'undefined') return;
  const locale = localStorage.getItem('bazaar-locale') || 'en';
  if (locale === 'en') return;

  const dict = translations[locale] || translations['en'];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = (node as HTMLElement).dataset.i18n || '';
    if (dict[key]) node.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = (node as HTMLElement).dataset.i18nPlaceholder || '';
    if (dict[key]) (node as HTMLInputElement).placeholder = dict[key];
  });
}

onMounted(() => {
  applyTranslations();
});

const route = useRoute();
watch(() => route.path, () => {
  nextTick(() => {
    applyTranslations();
  });
});

provide('i18n-translations', translations);
</script>
