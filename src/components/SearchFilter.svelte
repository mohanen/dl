<script lang="ts">
  import { searchTerm, activeCategory } from '../stores/searchStore';

  export let categories: string[];

  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchTerm.set(target.value);
  }

  function setCategory(category: string) {
    activeCategory.set(category);
  }
</script>

<div class="mb-8 flex flex-col sm:flex-row gap-4">
  <div class="relative w-full sm:max-w-xs">
    <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
    <input
      type="text"
      placeholder="Search concepts..."
      class="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      on:input={handleSearch}
    />
  </div>
  <div class="flex-shrink-0 flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
     <button
      on:click={() => setCategory('All')}
      class="px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap"
      class:bg-primary={ $activeCategory === 'All' }
      class:text-primary-foreground={ $activeCategory === 'All' }
      class:hover:bg-accent={ $activeCategory !== 'All' }
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
      >
        {category}
      </button>
    {/each}
  </div>
</div>
