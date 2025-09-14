import { writable, derived } from 'svelte/store';

export const searchTerm = writable('');
export const activeCategory = writable('All');
// Per-category filtered counts published by each category component
export const categoryCounts = writable<Record<string, number>>({});

// Derived total result count for current selection
export const resultCount = derived(
  [activeCategory, categoryCounts],
  ([$activeCategory, $categoryCounts]) => {
    if ($activeCategory === 'All') {
      return Object.values($categoryCounts).reduce((sum, n) => sum + (n || 0), 0);
    }
    return $categoryCounts[$activeCategory] || 0;
  },
  0
);

// URL sync helpers
function getQueryParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setQueryParams(params: Record<string, string | undefined>) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([k, v]) => {
    if (v && v.length) url.searchParams.set(k, v);
    else url.searchParams.delete(k);
  });
  window.history.replaceState({}, '', url.toString());
}

// Initialize from URL once on client
if (typeof window !== 'undefined') {
  const s = getQueryParam('q');
  const c = getQueryParam('cat');
  if (s) searchTerm.set(s);
  if (c) activeCategory.set(c);
}

// Sync to URL when stores change
let debounceTimer: number | undefined;
const debounce = (fn: () => void, ms = 200) => {
  if (debounceTimer) window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(fn, ms);
};

if (typeof window !== 'undefined') {
  searchTerm.subscribe((q) => debounce(() => setQueryParams({ q })));
  activeCategory.subscribe((cat) => setQueryParams({ cat }));
}
