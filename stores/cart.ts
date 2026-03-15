import { defineStore } from 'pinia';
import type { CartItem } from '~/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isHydrated = ref(false);

  function hydrate() {
    if (isHydrated.value) return;
    try {
      const stored = localStorage.getItem('bazaar-cart');
      if (stored) items.value = JSON.parse(stored);
    } catch { /* ignore */ }
    isHydrated.value = true;
  }

  function persist() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('bazaar-cart', JSON.stringify(items.value));
    document.dispatchEvent(new CustomEvent('bazaar:cart-updated'));
  }

  const cartCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  );

  const cartTotal = computed(() =>
    items.value.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0)
  );

  function add(item: CartItem) {
    hydrate();
    const existing = items.value.find(
      (i) => i.id === item.id && i.size === item.size && i.color === item.color
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.value.push({ ...item });
    }
    persist();
  }

  function remove(id: number, size: string, color: string) {
    items.value = items.value.filter(
      (i) => !(i.id === id && i.size === size && i.color === color)
    );
    persist();
  }

  function updateQuantity(id: number, size: string, color: string, qty: number) {
    const item = items.value.find(
      (i) => i.id === id && i.size === size && i.color === color
    );
    if (item) {
      item.quantity = Math.max(1, qty);
      persist();
    }
  }

  function clear() {
    items.value = [];
    persist();
  }

  return { items, cartCount, cartTotal, add, remove, updateQuantity, clear, hydrate };
});
