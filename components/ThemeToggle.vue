<template>
  <button
    id="theme-toggle"
    type="button"
    class="relative rounded-full p-2 text-surface-600 hover:text-primary-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-primary-400 dark:hover:bg-surface-800 transition-colors cursor-pointer"
    aria-label="Toggle dark mode"
    @click="toggle"
  >
    <!-- Sun icon (shown in dark mode) -->
    <svg class="hidden dark:block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
    <!-- Moon icon (shown in light mode) -->
    <svg class="block dark:hidden h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
function toggle() {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('bazaar-theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('bazaar-theme', 'dark');
  }
}

onMounted(() => {
  const stored = localStorage.getItem('bazaar-theme') || 'light';
  if (stored === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>
