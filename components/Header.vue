<template>
  <header class="sticky top-0 z-50 bg-white/95 dark:bg-surface-950/95 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 transition-colors">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-18">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <template v-if="siteConfig.logo?.type === 'image'">
            <img
              :src="siteConfig.logo.image"
              :alt="siteConfig.name"
              :width="siteConfig.logo.width || 160"
              :height="siteConfig.logo.height || 40"
              class="h-10 w-auto dark:hidden"
            />
            <img
              :src="siteConfig.logo.imageDark || siteConfig.logo.image"
              :alt="siteConfig.name"
              :width="siteConfig.logo.width || 160"
              :height="siteConfig.logo.height || 40"
              class="h-10 w-auto hidden dark:block"
            />
          </template>
          <template v-else>
            <span class="text-2xl font-heading font-bold gradient-text">{{ siteConfig.logo?.text || siteConfig.name }}</span>
          </template>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          <template v-for="item in navigation.mainNav" :key="item.label">
            <div
              :class="['relative', isAdvanced(item) ? '' : 'group']"
              @mouseenter="isAdvanced(item) ? showMega(item.label) : undefined"
              @mouseleave="isAdvanced(item) ? hideMega() : undefined"
            >
              <NuxtLink
                :to="item.href"
                :class="[
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  item.badge
                    ? 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950'
                    : 'text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-50 dark:hover:bg-surface-800',
                ]"
              >
                {{ item.label }}
                <span v-if="item.badge" class="badge-sale text-[10px] ms-1">Sale</span>
                <svg
                  v-if="(item.subcategories && item.subcategories.length > 0) || isAdvanced(item)"
                  :class="['h-4 w-4 transition-transform', { 'rotate-180': activeMega === item.label }, !isAdvanced(item) ? 'group-hover:rotate-180' : '']"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </NuxtLink>

              <!-- Advanced mega-menu -->
              <div
                v-if="isAdvanced(item)"
                :class="[
                  'fixed left-0 right-0 top-[64px] pt-1 transition-all duration-200 z-50',
                  activeMega === item.label ? 'opacity-100 visible' : 'opacity-0 invisible',
                ]"
                @mouseenter="cancelMegaClose()"
                @mouseleave="hideMega()"
              >
                <div class="bg-white dark:bg-surface-800 shadow-2xl border-b border-surface-200 dark:border-surface-700">
                  <!-- Promo banner -->
                  <NuxtLink
                    v-if="item.promoBanner"
                    :to="item.promoBanner.href"
                    :class="`block bg-gradient-to-r ${item.promoBanner.bgColor} text-white text-center text-sm font-semibold py-2.5 hover:opacity-90 transition-opacity`"
                  >
                    {{ item.promoBanner.text }}
                    <svg class="inline-block w-4 h-4 ms-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </NuxtLink>
                  <div class="container-custom py-8">
                    <div class="grid grid-cols-12 gap-8">
                      <!-- Category columns -->
                      <div v-for="col in item.megaMenuColumns" :key="col.title" class="col-span-2">
                        <p class="text-xs font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-3">{{ col.title }}</p>
                        <ul class="space-y-1.5">
                          <li v-for="link in col.links" :key="link.href">
                            <NuxtLink :to="link.href" class="text-sm text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ link.label }}</NuxtLink>
                          </li>
                        </ul>
                      </div>

                      <!-- Trending products -->
                      <div class="col-span-4">
                        <p class="text-xs font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-3">Trending Now</p>
                        <div class="grid grid-cols-3 gap-3">
                          <NuxtLink v-for="product in item.trendingProducts" :key="product.href" :to="product.href" class="group/trend">
                            <div class="aspect-[3/4] rounded-xl overflow-hidden mb-2">
                              <img :src="product.image" :alt="product.title" width="300" height="400" loading="eager" class="w-full h-full object-cover transition-transform duration-300 group-hover/trend:scale-105" />
                            </div>
                            <p class="text-xs font-semibold text-surface-900 dark:text-white truncate group-hover/trend:text-primary-600 dark:group-hover/trend:text-primary-400 transition-colors">{{ product.title }}</p>
                            <p class="text-xs text-surface-500 dark:text-surface-400">{{ product.price }}</p>
                          </NuxtLink>
                        </div>
                      </div>

                      <!-- Featured promo card -->
                      <div v-if="item.featured" class="col-span-2">
                        <NuxtLink :to="item.featured.href" class="block rounded-xl overflow-hidden group/promo relative h-full">
                          <div class="h-full relative overflow-hidden">
                            <img
                              :src="item.featured.image"
                              :alt="item.featured.title"
                              width="400"
                              height="500"
                              loading="eager"
                              class="w-full h-full min-h-[200px] object-cover transition-transform duration-500 group-hover/promo:scale-105"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div class="absolute bottom-0 left-0 right-0 p-4">
                              <span class="badge-new text-[10px] mb-2 inline-block">Featured</span>
                              <h4 class="font-heading font-bold text-white text-sm leading-tight">{{ item.featured.title }}</h4>
                              <p class="text-white/80 text-[11px] mt-1">{{ item.featured.description }}</p>
                            </div>
                          </div>
                        </NuxtLink>
                      </div>
                    </div>
                    <!-- Bottom bar -->
                    <div class="mt-6 pt-4 border-t border-surface-200 dark:border-surface-700 flex items-center justify-between">
                      <NuxtLink :to="item.href" class="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                        Shop All {{ item.label }}
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                      </NuxtLink>
                      <div class="flex items-center gap-4 text-xs text-surface-400 dark:text-surface-500">
                        <NuxtLink to="/lookbook" class="hover:text-primary-500 transition-colors">Lookbook</NuxtLink>
                        <NuxtLink to="/size-guide" class="hover:text-primary-500 transition-colors">Size Guide</NuxtLink>
                        <NuxtLink to="/sale" class="hover:text-primary-500 transition-colors">Sale Items</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Standard mega-menu (featured exists, not advanced) -->
              <div
                v-if="hasSimpleMega(item)"
                class="absolute top-full -start-8 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              >
                <div class="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-700 p-6 w-[540px]">
                  <div class="grid grid-cols-2 gap-6">
                    <!-- Subcategory links -->
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 mb-3">
                        Categories
                      </p>
                      <div class="space-y-1">
                        <NuxtLink
                          v-for="sub in item.subcategories"
                          :key="sub.href"
                          :to="sub.href"
                          class="flex items-center gap-3 px-3 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-50 dark:hover:bg-surface-700/50 rounded-xl transition-colors group/link"
                        >
                          <span class="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-700 flex items-center justify-center group-hover/link:bg-primary-100 dark:group-hover/link:bg-primary-900/30 transition-colors">
                            <svg class="h-4 w-4 text-surface-400 group-hover/link:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                          <span class="font-medium">{{ sub.label }}</span>
                        </NuxtLink>
                      </div>
                      <NuxtLink
                        :to="item.href"
                        class="mt-3 inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        Shop All {{ item.label }}
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </NuxtLink>
                    </div>

                    <!-- Featured promo card -->
                    <NuxtLink :to="item.featured!.href" class="block rounded-xl overflow-hidden group/promo relative">
                      <div class="aspect-[4/3] relative overflow-hidden">
                        <img
                          v-if="item.featured!.image"
                          :src="item.featured!.image"
                          :alt="item.featured!.title"
                          width="400"
                          height="300"
                          loading="lazy"
                          class="w-full h-full object-cover transition-transform duration-500 group-hover/promo:scale-105"
                        />
                        <div
                          v-else
                          class="w-full h-full transition-transform duration-500 group-hover/promo:scale-105 bg-surface-200 dark:bg-surface-700"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-4">
                          <span class="badge-new text-[10px] mb-2 inline-block">Featured</span>
                          <h4 class="font-heading font-bold text-white text-lg leading-tight">{{ item.featured!.title }}</h4>
                          <p class="text-white/80 text-xs mt-1">{{ item.featured!.description }}</p>
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <!-- Simple dropdown -->
              <div
                v-if="hasSimpleDropdown(item)"
                class="absolute top-full start-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                <div class="bg-white dark:bg-surface-800 rounded-xl shadow-xl border border-surface-200 dark:border-surface-700 p-4 min-w-[200px]">
                  <NuxtLink
                    v-for="sub in item.subcategories"
                    :key="sub.href"
                    :to="sub.href"
                    class="block px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-50 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    {{ sub.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </template>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-1">
          <!-- Search -->
          <button
            type="button"
            class="rounded-full p-2 text-surface-600 dark:text-surface-400 hover:text-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            aria-label="Search"
            @click="openSearch"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <ThemeToggle />
          <LanguageSwitcher />

          <!-- Compare -->
          <NuxtLink
            to="/compare"
            class="hidden sm:flex rounded-full p-2 text-surface-600 dark:text-surface-400 hover:text-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative"
            aria-label="Compare products"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <span
              v-show="compareCount > 0"
              class="absolute -top-0.5 -end-0.5 h-4 w-4 rounded-full bg-secondary-500 text-[10px] font-bold text-white flex items-center justify-center"
            >{{ compareCount }}</span>
          </NuxtLink>

          <!-- Wishlist -->
          <NuxtLink
            to="/wishlist"
            class="rounded-full p-2 text-surface-600 dark:text-surface-400 hover:text-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative"
            aria-label="Wishlist"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span
              v-show="wishlistCount > 0"
              class="absolute -top-0.5 -end-0.5 h-4 w-4 rounded-full bg-primary-500 text-[10px] font-bold text-white flex items-center justify-center"
            >{{ wishlistCount }}</span>
          </NuxtLink>

          <!-- Cart -->
          <button
            type="button"
            class="rounded-full p-2 text-surface-600 dark:text-surface-400 hover:text-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors relative"
            aria-label="Shopping cart"
            @click="openCart"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span
              v-show="cartCount > 0"
              class="absolute -top-0.5 -end-0.5 h-4 w-4 rounded-full bg-primary-500 text-[10px] font-bold text-white flex items-center justify-center"
            >{{ cartCount }}</span>
          </button>

          <!-- Mobile menu toggle -->
          <button
            type="button"
            class="lg:hidden rounded-full p-2 text-surface-600 dark:text-surface-400 hover:text-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            aria-label="Open menu"
            @click="openMobileMenu"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import siteConfig from '~/app/data/site-config.json';
