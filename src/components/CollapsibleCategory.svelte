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

{#if $activeCategory === 'All' || $activeCategory === category}
  {#if $filteredTopics.length > 0}
    <div>
      <button
        on:click={toggle}
        class="w-full text-left flex items-center justify-between mt-8 mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-1"
        aria-expanded={isOpen}
      >
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">{category}</h2>
        <ChevronDown class={`transition-transform duration-200 ${!isOpen ? 'rotate-180' : ''}`} />
      </button>

      {#if isOpen}
        <div transition:slide={{ duration: 200 }}>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each $filteredTopics as t (t.title)}
              <li>
                <ConceptCard title={t.title} image={t.image} desc={t.desc} parameters={t.parameters} />
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/if}
{/if}

