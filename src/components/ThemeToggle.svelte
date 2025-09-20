<script lang="ts">
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';

  let theme: 'light' | 'dark' | null = null;

  onMount(() => {
    theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  function setTheme(newTheme: 'light' | 'dark') {
    theme = newTheme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    if (theme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }
</script>

<button
  on:click={toggleTheme}
  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
>
  {#if theme === 'light'}
    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
  {:else if theme === 'dark'}
    <Moon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
  {/if}
  <span class="sr-only">Toggle theme</span>
</button>
