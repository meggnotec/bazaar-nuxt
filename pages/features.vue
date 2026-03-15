<template>
  <div>
    <HeroAlt
      title="Theme Features"
      :subtitle="`${totalFeatures}+ features built for modern ecommerce`"
      badge="Everything Included"
    />

    <!-- Stats Bar -->
    <section class="border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-950">
      <div class="container-custom py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-3xl font-heading font-bold text-surface-900 dark:text-white">49</div>
            <div class="text-sm text-surface-500 dark:text-surface-400 mt-1">Components</div>
          </div>
          <div>
            <div class="text-3xl font-heading font-bold text-surface-900 dark:text-white">33</div>
            <div class="text-sm text-surface-500 dark:text-surface-400 mt-1">Page Templates</div>
          </div>
          <div>
            <div class="text-3xl font-heading font-bold text-surface-900 dark:text-white">3</div>
            <div class="text-sm text-surface-500 dark:text-surface-400 mt-1">Languages</div>
          </div>
          <div>
            <div class="text-3xl font-heading font-bold text-primary-500">{{ totalFeatures }}+</div>
            <div class="text-sm text-surface-500 dark:text-surface-400 mt-1">Features</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Navigation -->
    <nav
      id="features-nav"
      class="sticky top-16 z-30 bg-white/90 dark:bg-surface-950/90 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 transition-all"
    >
      <div class="container-custom">
        <div class="flex gap-2 overflow-x-auto py-3 scrollbar-hide" role="tablist">
          <a
            v-for="cat in features"
            :key="cat.id"
            :href="`#${cat.id}`"
            class="features-nav-pill flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all border border-transparent text-surface-600 dark:text-surface-400"
            :class="[
              activeSection === cat.id
                ? 'features-nav-pill-active bg-surface-900 text-white dark:bg-white dark:text-surface-900'
                : `hover:${getColor(cat.color).bg} hover:${getColor(cat.color).text}`
            ]"
            :data-section="cat.id"
            role="tab"
            :aria-selected="activeSection === cat.id ? 'true' : undefined"
            @click.prevent="scrollToSection(cat.id)"
          >
            {{ cat.title }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Feature Categories -->
    <div class="bg-surface-50 dark:bg-surface-900">
      <section
        v-for="(cat, catIndex) in features"
        :key="cat.id"
        :id="cat.id"
        :class="['py-16', catIndex === 0 ? 'pt-20' : '']"
      >
        <div class="container-custom">
          <!-- Category Header -->
          <div class="flex items-center gap-4 mb-10">
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              :class="[getColor(cat.color).bg, getColor(cat.color).bgDark]"
            >
              <svg
                class="w-6 h-6"
                :class="getColor(cat.color).text"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                v-html="getIcon(cat.icon)"
              />
            </div>
            <div class="flex items-center gap-3">
              <h2 class="text-2xl md:text-3xl font-heading font-bold text-surface-900 dark:text-white">{{ cat.title }}</h2>
              <span
                class="badge"
                :class="[getColor(cat.color).badgeBg, getColor(cat.color).badgeBgDark, getColor(cat.color).badgeText, getColor(cat.color).badgeTextDark]"
              >
                {{ cat.features.length }}
              </span>
            </div>
          </div>

          <!-- Feature Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="feat in cat.features"
              :key="feat.name"
              class="card p-5 group transition-all"
              :class="[getColor(cat.color).border, getColor(cat.color).borderDark]"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  :class="[getColor(cat.color).bg, getColor(cat.color).bgDark]"
                >
                  <svg
                    class="w-5 h-5"
                    :class="getColor(cat.color).text"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    v-html="getIcon(cat.icon)"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-heading font-semibold text-surface-900 dark:text-white text-sm">{{ feat.name }}</h3>
                  <p class="text-xs text-surface-500 dark:text-surface-400 mt-1 leading-relaxed">{{ feat.description }}</p>
                  <NuxtLink
                    v-if="feat.linkType === 'page'"
                    :to="feat.link"
                    class="inline-flex items-center gap-1 text-xs font-medium mt-2 group-hover:gap-2 transition-all"
                    :class="getColor(cat.color).text"
                  >
                    See it <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </NuxtLink>
                  <button
                    v-else-if="feat.linkType === 'action'"
                    type="button"
                    class="inline-flex items-center gap-1 text-xs font-medium mt-2 group-hover:gap-2 transition-all cursor-pointer"
                    :class="getColor(cat.color).text"
                    @click="handleAction(feat.link)"
                  >
                    Try it <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </button>
                  <span
                    v-else-if="feat.linkType === 'hint'"
                    class="inline-flex items-center gap-1 text-xs text-surface-400 dark:text-surface-500 mt-2"
                    :title="feat.hint"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    {{ feat.hint }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- CTA Section -->
    <section class="gradient-hero py-20">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Ready to Build Your Store?</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8">Get started with Bazaar and launch your ecommerce site in minutes, not months.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/shop" class="btn-primary">Browse the Demo</NuxtLink>
          <NuxtLink to="/" class="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm">Back to Home</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import features from '~/app/data/features.json';
import type { FeatureGroup } from '~/types';

useBazaarSEO({
  title: 'Theme Features',
  description: 'Explore 50+ features built into Bazaar \u2014 from product galleries and cart drawers to RTL support and dark mode.',
});

const totalFeatures = features.reduce((sum: number, cat: FeatureGroup) => sum + cat.features.length, 0);

const activeSection = ref<string>('');

const iconMap: Record<string, string> = {
  'shopping-bag': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />',
  'cart': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />',
  'search': '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />',
  'filter': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />',
  'star': '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />',
  'pencil': '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
  'globe': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
  'palette': '<path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />',
};

const colorMap: Record<string, {
  bg: string; bgDark: string; text: string;
  border: string; borderDark: string;
  badgeBg: string; badgeBgDark: string; badgeText: string; badgeTextDark: string;
}> = {
  primary:   { bg: 'bg-primary-100',   bgDark: 'dark:bg-primary-950',   text: 'text-primary-500',   border: 'hover:border-primary-200',   borderDark: 'dark:hover:border-primary-800',   badgeBg: 'bg-primary-100',   badgeBgDark: 'dark:bg-primary-950',   badgeText: 'text-primary-700',   badgeTextDark: 'dark:text-primary-300' },
  secondary: { bg: 'bg-secondary-100', bgDark: 'dark:bg-secondary-950', text: 'text-secondary-500', border: 'hover:border-secondary-200', borderDark: 'dark:hover:border-secondary-800', badgeBg: 'bg-secondary-100', badgeBgDark: 'dark:bg-secondary-950', badgeText: 'text-secondary-700', badgeTextDark: 'dark:text-secondary-300' },
  sky:       { bg: 'bg-sky-100',       bgDark: 'dark:bg-sky-950',       text: 'text-sky-500',       border: 'hover:border-sky-200',       borderDark: 'dark:hover:border-sky-800',       badgeBg: 'bg-sky-100',       badgeBgDark: 'dark:bg-sky-950',       badgeText: 'text-sky-700',       badgeTextDark: 'dark:text-sky-300' },
  emerald:   { bg: 'bg-emerald-100',   bgDark: 'dark:bg-emerald-950',   text: 'text-emerald-500',   border: 'hover:border-emerald-200',   borderDark: 'dark:hover:border-emerald-800',   badgeBg: 'bg-emerald-100',   badgeBgDark: 'dark:bg-emerald-950',   badgeText: 'text-emerald-700',   badgeTextDark: 'dark:text-emerald-300' },
  accent:    { bg: 'bg-accent-100',    bgDark: 'dark:bg-accent-950',    text: 'text-accent-500',    border: 'hover:border-accent-200',    borderDark: 'dark:hover:border-accent-800',    badgeBg: 'bg-accent-100',    badgeBgDark: 'dark:bg-accent-950',    badgeText: 'text-accent-700',    badgeTextDark: 'dark:text-accent-300' },
  indigo:    { bg: 'bg-indigo-100',    bgDark: 'dark:bg-indigo-950',    text: 'text-indigo-500',    border: 'hover:border-indigo-200',    borderDark: 'dark:hover:border-indigo-800',    badgeBg: 'bg-indigo-100',    badgeBgDark: 'dark:bg-indigo-950',    badgeText: 'text-indigo-700',    badgeTextDark: 'dark:text-indigo-300' },
  teal:      { bg: 'bg-teal-100',      bgDark: 'dark:bg-teal-950',      text: 'text-teal-500',      border: 'hover:border-teal-200',      borderDark: 'dark:hover:border-teal-800',      badgeBg: 'bg-teal-100',      badgeBgDark: 'dark:bg-teal-950',      badgeText: 'text-teal-700',      badgeTextDark: 'dark:text-teal-300' },
  pink:      { bg: 'bg-pink-100',      bgDark: 'dark:bg-pink-950',      text: 'text-pink-500',      border: 'hover:border-pink-200',      borderDark: 'dark:hover:border-pink-800',      badgeBg: 'bg-pink-100',      badgeBgDark: 'dark:bg-pink-950',      badgeText: 'text-pink-700',      badgeTextDark: 'dark:text-pink-300' },
};

function getColor(color: string) {
  return colorMap[color] || colorMap.primary;
}

function getIcon(icon: string): string {
  return iconMap[icon] || iconMap['shopping-bag'];
}

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (target) {
    const offset = 120;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function handleAction(action: string | undefined) {
  if (!action) return;
  switch (action) {
    case 'open-cart':
      document.dispatchEvent(new CustomEvent('bazaar:open-cart'));
      break;
    case 'open-search':
      document.dispatchEvent(new CustomEvent('bazaar:open-search'));
      break;
    case 'toggle-dark-mode': {
      const toggle = document.getElementById('theme-toggle');
      toggle?.click();
      break;
    }
    case 'open-newsletter':
      document.dispatchEvent(new CustomEvent('bazaar:open-newsletter'));
      break;
    case 'switch-rtl': {
      const html = document.documentElement;
      const isRtl = html.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.dispatchEvent(new CustomEvent('bazaar:locale-changed', { detail: { locale: 'en', dir: 'ltr' } }));
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        localStorage.setItem('bazaar-locale', 'en');
      } else {
        document.dispatchEvent(new CustomEvent('bazaar:locale-changed', { detail: { locale: 'ar', dir: 'rtl' } }));
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        localStorage.setItem('bazaar-locale', 'ar');
      }
      break;
    }
    case 'switch-language': {
      const langBtn = document.querySelector<HTMLButtonElement>('#language-switcher-btn, [aria-label="Switch language"]');
      langBtn?.click();
      break;
    }
  }
}

onMounted(() => {
  const pills = document.querySelectorAll<HTMLAnchorElement>('.features-nav-pill');
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const featureSectionIds = new Set(features.map((f: FeatureGroup) => f.id));

  if (pills.length && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      if (featureSectionIds.has(s.id)) observer.observe(s);
    });
  }
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
