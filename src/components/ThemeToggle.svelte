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
  class="group relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100/80 dark:hover:bg-neutral-800/80 hover:scale-105 hover:shadow-md bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border border-gray-200/40 dark:border-neutral-700/40 p-2.5"
  aria-label="Toggle theme"
>
  <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  {#if theme === 'light'}
    <Sun class="relative z-10 h-5 w-5 rotate-0 scale-100 transition-all duration-300 group-hover:text-yellow-500 group-hover:rotate-12" />
  {:else if theme === 'dark'}
    <Moon class="relative z-10 h-5 w-5 rotate-0 scale-100 transition-all duration-300 group-hover:text-teal-400 group-hover:-rotate-12" />
  {/if}
  <span class="sr-only">Toggle theme</span>
</button>
