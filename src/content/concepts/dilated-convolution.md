---
title: "Dilated Convolution"
description: "Expand receptive field without increasing parameters using dilation."
category: "Convolutions"
keywords: ["dilation", "atrous", "receptive field", "Conv2d", "Conv1d"]
---

### The Concept

A dilated convolution, or atrous convolution, introduces gaps into a filter to expand its view of the input. This allows it to capture a larger context (a wider receptive field) without increasing its parameters or computational cost, which is crucial for dense prediction tasks.

### How It Works

This is implemented by setting the `dilation` parameter to a value greater than 1. This creates a filter where the elements are spaced apart, allowing it to sample from a wider area of the input while maintaining the same number of weights.

### Key Parameters

#### dilation
- **What it is:** The spacing between the elements in the filter.
- **What it does:** Controls the size of the receptive field. `dilation=1` is a standard convolution. A larger value expands the field of view.
- **When to use it:** For tasks needing a large receptive field without downsampling, like semantic segmentation or speech synthesis.

### Types of Dilated Convolution

- 1D / 2D / 3D

### Mathematical Formulae

The effective kernel size of a dilated convolution can be calculated as:

$$
k_{\text{eff}} = k + (k - 1) \times (\text{dilation} - 1)
$$

where `k` is the original kernel size. The operation itself is a standard cross-correlation, but applied to a sparsely sampled input.

### Code Example

```python
import torch.nn as nn
nn.Conv2d(64, 64, kernel_size=3, dilation=2, padding=2)
```

### Visualizing the Process

<img src="/dl/assets/dilated-convolution.svg" alt="Dilated Convolution" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