import navigation from '~/app/data/navigation.json';
import type { NavItem } from '~/types';

const cartCount = ref(0);
const wishlistCount = ref(0);
const compareCount = ref(0);
const activeMega = ref<string | null>(null);
let megaCloseTimer: ReturnType<typeof setTimeout> | null = null;

function isAdvanced(item: NavItem): boolean {
  return item.megaMenuType === 'advanced';
}

function hasSimpleMega(item: NavItem): boolean {
  return !!(item.subcategories && item.subcategories.length > 0 && item.featured && !isAdvanced(item));
}

function hasSimpleDropdown(item: NavItem): boolean {
  return !!(item.subcategories && item.subcategories.length > 0 && !item.featured && !isAdvanced(item));
}

function showMega(label: string) {
  if (megaCloseTimer) {
    clearTimeout(megaCloseTimer);
    megaCloseTimer = null;
  }
  activeMega.value = label;
}

function hideMega() {
  megaCloseTimer = setTimeout(() => {
    activeMega.value = null;
  }, 150);
}

function cancelMegaClose() {
  if (megaCloseTimer) {
    clearTimeout(megaCloseTimer);
    megaCloseTimer = null;
  }
}

function openSearch() {
  document.dispatchEvent(new CustomEvent('bazaar:open-search'));
}

