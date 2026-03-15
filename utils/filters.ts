import type { FilterState } from '~/types';

export function getFilterState(): FilterState {
  const params = new URLSearchParams(window.location.search);
  return {
    categories: params.get('cat')?.split(',').filter(Boolean) ?? [],
    priceMin: params.get('min') ? Number(params.get('min')) : null,
    priceMax: params.get('max') ? Number(params.get('max')) : null,
    sizes: params.get('sizes')?.split(',').filter(Boolean) ?? [],
    colors: params.get('colors')?.split(',').filter(Boolean) ?? [],
    inStock: params.get('instock') === '1',
    sort: params.get('sort') ?? 'featured',
  };
}

export function updateURLParams(state: FilterState): void {
  const params = new URLSearchParams();
  if (state.categories.length) params.set('cat', state.categories.join(','));
  if (state.priceMin !== null) params.set('min', String(state.priceMin));
  if (state.priceMax !== null) params.set('max', String(state.priceMax));
  if (state.sizes.length) params.set('sizes', state.sizes.join(','));
  if (state.colors.length) params.set('colors', state.colors.join(','));
  if (state.inStock) params.set('instock', '1');
  if (state.sort !== 'featured') params.set('sort', state.sort);

  const qs = params.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState({}, '', url);
}

export function applyFilters(): void {
  const state = getFilterState();
  const cards = document.querySelectorAll<HTMLElement>('[data-product-card]');
  let visibleCount = 0;

  cards.forEach((card) => {
    let visible = true;

    if (state.categories.length) {
      const cat = card.dataset.category ?? '';
      if (!state.categories.includes(cat)) visible = false;
    }

    if (state.priceMin !== null) {
      const price = Number(card.dataset.price ?? 0);
      if (price < state.priceMin) visible = false;
    }

    if (state.priceMax !== null) {
      const price = Number(card.dataset.price ?? 0);
      if (price > state.priceMax) visible = false;
    }

    if (state.sizes.length) {
      const sizes = (card.dataset.sizes ?? '').split(',');
      if (!state.sizes.some((s) => sizes.includes(s))) visible = false;
    }

    if (state.inStock) {
      if (card.dataset.instock !== 'true') visible = false;
    }

    card.style.display = visible ? '' : 'none';
    if (visible) visibleCount++;
  });

  const countEl = document.getElementById('product-count');
  if (countEl) {
    countEl.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
  }

  sortProducts(state.sort);
  updateURLParams(state);
}

function sortProducts(sort: string): void {
  const container = document.getElementById('product-grid');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-product-card]'));

  cards.sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return Number(a.dataset.price ?? 0) - Number(b.dataset.price ?? 0);
      case 'price-desc':
        return Number(b.dataset.price ?? 0) - Number(a.dataset.price ?? 0);
      case 'newest':
        return (b.dataset.isnew === 'true' ? 1 : 0) - (a.dataset.isnew === 'true' ? 1 : 0);
      case 'rating':
        return Number(b.dataset.rating ?? 0) - Number(a.dataset.rating ?? 0);
      default:
        return Number(b.dataset.featured ?? 0) - Number(a.dataset.featured ?? 0);
    }
  });

  cards.forEach((card) => container.appendChild(card));
}
