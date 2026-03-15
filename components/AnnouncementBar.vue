<template>
  <div
    v-if="siteConfig.announcementBar.enabled && !isDismissed"
    class="gradient-hero text-white text-center text-sm py-2.5 px-4 relative"
  >
    <div class="container-custom flex items-center justify-center gap-2">
      <span class="font-medium" data-i18n="announcement.freeShipping">{{ siteConfig.announcementBar.text }}</span>
      <NuxtLink
        v-if="siteConfig.announcementBar.link"
        :to="siteConfig.announcementBar.link"
        class="underline underline-offset-2 hover:no-underline font-semibold"
      >
        <span data-i18n="announcement.shopNow">Shop Now</span> &rarr;
      </NuxtLink>
    </div>
    <button
      type="button"
      class="absolute end-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
      aria-label="Dismiss announcement"
      @click="dismiss"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import siteConfig from '~/app/data/site-config.json';

const isDismissed = ref(true);

function dismiss() {
  isDismissed.value = true;
  sessionStorage.setItem('bazaar-announcement-dismissed', '1');
}

onMounted(() => {
  isDismissed.value = !!sessionStorage.getItem('bazaar-announcement-dismissed');
});
</script>
