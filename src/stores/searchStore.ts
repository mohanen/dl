import { writable } from 'svelte/store';

export const searchTerm = writable('');
export const activeCategory = writable('All');
