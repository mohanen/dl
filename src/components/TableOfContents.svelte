<script lang="ts">
  import { onMount } from 'svelte';

  export let headings: { depth: number; slug: string; text: string }[];

  let activeHeading = '';
  
  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeHeading = entry.target.id;
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  });
</script>

<nav class="sticky top-24">
  <h2 class="font-semibold mb-2">On this page</h2>
  <ul>
    {#each headings.filter(h => h.depth <= 3) as heading}
      <li class:pl-4={heading.depth === 3}>
        <a
          href={`#${heading.slug}`}
          class="block py-1 text-sm transition-colors"
          class:text-primary={activeHeading === heading.slug}
          class:text-muted-foreground={activeHeading !== heading.slug}
          class:hover:text-foreground={activeHeading !== heading.slug}
        >
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>
