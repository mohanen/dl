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

<div class="mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
  <div class="relative w-full sm:max-w-sm">
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <SearchIcon class="text-gray-400 dark:text-gray-500 h-5 w-5 transition-colors duration-200" aria-hidden="true" />
    </div>
    <input
      type="text"
      placeholder="Search concepts..."
      class="pl-12 pr-12 py-3 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-gray-200/60 dark:border-neutral-700/60 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400/60 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
      bind:value={localTerm}
      on:input={(e) => handleDebouncedInput((e.target as HTMLInputElement).value)}
      aria-label="Search concepts"
    />
    {#if localTerm}
      <button
        type="button"
        class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        on:click={() => { localTerm=''; searchTerm.set(''); }}
        aria-label="Clear search"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    {/if}
  </div>
  <div class="flex w-full items-center gap-2">
    <div class="min-w-0 flex-1 overflow-x-auto pb-2 -mb-2">
      <div class="flex items-center gap-2">
        <button
          on:click={() => setCategory('All')}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap backdrop-blur-sm border"
          class:bg-teal-600={$activeCategory === 'All'}
          class:text-white={$activeCategory === 'All'}
          class:border-transparent={$activeCategory === 'All'}
          class:bg-white={$activeCategory !== 'All'}
          class:text-gray-700={$activeCategory !== 'All'}
          class:border-gray-200={$activeCategory !== 'All'}
          class:dark:bg-neutral-800={$activeCategory !== 'All'}
          class:dark:text-gray-300={$activeCategory !== 'All'}
          class:dark:border-neutral-700={$activeCategory !== 'All'}
          class:hover:bg-teal-500={$activeCategory === 'All'}
          class:hover:text-white={$activeCategory === 'All'}
          class:hover:bg-gray-100={$activeCategory !== 'All'}
          class:hover:border-gray-300={$activeCategory !== 'All'}
          class:dark:hover:bg-neutral-700={$activeCategory !== 'All'}
          class:dark:hover:border-neutral-600={$activeCategory !== 'All'}
          class:shadow-sm={$activeCategory === 'All'}
        >
          All
        </button>
        {#each categories as category}
          <button
            on:click={() => setCategory(category)}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap backdrop-blur-sm border"
            class:bg-teal-600={$activeCategory === category}
            class:text-white={$activeCategory === category}
            class:border-transparent={$activeCategory === category}
            class:bg-white={$activeCategory !== category}
            class:text-gray-700={$activeCategory !== category}
            class:border-gray-200={$activeCategory !== category}
            class:dark:bg-neutral-800={$activeCategory !== category}
            class:dark:text-gray-300={$activeCategory !== category}
            class:dark:border-neutral-700={$activeCategory !== category}
            class:hover:bg-teal-500={$activeCategory === category}
            class:hover:text-white={$activeCategory === category}
            class:hover:bg-gray-100={$activeCategory !== category}
            class:hover:border-gray-300={$activeCategory !== category}
            class:dark:hover:bg-neutral-700={$activeCategory !== category}
            class:dark:hover:border-neutral-600={$activeCategory !== category}
            class:shadow-sm={$activeCategory === category}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
    <div class="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 ml-4 px-3 py-1 bg-gray-100/60 dark:bg-neutral-800/60 rounded-full backdrop-blur-sm whitespace-nowrap font-medium">
      {$resultCount} result{$resultCount !== 1 ? 's' : ''}
    </div>
  </div>
</div>
