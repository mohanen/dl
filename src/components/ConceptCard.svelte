<script lang="ts">
  import { onMount } from 'svelte';
  export let title: string;
  export let image: string | undefined = undefined;
  export let desc: string[] = [];
  export let parameters: string[] = [];

  let cardImgLoaded = false;
  let cardImgEl: HTMLImageElement | null = null;
  let isHovering = false;
  let isTouchDevice = false;
  onMount(() => {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    try { if (cardImgEl && cardImgEl.complete) cardImgLoaded = true; } catch {}
  });
</script>

<div
  class="group relative"
  aria-label={title}
  role="article"
  on:mouseenter={() => { if (!isTouchDevice) isHovering = true; }}
  on:mouseleave={() => { if (!isTouchDevice) isHovering = false; }}
>
  <div class="block rounded-xl border border-gray-200/60 dark:border-neutral-700/60 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1.5 hover:border-teal-400/60 focus-within:ring-2 focus-within:ring-teal-500/50 focus-within:shadow-2xl focus-within:shadow-teal-500/20 relative group">
    {#if image}
      <div class="relative w-full aspect-video overflow-hidden">
        {#if !cardImgLoaded}
          <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 animate-pulse rounded-t-xl"></div>
        {/if}
        <img
          bind:this={cardImgEl}
          src={image}
          alt={title}
          class="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          on:load={() => { cardImgLoaded = true; }}
        />
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent"></div>
      </div>
    {/if}
    <div class="p-5">
      <div class="mb-4">
        <h3 class="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-200">{title}</h3>
      </div>
      <div class="grid gap-4">
        {#if desc?.length}
          <section class="rounded-lg bg-gradient-to-br from-teal-50/80 to-blue-50/80 dark:from-neutral-800/50 dark:to-neutral-800/30 border border-gray-200/50 dark:border-neutral-700/50 p-4 group-hover:border-teal-300/60 dark:group-hover:border-teal-700/60 transition-colors duration-200">
            <div class="text-xs uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2 font-medium">Description</div>
            <ul class="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200 marker:text-teal-500 space-y-2">
              {#each desc as d}
                <li class="leading-relaxed">{@html d}</li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if parameters?.length}
          <section class="rounded-lg bg-gradient-to-br from-blue-50/80 to-yellow-50/80 dark:from-neutral-800/50 dark:to-neutral-800/30 border border-gray-200/50 dark:border-neutral-700/50 p-4 group-hover:border-blue-300/60 dark:group-hover:border-blue-700/60 transition-colors duration-200">
            <div class="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-medium">Parameters</div>
            <ul class="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200 marker:text-blue-500 space-y-2">
              {#each parameters as p}
                <li class="leading-relaxed [&_>.param-name]:font-semibold [&_>.param-name]:text-gray-900 dark:[&_>.param-name]:text-gray-100">{@html p}</li>
              {/each}
            </ul>
          </section>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  
</style>


