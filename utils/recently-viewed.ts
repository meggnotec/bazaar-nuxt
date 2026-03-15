const RV_KEY = 'bazaar-recently-viewed';
const MAX_ITEMS = 6;

export function trackView(slug: string): void {
  if (typeof window === 'undefined') return;
  const items = getRecentlyViewed().filter((s) => s !== slug);
  items.unshift(slug);
  localStorage.setItem(RV_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
}

export function getRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(RV_KEY);
  return data ? JSON.parse(data) : [];
}
