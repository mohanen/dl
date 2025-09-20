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
  <div class="block rounded-xl border bg-card/90 backdrop-blur-sm transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/50 focus-within:ring-1 focus-within:ring-ring">
    {#if image}
      <div class="relative w-full aspect-video overflow-hidden">
        {#if !cardImgLoaded}
          <div class="absolute inset-0 bg-muted animate-pulse"></div>
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
        <h3 class="text-base md:text-lg font-semibold tracking-tight text-card-foreground">{title}</h3>
      </div>
      <div class="grid gap-4">
        {#if desc?.length}
          <section class="rounded-md bg-muted/30 p-4">
            <div class="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Desc</div>
            <ul class="list-disc pl-5 text-sm text-card-foreground/90 marker:text-accent space-y-2">
              {#each desc as d}
                <li>{@html d}</li>
              {/each}
            </ul>
          </section>
        {/if}

        {#if parameters?.length}
          <section class="rounded-md bg-muted/30 p-4">
            <div class="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Parameters</div>
            <ul class="list-disc pl-5 text-sm text-card-foreground/90 marker:text-accent space-y-2">
              {#each parameters as p}
                <li class="[&_>.param-name]:font-semibold [&_>.param-name]:text-foreground">{@html p}</li>
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


