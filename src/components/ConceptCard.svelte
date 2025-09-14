<script lang="ts">
  import { tick, afterUpdate } from 'svelte';
  import { onMount } from 'svelte';
  import katex from 'katex';
  export let title: string;
  export let description: string;
  export let href: string;
  export let concept: string = '';
  export let how: string = '';
  export let formula: string = '';
  export let parameters: string[] = [];
  export let types: string[] = [];
  export let images: string[] = [];

  let isHovering = false;
  let isTouchDevice = false;
  let formulaEl: HTMLElement;

  onMount(() => {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });
  
  afterUpdate(() => {
    if (formula && formulaEl) {
      try {
        katex.render(formula, formulaEl, {
          throwOnError: false,
          displayMode: true
        });
      } catch (e) {
        console.error(e);
        formulaEl.textContent = `$$${formula}$$`; // Fallback
      }
    }
  });

  let showModal = false;
  let isLoading = false;
  let loadError: string | null = null;
  let htmlContent = '';

  let cardEl: HTMLElement;
  let overlayEl: HTMLElement;
  let overlayVisible = false;
  let backdropVisible = false;
  let originalRect: DOMRect | null = null;
  let viewportWidth = 0;
  let viewportHeight = 0;

  async function openModal(event?: MouseEvent) {
    if (event) event.preventDefault();
    originalRect = cardEl.getBoundingClientRect();
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    overlayVisible = true;
    backdropVisible = true;
    await tick();
    if (overlayEl && originalRect) {
      overlayEl.style.top = `${originalRect.top}px`;
      overlayEl.style.left = `${originalRect.left}px`;
      overlayEl.style.width = `${originalRect.width}px`;
      overlayEl.style.height = `${originalRect.height}px`;
      // trigger layout
      overlayEl.getBoundingClientRect();
      const targetWidth = Math.min(960, viewportWidth - 32);
      const targetHeight = Math.min(Math.round(viewportHeight * 0.85), viewportHeight - 32);
      const targetTop = Math.max(16, Math.round((viewportHeight - targetHeight) / 2));
      const targetLeft = Math.max(16, Math.round((viewportWidth - targetWidth) / 2));
      overlayEl.style.top = `${targetTop}px`;
      overlayEl.style.left = `${targetLeft}px`;
      overlayEl.style.width = `${targetWidth}px`;
      overlayEl.style.height = `${targetHeight}px`;
    }
    showModal = true;
    if (!htmlContent && !isLoading) {
      await loadContent();
    }
  }

  async function loadContent() {
    try {
      isLoading = true;
      loadError = null;
      const res = await fetch(href);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const article = doc.querySelector('article');
      htmlContent = article ? article.innerHTML : text;
    } catch (err: any) {
      loadError = err?.message ?? 'Failed to load content';
    } finally {
      isLoading = false;
    }
  }

  function closeModal() {
    if (overlayEl && originalRect) {
      overlayEl.style.top = `${originalRect.top}px`;
      overlayEl.style.left = `${originalRect.left}px`;
      overlayEl.style.width = `${originalRect.width}px`;
      overlayEl.style.height = `${originalRect.height}px`;
    }
    showModal = false;
    setTimeout(() => {
      overlayVisible = false;
      backdropVisible = false;
    }, 200);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && !showModal) {
      e.preventDefault();
      openModal();
    }
  }
</script>

<div
  class="group relative"
  on:mouseenter={() => {
    if (!isTouchDevice) isHovering = true;
  }}
  on:mouseleave={() => {
    if (!isTouchDevice) isHovering = false;
  }}
  bind:this={cardEl}
