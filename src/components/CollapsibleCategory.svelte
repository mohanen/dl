<script lang="ts">
  import { slide } from 'svelte/transition';
  import ConceptCard from './ConceptCard.svelte';
  import { searchTerm, activeCategory } from '../stores/searchStore';
  import { derived } from 'svelte/store';
  import { ChevronDown } from 'lucide-svelte';

  export let category: string;
  export let concepts: any[];

  let isOpen = true;

  const filteredConcepts = derived(
    [searchTerm],
    ([$searchTerm]) => {
      if (!$searchTerm) return concepts;
      return concepts.filter(concept => 
        concept.data.title.toLowerCase().includes($searchTerm.toLowerCase()) ||
        concept.data.description.toLowerCase().includes($searchTerm.toLowerCase()) ||
        concept.keywords?.join(' ').toLowerCase().includes($searchTerm.toLowerCase())
      );
    }
  );

  // Update result count for active category only
  import { resultCount } from '../stores/searchStore';
  $: if ($activeCategory === category) {
    resultCount.set($filteredConcepts.length);
  }

  function toggle() {
    isOpen = !isOpen;
  }
</script>

{#if $activeCategory === 'All' || $activeCategory === category}
  {#if $filteredConcepts.length > 0}
    <div>
      <button
        on:click={toggle}
        class="w-full text-left flex items-center justify-between mt-8 mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
        aria-expanded={isOpen}
      >
        <h2 class="text-xl font-semibold text-primary">{category}</h2>
        <ChevronDown class={`transition-transform duration-200 ${!isOpen ? 'rotate-180' : ''}`} />
      </button>

      {#if isOpen}
        <div transition:slide={{ duration: 200 }}>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each $filteredConcepts as concept (concept.slug)}
              {@const { body, data, slug } = concept}
              {@const conceptText = extractSection(body, 'The Concept')}
              {@const howText = extractSection(body, 'How It Works')}
              {@const formula = extractFirstFormula(body)}
              {@const parameters = extractSubHeadings(body, 'Key Parameters')}
              {@const types = extractListItems(body, `Types of ${data.title}`) || extractListItems(body, 'Types')}
              {@const images = extractImages(body)}
              <li>
                <ConceptCard
                  title={data.title}
                  description={data.description}
                  href={`${import.meta.env.BASE_URL}/concepts/${slug}/`}
                  concept={conceptText}
                  how={howText}
                  {formula}
                  {parameters}
                  {types}
                  {images}
                />
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/if}
{/if}

<script context="module" lang="ts">
  // These functions need to be available to the component, so we define them in the module script.
  // This is a bit of a workaround for sharing server-side logic from Astro with a Svelte component.
  export function extractSection(content: string | undefined, heading: string): string {
    if (!content) return '';
    const headingRegex = new RegExp(`^###\\s+${heading}\\s*([\\s\\S]*?)(?=\\n###|$)`, 'im');
    const match = content.match(headingRegex);
    return match ? match[1].trim() : '';
  }

  export function extractFirstFormula(content: string | undefined): string {
    if (!content) return '';
    const formulaRegex = /\$\$([\s\S]*?)\$\$/;
    const match = content.match(formulaRegex);
    return match ? match[1].trim() : '';
  }

  export function extractSubHeadings(content: string | undefined, heading: string): string[] {
    if (!content) return [];
    const section = extractSection(content, heading);
    if (!section) return [];
    const subHeadingRegex = /####\s*(.*?)\\s*\\n([\\s\\S]*?)(?=\\n####|\\n###|$)/g;
    let matches;
    const results = [];
    while ((matches = subHeadingRegex.exec(section)) !== null) {
      results.push(`<strong>${matches[1].trim()}:</strong> ${matches[2].trim()}`);
    }
    return results;
  }

  export function extractListItems(content: string | undefined, heading: string): string[] {
    if (!content) return [];
    const section = extractSection(content, heading);
    if (!section) return [];
    const listItemRegex = /-\\s*(.*)/g;
    let matches;
    const results = [];
    while ((matches = listItemRegex.exec(section)) !== null) {
      results.push(matches[1].trim());
    }
    return results;
  }

  export function extractImages(content: string | undefined): string[] {
    if (!content) return [];
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
    const htmlImageRegex = /<img.*?src=["'](.*?)["'].*?>/g;
    let matches;
    const results = [];
    while ((matches = markdownImageRegex.exec(content)) !== null) {
      results.push(matches[1]);
    }
    while ((matches = htmlImageRegex.exec(content)) !== null) {
      results.push(matches[1]);
    }
    return results;
  }
</script>
