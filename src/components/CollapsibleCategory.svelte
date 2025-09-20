<script lang="ts">
  import { slide } from 'svelte/transition';
  import ConceptCard from './ConceptCard.svelte';
  import { searchTerm, activeCategory, categoryCounts } from '../stores/searchStore';
  import { derived } from 'svelte/store';
  import { ChevronDown } from 'lucide-svelte';

  export let category: string;
  export let topics: Array<{ title: string; image?: string; desc: string[]; parameters: string[]; q?: string }>; 

  let isOpen = true;

  const filteredTopics = derived(
    [searchTerm],
    ([$searchTerm]) => {
      if (!$searchTerm) return topics;
      const q = $searchTerm.toLowerCase().trim();
      return topics.filter((t) => (t.q || '').includes(q));
    }
  );

  $: categoryCounts.update((m) => ({ ...m, [category]: $filteredTopics.length }));

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<style>
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.5s ease-out both;
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

{#if $activeCategory === 'All' || $activeCategory === category}
  {#if $filteredTopics.length > 0}
    <div class="mb-12">
      <div class="mb-6">
        <button
          on:click={toggle}
          class="w-full text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 rounded-xl p-3 bg-gradient-to-r from-gray-50/80 to-teal-50/40 dark:from-neutral-900/80 dark:to-teal-950/40 border border-gray-200/40 dark:border-neutral-700/40 hover:border-teal-300/60 dark:hover:border-teal-700/60 transition-all duration-200 group shadow-sm hover:shadow-md"
          aria-expanded={isOpen}
        >
          <div class="flex items-center gap-4">
            <div class="w-2 h-8 bg-gradient-to-b from-teal-500 to-blue-600 rounded-full transition-transform duration-300 group-hover:scale-y-110"></div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-200">{category}</h2>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-500 dark:text-gray-400 font-medium bg-white/60 dark:bg-neutral-800/60 px-2.5 py-1 rounded-full transition-colors duration-200 group-hover:bg-white dark:group-hover:bg-neutral-800">{$filteredTopics.length}</span>
            <ChevronDown class={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-all duration-300 ${!isOpen ? '-rotate-90' : ''} group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:scale-110`} />
          </div>
        </button>
      </div>

      {#if isOpen}
        <div transition:slide={{ duration: 300 }} class="animate-fade-in">
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each $filteredTopics as t (t.title)}
              <li class="animate-slide-up" style="animation-delay: {Array.from($filteredTopics).indexOf(t) * 50}ms">
                <ConceptCard title={t.title} image={t.image} desc={t.desc} parameters={t.parameters} />
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/if}
{/if}

