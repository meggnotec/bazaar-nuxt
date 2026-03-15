import { defineStore } from 'pinia';
import type { WishlistItem } from '~/types';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([]);
  const isHydrated = ref(false);

  function hydrate() {
    if (isHydrated.value) return;
    try {
      const stored = localStorage.getItem('bazaar-wishlist');
      if (stored) items.value = JSON.parse(stored);
    } catch { /* ignore */ }
    isHydrated.value = true;
  }

  function persist() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('bazaar-wishlist', JSON.stringify(items.value));
    document.dispatchEvent(new CustomEvent('bazaar:wishlist-updated'));
  }

  function add(item: WishlistItem) {
    hydrate();
    if (!items.value.some((i) => i.id === item.id)) {
      items.value.push({ ...item });
      persist();
    }
  }

  function remove(id: number) {
    items.value = items.value.filter((i) => i.id !== id);
    persist();
  }

  function isInWishlist(id: number): boolean {
    return items.value.some((i) => i.id === id);
  }

  const wishlistCount = computed(() => items.value.length);

  return { items, wishlistCount, add, remove, isInWishlist, hydrate };
});
