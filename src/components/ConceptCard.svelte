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
  <div class="block rounded-xl border border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-400/50 focus-within:ring-1 focus-within:ring-indigo-500">
    {#if image}
      <div class="relative w-full aspect-video overflow-hidden">
        {#if !cardImgLoaded}
          <div class="absolute inset-0 bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
        {/if}
        <img
          bind:this={cardImgEl}
          src={image}
          alt={title}
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          on:load={() => { cardImgLoaded = true; }}
        />
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent"></div>
      </div>
    {/if}
    <div class="p-4">
      <div class="mb-4">
        <h3 class="text-base md:text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      <div class="grid gap-4">
        {#if desc?.length}
          <section class="rounded-md bg-gray-100/60 dark:bg-neutral-800/60 p-4">
            <div class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Desc</div>
            <ul class="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200 marker:text-indigo-500 space-y-2">
              {#each desc as d}
                <li>{@html d}</li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if parameters?.length}
          <section class="rounded-md bg-gray-100/60 dark:bg-neutral-800/60 p-4">
            <div class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Parameters</div>
            <ul class="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200 marker:text-indigo-500 space-y-2">
              {#each parameters as p}
                <li class="[&_>.param-name]:font-semibold [&_>.param-name]:text-gray-900 dark:[&_>.param-name]:text-gray-100">{@html p}</li>
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


