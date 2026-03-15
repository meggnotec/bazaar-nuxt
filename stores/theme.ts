import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const current = ref<'light' | 'dark'>('light');

  function init() {
    if (typeof localStorage === 'undefined') return;
    const stored = localStorage.getItem('bazaar-theme') as 'light' | 'dark' | null;
    current.value = stored ?? 'light';
    apply();
  }

  function apply() {
    if (typeof document === 'undefined') return;
    if (current.value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggle() {
    current.value = current.value === 'dark' ? 'light' : 'dark';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bazaar-theme', current.value);
    }
    apply();
  }

  function set(theme: 'light' | 'dark') {
    current.value = theme;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bazaar-theme', current.value);
    }
    apply();
  }

  return { current, init, toggle, set };
});
