<script lang="ts">
  import { tick, afterUpdate } from 'svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import katex from 'katex';
  import { Brain, Cog, Calculator, SlidersHorizontal, Tags, Images, CheckCircle } from 'lucide-svelte';
  const contentCache: Map<string, string> = new Map();
  // Base URL for assets (matches BaseLayout logic)
  const BASE = (import.meta.env.BASE_URL && import.meta.env.BASE_URL.endsWith('/'))
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL || ''}/`;
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
  let modalFormulaEl: HTMLElement;

  onMount(() => {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Hide placeholder immediately if the cover image is already cached
    try {
      if (cardImgEl && cardImgEl.complete) {
        cardImgLoaded = true;
      }
    } catch {}
    // Prefetch when card enters viewport
    try {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!htmlContent && !isLoading) prefetchContent();
            observer.disconnect();
          }
        });
      }, { rootMargin: '200px' });
      if (cardEl) observer.observe(cardEl);
    } catch {}
  });
  
  afterUpdate(() => {
    if (formula) {
      if (modalFormulaEl) {
        try {
          katex.render(formula, modalFormulaEl, {
            throwOnError: false,
            displayMode: true
          });
        } catch (e) {
          console.error(e);
          modalFormulaEl.textContent = `$$${formula}$$`; // Fallback
        }
      }
    }
  });

  let showModal = false;
  let isLoading = false;
  let loadError: string | null = null;
  let htmlContent = '';
  let isReady = false;
  let cardImgLoaded = false;
  let cardImgEl: HTMLImageElement | null = null;

  let cardEl: HTMLElement;
  let overlayEl: HTMLElement;
  let closeBtnEl: HTMLButtonElement;
  let overlayVisible = false;
  let backdropVisible = false;
  let originalRect: DOMRect | null = null;
  let viewportWidth = 0;
  let viewportHeight = 0;
  let previouslyFocusedEl: HTMLElement | null = null;
  let inertedEls: Element[] = [];
  let previousBodyOverflow = '';
  let previousBodyPaddingRight = '';

  async function openModal(event?: MouseEvent) {
    if (event) event.preventDefault();
    previouslyFocusedEl = (document.activeElement as HTMLElement) ?? null;
    originalRect = cardEl.getBoundingClientRect();
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    overlayVisible = true;
    backdropVisible = true;
    await tick();
    if (overlayEl && originalRect) {
      // 1) Set to card rect without transition so it appears to originate from the card
      const prevTransition = overlayEl.style.transition;
      overlayEl.style.transition = 'none';
      overlayEl.style.top = `${originalRect.top}px`;
      overlayEl.style.left = `${originalRect.left}px`;
      overlayEl.style.width = `${originalRect.width}px`;
      overlayEl.style.height = `${originalRect.height}px`;
      // Force style flush
      overlayEl.getBoundingClientRect();
      // 2) Enable transition and expand to target size/position
      overlayEl.style.transition = prevTransition || 'all 200ms ease';
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
    // Scroll lock and inert background
    try {
      previousBodyOverflow = document.body.style.overflow;
      previousBodyPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
      inertedEls = Array.from(document.body.children).filter((el) => !el.contains(overlayEl));
      inertedEls.forEach((el) => {
        (el as any).inert = true;
        el.setAttribute('aria-hidden', 'true');
      });
    } catch {}

    await tick();
    if (closeBtnEl) closeBtnEl.focus();
    if (!htmlContent && !isLoading) {
      await loadContent();
    }
  }

  async function loadContent() {
    try {
      isLoading = true;
      loadError = null;
      if (contentCache.has(href)) {
        htmlContent = contentCache.get(href) as string;
        isReady = !!htmlContent;
      } else {
        const res = await fetch(href);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const article = doc.querySelector('article');
        htmlContent = article ? article.innerHTML : text;
        contentCache.set(href, htmlContent);
        isReady = true;
      }
    } catch (err: any) {
      loadError = err?.message ?? 'Failed to load content';
    } finally {
      isLoading = false;
    }
  }

  async function prefetchContent() {
    try {
      if (htmlContent || isLoading) return;
      isLoading = true;
      if (contentCache.has(href)) {
        htmlContent = contentCache.get(href) as string;
        isReady = !!htmlContent;
      } else {
        const res = await fetch(href, { method: 'GET' });
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const article = doc.querySelector('article');
        htmlContent = article ? article.innerHTML : text;
        contentCache.set(href, htmlContent);
        isReady = true;
      }
    } catch {
      // ignore prefetch errors
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
      // Restore scroll and background
      try {
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.paddingRight = previousBodyPaddingRight;
        inertedEls.forEach((el) => {
          (el as any).inert = false;
          el.removeAttribute('aria-hidden');
        });
        inertedEls = [];
        if (previouslyFocusedEl) previouslyFocusedEl.focus();
      } catch {}
    }, 200);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && !showModal) {
      e.preventDefault();
      openModal();
    }
  }

  // Reveal cached or loaded images (used in modal gallery)
  function revealOnLoad(node: HTMLImageElement) {
    const reveal = () => {
      node.classList.remove('animate-pulse', 'bg-muted', 'opacity-0');
      node.classList.add('opacity-100', 'transition-opacity', 'duration-300');
    };
    if (node.complete) {
      reveal();
    } else {
      const onLoad = () => reveal();
      const onError = () => reveal();
      node.addEventListener('load', onLoad, { once: true });
      node.addEventListener('error', onError, { once: true });
      return {
        destroy() {
          node.removeEventListener('load', onLoad);
          node.removeEventListener('error', onError);
        }
      };
    }
    return { destroy() {} };
  }
</script>

<div
  class="group relative"
  role="button"
  tabindex="0"
  aria-label={title}
  on:mouseenter={() => {
    if (!isTouchDevice) isHovering = true;
  }}
  on:mouseleave={() => {
    if (!isTouchDevice) isHovering = false;
  }}
  bind:this={cardEl}
>
  <!-- Ghost element to preserve space in the grid -->
  <div class="block p-5 rounded-lg bg-card border border-border select-none invisible min-h-64 md:min-h-72">
    {#if images?.length}
      <div class="aspect-video w-full rounded-md bg-muted mb-3"></div>
    {/if}
    <div class="font-medium text-card-foreground">{title}</div>
    <div class="text-sm text-card-foreground mb-3">{description}</div>
    <div class="space-y-2">
      {#if concept}
        <div class="border border-border rounded-md p-2 bg-muted">
          <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-card-foreground mb-1 font-semibold">
            <Brain class="w-3 h-3" />
            <span>Concept</span>
          </h3>
          <p class="text-sm text-card-foreground line-clamp-3">{concept}</p>
        </div>
      {/if}
      {#if how}
        <div class="border border-border rounded-md p-2 bg-muted">
          <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-card-foreground mb-1 font-semibold">
            <Cog class="w-3 h-3" />
            <span>How it works</span>
          </h3>
          <p class="text-sm text-card-foreground line-clamp-3">{how}</p>
        </div>
      {/if}
    </div>
  </div>

  <a
    href={href}
    class="block p-5 rounded-lg bg-card border no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-200 will-change-transform overflow-hidden absolute top-0 left-0 w-full h-full"
    class:border-border={!isHovering}
    class:ring-2={isHovering}
    class:ring-accent={isHovering}
    class:shadow-s-2={isHovering}
    class:z-10={isHovering}
    on:click|preventDefault={openModal}
    on:mouseenter={() => { if (!htmlContent && !isLoading) prefetchContent(); }}
    on:focus={() => { if (!htmlContent && !isLoading) prefetchContent(); }}
    tabindex="0"
    aria-label={`Open ${title}`}
  >
    <div class="relative h-full flex flex-col pb-16">
      {#if images?.length}
        <div class="mb-3">
          <div class="relative w-full aspect-video overflow-hidden rounded-md">
            {#if !cardImgLoaded}
              <div class="absolute inset-0 bg-muted animate-pulse"></div>
            {/if}
            <img bind:this={cardImgEl} src={images[0]} alt={title} class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300" loading="lazy" decoding="async" fetchpriority="low"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" on:load={() => { cardImgLoaded = true; }} />
          </div>
        </div>
      {/if}
      <div class="flex items-center justify-between gap-2">
        <div class="font-medium text-card-foreground">{title}</div>
        {#if isReady}
          <div class="flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 text-[10px] shadow" aria-label="Ready to view" title="Ready to view">
            <CheckCircle class="w-3 h-3" />
            <span>Ready</span>
          </div>
        {/if}
      </div>
      <div class="text-sm text-card-foreground mb-3">{description}</div>

      <div class="space-y-2">
        {#if concept}
          <div class="border border-border rounded-md p-2 bg-muted">
            <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-card-foreground mb-1 font-semibold">
              <Brain class="w-3 h-3" />
              <span>Concept</span>
            </h3>
            <p class="text-sm text-card-foreground line-clamp-3">{concept}</p>
          </div>
        {/if}
        {#if how}
          <div class="border border-border rounded-md p-2 bg-muted">
            <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-card-foreground mb-1 font-semibold">
              <Cog class="w-3 h-3" />
              <span>How it works</span>
            </h3>
            <p class="text-sm text-card-foreground line-clamp-3">{how}</p>
          </div>
        {/if}
      </div>

      
      
    </div>
  </a>

  {#if backdropVisible}
    <div class="fixed inset-0 z-40 bg-black/60" role="button" tabindex="0" on:click={closeModal} on:keydown={(e) => e.key === 'Escape' && closeModal()}></div>
  {/if}

  {#if overlayVisible}
    <div class="fixed z-50" bind:this={overlayEl} style="top:0;left:0;width:0;height:0;transition: all 200ms ease;" role="dialog" aria-modal="true" aria-label={`${title} dialog`}>
      <div class="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-2xl">
        <div class="flex items-center justify-between border-b border-border p-4">
          <h2 class="text-lg font-semibold text-popover-foreground">{title}</h2>
          <button class="rounded px-2 py-1 text-muted-foreground hover:bg-accent" on:click={closeModal} aria-label="Close" bind:this={closeBtnEl}>✕</button>
        </div>
        <div class="p-4 overflow-auto">
          {#if isLoading}
            <div class="min-h-40 flex items-center justify-center">
              <div class="preloader-content" aria-label="Loading" role="status">
                <img src={`${BASE}favicon.svg`} alt="" aria-hidden="true" class="preloader-icon" />
                <div class="preloader-spinner" aria-hidden="true"></div>
              </div>
            </div>
          {:else if loadError}
            <p class="text-red-400">{loadError}</p>
          {:else}
            <div class="grid gap-3 md:grid-cols-2">
              {#if concept}
                <section class="rounded-md border border-border bg-muted/40 p-3">
                  <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-popover-foreground mb-1 font-semibold">
                    <Brain class="w-4 h-4" />
                    <span>Concept</span>
                  </h3>
                  <div class="text-sm text-popover-foreground">{concept}</div>
                </section>
              {/if}

              {#if how}
                <section class="rounded-md border border-border bg-muted/40 p-3">
                  <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                    <Cog class="w-4 h-4" />
                    <span>How it works</span>
                  </h3>
                  <div class="text-sm text-muted-foreground/90">{how}</div>
                </section>
              {/if}

              {#if parameters?.length}
                <section class="rounded-md border border-border bg-background p-3">
                  <h3 class="flex items-center gap-2 text-[10px] uppercase tracking-wide text-muted-foreground mb-1 font-semibold">
                    <SlidersHorizontal class="w-4 h-4" />
                    <span>Key Parameters</span>
                  </h3>
                  <div class="flex flex-wrap gap-1">
                    {#each parameters as p}
                      <span class="rounded border border-border bg-secondary px-2 py-0.5 text-secondary-foreground text-xs">{@html p}</span>
                    {/each}
                  </div>
                </section>
              {/if}

              {#if types?.length}
                <section class="rounded-md border border-border bg-background p-3">
                  <h3 class="flex items-center gap-2 text-[10px] uppercase tracking-wide text-muted-foreground mb-1 font-semibold">
                    <Tags class="w-4 h-4" />
                    <span>Types</span>
                  </h3>
                  <div class="flex flex-wrap gap-1">
                    {#each types as t}
                      <span class="rounded border border-border bg-secondary px-2 py-0.5 text-secondary-foreground text-xs">{t}</span>
                    {/each}
                  </div>
                </section>
              {/if}

              {#if formula}
                <section class="rounded-md border border-border bg-accent/20 p-3 md:col-span-2">
                  <h3 class="flex items-center gap-2 text-xs uppercase tracking-wider text-popover-foreground mb-1 font-semibold">
                    <Calculator class="w-4 h-4" />
                    <span>Formula</span>
                  </h3>
                  <div class="text-popover-foreground font-mono text-sm" bind:this={modalFormulaEl}></div>
                </section>
              {/if}

              {#if images?.length}
                <section class="rounded-md border border-border bg-background p-3 md:col-span-2">
                  <h3 class="flex items-center gap-2 text-[10px] uppercase tracking-wide text-muted-foreground mb-1 font-semibold">
                    <Images class="w-4 h-4" />
                    <span>Images</span>
                  </h3>
                  <div class="flex gap-2 overflow-x-auto rounded-md">
                    {#each images as img}
                      <img use:revealOnLoad src={img} alt={title} class="h-64 w-auto rounded-sm border border-border bg-muted opacity-0 animate-pulse" loading="lazy" decoding="async" fetchpriority="low" />
                    {/each}
                  </div>
                </section>
              {/if}
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
    line-clamp: 3;
  }
</style>


