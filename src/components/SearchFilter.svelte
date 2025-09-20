<script lang="ts">
  import { searchTerm, activeCategory, resultCount } from '../stores/searchStore';
  import { Search as SearchIcon } from 'lucide-svelte';
  import { onMount } from 'svelte';
  let localTerm = '';
  let debTimer: number | undefined;
  function handleDebouncedInput(value: string) {
    if (debTimer) window.clearTimeout(debTimer);
    debTimer = window.setTimeout(() => searchTerm.set(value), 200);
  }

  export let categories: string[];

  // Initialize local input from store so URL-initialized query reflects in UI
  const unsubscribe = searchTerm.subscribe((v) => { localTerm = v; });
  onMount(() => () => unsubscribe());

  function setCategory(category: string) {
    activeCategory.set(category);
  }
</script>

<div class="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
  <div class="relative w-full sm:max-w-xs">
    <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" aria-hidden="true" />
    <input
      type="text"
      placeholder="Search concepts..."
      class="pl-10 pr-4 py-2 w-full bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      bind:value={localTerm}
      on:input={(e) => handleDebouncedInput((e.target as HTMLInputElement).value)}
      aria-label="Search concepts"
    />
    {#if localTerm}
      <button
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xs"
        on:click={() => { localTerm=''; searchTerm.set(''); }}
        aria-label="Clear search"
      >
        ✕
      </button>
    {/if}
  </div>
  <div class="flex w-full items-center gap-2">
    <div class="min-w-0 flex-1 overflow-x-auto pb-2 -mb-2">
      <div class="flex items-center gap-2">
        <button
          on:click={() => setCategory('All')}
          class="px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap"
          class:bg-primary={ $activeCategory === 'All' }
          class:text-primary-foreground={ $activeCategory === 'All' }
          class:hover:bg-accent={ $activeCategory !== 'All' }
          class:hover:text-accent-foreground={ $activeCategory !== 'All' }
        >
          All
        </button>
        {#each categories as category}
          <button
            on:click={() => setCategory(category)}
            class="px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap"
            class:bg-primary={ $activeCategory === category }
            class:text-primary-foreground={ $activeCategory === category }
            class:hover:bg-accent={ $activeCategory !== category }
            class:hover:text-accent-foreground={ $activeCategory !== category }
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
    <div class="flex-shrink-0 text-sm text-gray-600 dark:text-gray-400 ml-2 whitespace-nowrap">{$resultCount} results</div>
  </div>
</div>