>
  <!-- Ghost element to preserve space in the grid -->
  <div class="block p-4 rounded-lg bg-card border border-border select-none invisible">
    {#if images?.length}
      <div class="aspect-video w-full rounded-md bg-muted mb-3"></div>
    {/if}
    <div class="font-medium text-card-foreground">{title}</div>
    <div class="text-sm text-muted-foreground mb-3">{description}</div>
    <div class="space-y-2">
      {#if concept}
        <div class="border border-transparent rounded-md p-2 bg-secondary/30">
          <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary-foreground/80 mb-1 font-semibold">
            <i class="fa-solid fa-brain w-3 text-center"></i>
            <span>Concept</span>
          </h3>
          <p class="text-sm text-secondary-foreground/90 line-clamp-3">{concept}</p>
        </div>
      {/if}
    </div>
  </div>

  <a
    href={href}
    class="block p-4 rounded-lg bg-card border focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 will-change-transform overflow-hidden absolute top-0 left-0 w-full h-full"
    class:border-border={!isHovering}
    class:scale-[1.05]={isHovering}
    class:-translate-y-1={isHovering}
    class:shadow-2xl={isHovering}
    class:border-accent={isHovering}
    class:z-10={isHovering}
    on:click|preventDefault={openModal}
    tabindex="0"
    aria-label={`Open ${title}`}
  >
    {#if images?.length}
      <img src={images[0]} alt={title} class="aspect-video w-full object-cover rounded-md mb-3" />
    {/if}
    <div class="font-medium text-card-foreground">{title}</div>
    <div class="text-sm text-muted-foreground mb-3">{description}</div>

    <div class="space-y-2">
      {#if concept}
        <div class="border border-transparent rounded-md p-2 bg-secondary/30">
          <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary-foreground/80 mb-1 font-semibold">
            <i class="fa-solid fa-brain w-3 text-center"></i>
            <span>Concept</span>
          </h3>
          <p class="text-sm text-secondary-foreground/90 line-clamp-3">{concept}</p>
        </div>
      {/if}
    </div>

    <div
      class="text-xs text-muted-foreground transition-all duration-200 ease-out overflow-hidden"
      class:max-h-96={isHovering}
      class:opacity-100={isHovering}
      class:mt-3={isHovering}
      class:max-h-0={!isHovering}
      class:opacity-0={!isHovering}
      class:mt-0={!isHovering}
    >
      <div class="space-y-2 mt-2 pt-2 border-t border-border">
        {#if isHovering}
          {#if how}
            <div in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
              <div class="border border-transparent rounded-md p-2 bg-muted/40">
                <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                  <i class="fa-solid fa-gears w-3 text-center"></i>
                  <span>How it works</span>
                </h3>
                <p class="text-sm text-muted-foreground/90 line-clamp-3">{how}</p>
              </div>
            </div>
          {/if}
          {#if formula}
            <div in:fade={{ delay: 150, duration: 200 }} out:fade={{ duration: 100 }}>
              <div class="border border-transparent rounded-md p-2 bg-accent/20">
                <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-accent-foreground/80 mb-1 font-semibold">
                  <i class="fa-solid fa-calculator w-3 text-center"></i>
                  <span>Formula</span>
                </h3>
                <div class="text-accent-foreground/90 font-mono text-sm" bind:this={formulaEl}></div>
              </div>
            </div>
          {/if}
          {#if parameters?.length}
            <div in:fade={{ delay: 200, duration: 200 }} out:fade={{ duration: 100 }}>
              <div>
                <h3 class="flex items-center gap-2 text-muted-foreground uppercase tracking-wide text-[10px] mb-1 font-semibold">
                  <i class="fa-solid fa-sliders w-3 text-center"></i>
                  <span>Key Parameters</span>
                </h3>
                <div class="flex flex-wrap gap-1">
                  {#each parameters.slice(0, 6) as p}
                    <span class="rounded border border-border bg-secondary px-2 py-0.5 text-secondary-foreground text-xs">{@html p}</span>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
          {#if types?.length}
            <div in:fade={{ delay: 250, duration: 200 }} out:fade={{ duration: 100 }}>
              <div>
                <h3 class="flex items-center gap-2 text-muted-foreground uppercase tracking-wide text-[10px] mb-1 font-semibold">
                  <i class="fa-solid fa-tags w-3 text-center"></i>
                  <span>Types</span>
                </h3>
                <div class="flex flex-wrap gap-1">
                  {#each types.slice(0, 6) as t}
                    <span class="rounded border border-border bg-secondary px-2 py-0.5 text-secondary-foreground text-xs">{t}</span>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
          {#if images?.length > 1}
            <div in:fade={{ delay: 300, duration: 200 }} out:fade={{ duration: 100 }}>
              <div>
                <h3 class="flex items-center gap-2 text-muted-foreground uppercase tracking-wide text-[10px] mb-1 font-semibold">
                  <i class="fa-solid fa-images w-3 text-center"></i>
                  <span>Images</span>
                </h3>
                <div class="flex gap-2 overflow-hidden rounded-md">
                  {#each images.slice(1, 3) as img}
                    <img src={img} alt={title} class="h-16 w-auto rounded-sm border border-border" loading="lazy" />
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </a>

  {#if backdropVisible}
    <div class="fixed inset-0 z-40 bg-black/60" on:click={closeModal}></div>
  {/if}

  {#if overlayVisible}
    <div class="fixed z-50" bind:this={overlayEl} style="top:0;left:0;width:0;height:0;transition: all 200ms ease;">
      <div class="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-2xl">
        <div class="flex items-center justify-between border-b border-border p-4">
          <h2 class="text-lg font-semibold text-popover-foreground">{title}</h2>
          <button class="rounded px-2 py-1 text-muted-foreground hover:bg-accent" on:click={closeModal} aria-label="Close">✕</button>
        </div>
        <div class="prose max-w-none p-4 overflow-auto">
          {#if isLoading}
            <p class="text-muted-foreground">Loading…</p>
          {:else if loadError}
            <p class="text-red-400">{loadError}</p>
          {:else}
            <div class="article" this={undefined}>
              {@html htmlContent}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<svelte:window on:keydown={(e) => showModal && onKeyDown(e)} />

<style>
  /* Line clamp utility fallback if not present */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>


