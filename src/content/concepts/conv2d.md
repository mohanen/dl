---
title: "Conv2d"
description: "2D convolution layer for images and feature maps."
category: "Convolutions"
keywords: ["Conv2d", "convolution", "2D", "image", "CNN"]
---

### The Concept

A 2D convolution is the core of a CNN, used to process 2D data like images. It slides a 2D filter (kernel) over an image to detect spatial patterns like edges and textures.

### How It Works

The layer applies a set of filters to a 2D input `(N, C_in, H_in, W_in)`. Each filter slides across the input's height and width, producing a 2D output map that highlights where its specific pattern was found.

### Key Parameters

#### in_channels / out_channels
- **What it is:** The number of input and output channels.
- **What it does:** Defines the depth of the input and output feature maps. `out_channels` is the number of filters applied.
- **When to use it:** Always required. Defines the layer's size.

#### kernel_size / stride / padding / dilation / groups / bias
- **What it is:** Core parameters that control the convolution's behavior in 2D.
- **What it does:**
  - `kernel_size`: Size of the filter (e.g., `(3, 3)`).
  - `stride`: Step size of the filter. Use `(2, 2)` to downsample.
  - `padding`: Adds a zero-border to preserve image size.
  - `dilation`: Expands the filter's view to capture wider context.
  - `groups`: Enables efficient grouped convolutions.
  - `bias`: Adds a learnable offset to the output.
- **When to use it:** To tune the CNN's architecture for feature extraction and efficiency.

### Types of Conv2d

- Standard
- Grouped / Depthwise
- Separable (depthwise + 1×1)
- Dilated
- Transposed (see ConvTranspose2d)

### Mathematical Formulae

The 2D convolution operation for a single output feature map is:

$$
\text{out}(N_i, C_{\text{out}_j}) = \text{bias}(C_{\text{out}_j}) + \sum_{k=0}^{C_{\text{in}}-1} \text{weight}(C_{\text{out}_j}, k) \star \text{input}(N_i, k)
$$

where `★` is the 2D cross-correlation operator.

### Code Example

```python
import torch.nn as nn
nn.Conv2d(3, 64, kernel_size=3, stride=1, padding=1)
```

### Visualizing the Process

<img src="/assets/conv2d.svg" alt="2D Convolution" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
