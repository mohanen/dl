---
title: "Depthwise Convolution"
description: "Channel-wise grouped convolution that reduces computation."
category: "Convolutions"
keywords: ["depthwise", "grouped", "MobileNet", "separable"]
---

### The Concept

A depthwise convolution is a highly efficient operation that applies a single filter to each input channel independently. It processes the spatial information within each channel but does not combine information across channels, which dramatically reduces computation.

### How It Works

This is achieved by setting `groups` equal to the number of `in_channels`. The layer applies a separate 2D filter to each input channel and stacks the results. The number of output channels must be the same as the number of input channels.

### Key Parameters

#### groups
- **What it is:** The number of channel groups. For depthwise, this must equal `in_channels`.
- **What it does:** Restricts each filter to a single input channel, enabling the channel-wise operation.
- **When to use it:** To build efficient models like MobileNets. It's the first step in a depthwise separable convolution.

### Types of Depthwise Convolution

- Depthwise
- Depthwise Separable (see Separable Convolution)

### Mathematical Formulae

A depthwise convolution is a standard convolution with the constraint that each output channel `j` is only connected to the input channel `j`. The formula is a simplified version of the standard convolution:

$$
\text{out}(N_i, C_j) = \text{bias}(C_j) + \text{weight}(C_j, 1) \star \text{input}(N_i, C_j)
$$

This is performed for each channel `j` from 0 to `C_in - 1`.

### Code Example

```python
import torch.nn as nn
nn.Conv2d(64, 64, kernel_size=3, padding=1, groups=64)
```

### Visualizing the Process

<img src="/assets/depthwise-convolution.svg" alt="Depthwise Convolution" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