function openCart() {
  document.dispatchEvent(new CustomEvent('bazaar:open-cart'));
}

function openMobileMenu() {
  document.dispatchEvent(new CustomEvent('bazaar:open-mobile-menu'));
}

function updateCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem('bazaar-cart') || '[]');
    cartCount.value = cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
  } catch {
    cartCount.value = 0;
  }
}

function updateWishlistCount() {
  try {
    const list = JSON.parse(localStorage.getItem('bazaar-wishlist') || '[]');
    wishlistCount.value = list.length;
  } catch {
    wishlistCount.value = 0;
  }
}

function updateCompareCount() {
  try {
    const list = JSON.parse(localStorage.getItem('bazaar-compare') || '[]');
    compareCount.value = list.length;
  } catch {
    compareCount.value = 0;
  }
}

onMounted(() => {
  updateCartCount();
  updateWishlistCount();
  updateCompareCount();

  document.addEventListener('bazaar:cart-updated', updateCartCount);
  document.addEventListener('bazaar:wishlist-updated', updateWishlistCount);
  document.addEventListener('bazaar:compare-updated', updateCompareCount);
});

onUnmounted(() => {
  document.removeEventListener('bazaar:cart-updated', updateCartCount);
  document.removeEventListener('bazaar:wishlist-updated', updateWishlistCount);
  document.removeEventListener('bazaar:compare-updated', updateCompareCount);
});
</script>
