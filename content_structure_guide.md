Content Structure Guide for Deep Learning Cheatsheet
This guide defines the required structure and syntax for all content files in the `src/content/concepts/` directory. It reflects exactly what our components and content schema consume (see `src/content/config.ts`). Following these rules ensures consistent rendering, proper search indexing, and a maintainable codebase.

1. Frontmatter (YAML)
Every markdown file must begin with a YAML frontmatter block. Our content collection (`defineCollection`) requires these fields and types:

- title (string, required): Human-readable name of the concept (e.g., "Gradient Descent").
- description (string, required): A concise, one-sentence summary.
- category (string, required): Top-level grouping (e.g., "Optimization", "Convolutions"). Used for navigation and filtering.
- keywords (string[], required): One or more relevant terms used for search.

Example:

---
title: "Convolutional Layer"
description: "A foundational building block of convolutional neural networks (CNNs)."
category: "Neural Networks"
keywords: ["CNN", "convolution", "feature map", "filter", "kernel"]
---

2. Content Body Hierarchy
Use a consistent hierarchy of headings. The UI extracts specific sections to power the concept cards, so please use these exact headings:

Main Sections (###):

- The Concept — Short prose overview. Displayed on the card under "Concept".
- How It Works — Brief mechanics. Displayed on the card under "How it works".
- Key Parameters — Use #### sub-headings for parameter names. The card shows the parameter names as tags (not the descriptions).
- Types of [Concept Name] or Types — Bullet list (e.g., "Standard", "Dilated"). Items are shown as tags on the card.
- Mathematical Formulae (optional) — The first block equation (`$$ ... $$`) anywhere in the page is rendered as the card's formula.
- Code Example (optional)
- Visualizing the Process (optional) — Diagrams, images, or animations.

Sub-sections (####): Under "Key Parameters", define one parameter per #### heading. Recommended per-parameter bullets:

- **What it is:** Concise definition.
- **What it does:** Function or effect.
- **When to use it:** Practical guidance and common use cases.

3. Syntax Rules for Technical Content
To ensure correct rendering and extraction, use the following conventions.

Mathematical Notation (KaTeX)

- Inline equations: wrap with single dollar signs $.
  - Correct: The learning rate is denoted as $\alpha$.
  - Incorrect: The learning rate is denoted as \alpha.
- Block equations: wrap with double dollar signs $$ on their own lines.
  - Correct: The formula is $$E=mc^2$$
  - Incorrect: The formula is \\[E=mc^2\\]

Code Snippets (Shiki)

- Use fenced code blocks with a language tag (e.g., `python`, `js`) for syntax highlighting.
  - Example:

```python
def relu(x):
    return max(0, x)
```

Images & Diagrams

- Place static images/SVGs in `public/assets/`.
- Use absolute paths that include the site base (this project deploys at `/dl/`).
  - Preferred src: `/dl/assets/your-diagram.svg`
- You may use Markdown images or HTML `<img>` tags. Both are supported by the UI.
  - Markdown: `![Descriptive alt text](/dl/assets/your-diagram.svg)`
  - HTML: `<img src="/dl/assets/your-diagram.svg" alt="Descriptive alt" class="w-full h-auto mx-auto" />`

4. Troubleshooting and Validation
- Missing frontmatter: Files without required fields will fail the `astro:content` schema. Check for `---` delimiters and required keys.
- KaTeX: If a formula fails to render, check escaping (e.g., `\alpha`) and delimiters. The first `$$...$$` block is used on cards.
- Images: Use `/dl/assets/...` and place files in `public/assets/`. If your deployment base changes, update existing content accordingly.
- Validate locally: run `npm run dev` and check the index and detail pages. Confirm that the card shows Concept, How it works, parameters, types, and (if present) a formula and image.

5. Starter Template

Use this template for new concept pages:

```
---
title: "Your Concept"
description: "One-sentence purpose of the concept."
category: "Your Category"
keywords: ["term1", "term2"]
---

### The Concept

High-level description in 2–4 sentences.

### How It Works

Brief mechanics and intuition.

### Key Parameters

#### parameter_one
- **What it is:** ...
- **What it does:** ...
- **When to use it:** ...

#### parameter_two
- **What it is:** ...
- **What it does:** ...
- **When to use it:** ...

### Types of Your Concept

- Standard
- Variant A
- Variant B

### Mathematical Formulae

$$
% Your primary formula here
$$

### Code Example

```python
# Minimal, runnable example
```

### Visualizing the Process

![Alt text](/dl/assets/your-diagram.svg)
```

6. Author Checklist

- Frontmatter includes `title`, `description`, `category`, and non-empty `keywords`.
- Headings use exact names: `The Concept`, `How It Works`, `Key Parameters`, and `Types of [Concept Name]` or `Types`.
- Each parameter is a #### heading; bullets include "What it is/does/when to use".
- At least one `$$...$$` block present if a formula is relevant.
- Images live in `public/assets/` and are referenced as `/dl/assets/...`.
- Open the site locally and confirm the card shows Concept, How it works, parameters, types, and (if present) formula and image.