Content Structure Guide for Deep Learning Cheatsheet
This guide defines the required structure and syntax for all content files in the src/content/concepts/ directory. Following these rules ensures consistent rendering, proper search indexing, and a maintainable codebase.

1. Frontmatter (YAML)
Every markdown file must begin with a YAML frontmatter block. This block provides essential metadata for the page.

title (string, required): The main title of the concept (e.g., "Gradient Descent").

description (string, required): A brief, one-sentence summary of the concept.

category (string, required): The high-level category for the concept (e.g., "Optimization", "Neural Networks"). This is used for grouping and navigation.

keywords (array of strings, required): A list of relevant terms for search indexing.

Example:

---
title: "Convolutional Layer"
description: "A foundational building block of convolutional neural networks (CNNs)."
category: "Neural Networks"
keywords: ["CNN", "convolution", "feature map", "filter", "kernel"]
---

2. Content Body Hierarchy
The content body should be structured using a consistent hierarchy of headings. Use a logical flow from a high-level overview to detailed parameters and examples.

Main Sections (###): Use three hash marks (###) for top-level sections. Recommended section titles are:

The Concept

How It Works

Key Parameters

Types of [Concept Name]

Mathematical Formulae

Code Example

Visualizing the Process

Sub-sections (####): Use four hash marks (####) for sub-sections, most commonly for individual parameters or types. For each parameter, provide a consistent set of bullet points:

**What it is:** A concise definition.

**What it does:** The function or effect of the parameter.

**When to use it:** Practical advice on its application and common use cases.

3. Syntax Rules for Technical Content
To ensure perfect rendering of technical content, adhere to these syntax rules.

Mathematical Notation (KaTeX)

Inline Equations: Use single dollar signs $ to enclose inline equations.

Correct: The learning rate is denoted as $\alpha$.

Incorrect: The learning rate is denoted as \alpha.

Block Equations: Use double dollar signs $$ for equations that need to be on their own line.

Correct: The formula is $$E=mc^2$$

Incorrect: The formula is \\[E=mc^2\\]

Code Snippets (Shiki)

Use fenced code blocks with the language specified after the backticks (e.g., python, js). This enables correct syntax highlighting.

Correct:

```python
def relu(x):
    return max(0, x)
```

SVG Diagrams

To ensure SVGs are correctly optimized by Astro's asset pipeline, use a standard HTML <img> tag and place the SVG file in the src/assets/ directory.

Use the alt attribute for accessibility and the class attribute for Tailwind styling.

Correct: <img src="/path/to/your-diagram.svg" alt="A descriptive alt text." class="w-full h-auto mx-auto" />

4. Troubleshooting and Validation
Missing Frontmatter: Pages without a valid frontmatter block will not be processed correctly by Astro's content collections. Always double-check for the --- delimiters and required keys.

KaTeX Errors: If an equation fails to render, check for missing backslashes or incorrect syntax. The build log will often provide a specific error message.

Broken Images: Ensure the file path to your SVG is correct and that the SVG file exists in the specified directory.

Validation: It is highly recommended to run the local development server (npm run dev) after adding or editing content to visually confirm that everything is rendering as expected.