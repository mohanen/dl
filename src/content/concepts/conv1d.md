---
title: "Conv1d"
description: "1D convolution layer for temporal signals and sequences."
category: "Convolutions"
keywords: ["Conv1d", "convolution", "1D", "temporal", "signal"]
---

### The Concept

A 1D convolution applies a filter across a sequence to detect temporal patterns. It's ideal for 1D data like audio, time-series, or text.

### How It Works

A kernel slides along the input sequence, computing a dot product at each step. This generates an output sequence where each point represents a detected local pattern.

### Key Parameters

#### in_channels / out_channels
- **What it is:** The number of input and output channels.
- **What it does:** `in_channels` is the depth of the input sequence (e.g., embedding size). `out_channels` is the number of filters, defining the output depth.
- **When to use it:** Always required to define the layer's dimensions.

#### kernel_size
- **What it is:** The length of the sliding filter.
- **What it does:** Defines the size of the local pattern the layer can detect.
- **When to use it:** Always required. Common sizes are 3, 5, or 7.

#### stride
- **What it is:** The step size of the kernel.
- **What it does:** A stride > 1 downsamples the sequence, reducing its length.
- **When to use it:** Use a stride > 1 for downsampling. Default is 1.

#### padding
- **What it is:** Zero-padding added to the sequence ends.
- **What it does:** Preserves the sequence length, preventing it from shrinking.
- **When to use it:** Use `padding='same'` to maintain the original length.

#### dilation
- **What it is:** Spacing between kernel elements.
- **What it does:** Expands the receptive field to capture wider patterns without more parameters.
- **When to use it:** For tasks needing long-range context, like speech generation.

#### groups
- **What it is:** Splits channels into groups for separate convolutions.
- **What it does:** Reduces parameters. If `groups=in_channels`, it becomes a depthwise convolution.
- **When to use it:** For building efficient models like MobileNets.

#### bias
- **What it is:** A learnable bias term.
- **What it does:** Adds a bias to each output channel. Can be disabled if using Batch Norm.
- **When to use it:** Enabled by default for extra model capacity.

### Types of Conv1d

- Standard
- Grouped / Depthwise (1D)
- Separable (depthwise + 1×1 pointwise)
- Dilated

### Mathematical Formulae

The 1D convolution operation for a single output channel is defined as:

$$
\text{out}(N_i, C_{\text{out}_j}) = \text{bias}(C_{\text{out}_j}) + \sum_{k=0}^{C_{\text{in}}-1} \text{weight}(C_{\text{out}_j}, k) \star \text{input}(N_i, k)
$$

where `★` is the 1D cross-correlation operator.

### Code Example

```python
import torch.nn as nn
layer = nn.Conv1d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1)
```

### Visualizing the Process

<img src="/dl/assets/conv1d.svg" alt="1D Convolution" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
