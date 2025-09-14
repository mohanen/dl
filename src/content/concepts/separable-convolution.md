---
title: "Separable Convolution"
description: "Depthwise followed by pointwise 1×1 convolution."
category: "Convolutions"
keywords: ["separable", "depthwise", "pointwise", "1x1", "MobileNet"]
---

### The Concept

A depthwise separable convolution is a highly efficient layer that splits a standard convolution into two parts:
1.  **A Depthwise Convolution:** Filters each input channel spatially, but separately.
2.  **A Pointwise Convolution:** A `1x1` convolution that combines the outputs from the depthwise step.

This factorization dramatically reduces parameters and computation, making it ideal for mobile and edge devices.

### How It Works

First, a depthwise convolution (`groups=in_channels`) performs spatial filtering on each channel. Second, a `1x1` pointwise convolution is applied to mix the channel information and produce the final output features.

### Key Parameters

#### depthwise kernel / pointwise 1×1
- **What it is:** The two-part structure of the layer.
- **What it does:** The depthwise kernel handles spatial filtering per channel, while the pointwise (`1x1`) kernel handles cross-channel mixing.
- **When to use it:** To build computationally efficient models like MobileNets.

### Types of Separable Convolution

- Spatial separable
- Depthwise separable

### Mathematical Formulae

A standard convolution requires a computational cost of approximately:
$$ D_K \cdot D_K \cdot M \cdot N \cdot D_F \cdot D_F $$
A depthwise separable convolution has a cost of:
$$ (D_K \cdot D_K \cdot M \cdot D_F \cdot D_F) + (M \cdot N \cdot D_F \cdot D_F) $$
where the kernel is `D_K x D_K`, the input map is `D_F x D_F`, `M` is input channels, and `N` is output channels. This factorization leads to a significant reduction in computation.

### Code Example

```python
import torch.nn as nn
nn.Sequential(
  nn.Conv2d(64, 64, kernel_size=3, padding=1, groups=64),  # depthwise
  nn.Conv2d(64, 128, kernel_size=1)  # pointwise
)
```

### Visualizing the Process

<img src="/dl/assets/separable-convolution.svg" alt="Separable Convolution" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
