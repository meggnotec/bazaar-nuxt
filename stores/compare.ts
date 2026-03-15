import { defineStore } from 'pinia';
import type { CompareItem } from '~/types';

const MAX_ITEMS = 4;

export const useCompareStore = defineStore('compare', () => {
  const items = ref<CompareItem[]>([]);
  const isHydrated = ref(false);

  function hydrate() {
    if (isHydrated.value) return;
    try {
      const stored = localStorage.getItem('bazaar-compare');
      if (stored) items.value = JSON.parse(stored);
    } catch { /* ignore */ }
    isHydrated.value = true;
  }

  function persist() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('bazaar-compare', JSON.stringify(items.value));
    document.dispatchEvent(new CustomEvent('bazaar:compare-updated'));
  }

  function add(item: CompareItem): boolean {
    hydrate();
    if (items.value.length >= MAX_ITEMS) return false;
    if (items.value.some((i) => i.id === item.id)) return false;
    items.value.push({ ...item });
    persist();
    return true;
  }

  function remove(id: number) {
    items.value = items.value.filter((i) => i.id !== id);
    persist();
  }

  function isInCompare(id: number): boolean {
    return items.value.some((i) => i.id === id);
  }

  function clear() {
    items.value = [];
    persist();
  }

  const compareCount = computed(() => items.value.length);

  return { items, compareCount, add, remove, isInCompare, clear, hydrate };
});
