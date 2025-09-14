---
title: "Conv3d"
description: "3D convolution layer for video and volumetric data."
category: "Convolutions"
keywords: ["Conv3d", "convolution", "3D", "video", "volumetric"]
---

### The Concept

A 3D convolution applies a 3D filter to a volume of data, allowing it to capture both spatial and temporal patterns. It's ideal for 3D data like videos or medical scans.

### How It Works

A 3D kernel slides across the input volume's depth, height, and width, computing a dot product at each position. This produces a 3D output volume that represents detected spatio-temporal features.

### Key Parameters

#### in_channels / out_channels / kernel_size / stride / padding / dilation / groups / bias
- **What it is:** These parameters control the convolution's behavior in three dimensions.
- **What it does:**
  - `kernel_size`: The 3D size of the filter (e.g., `(3, 3, 3)`).
  - `stride`: The step size in each of the three dimensions.
  - `padding`: Adds a zero-border to the 3D volume to preserve its size.
- **When to use it:** For tasks involving volumetric data, such as action recognition in videos or analysis of medical scans.

### Types of Conv3d

- Standard
- Grouped / Depthwise
- Dilated
- Transposed (see ConvTranspose3d)

### Mathematical Formulae

The 3D convolution operation is a direct extension of the 2D version:

$$
\text{out}(N_i, C_{\text{out}_j}) = \text{bias}(C_{\text{out}_j}) + \sum_{k=0}^{C_{\text{in}}-1} \text{weight}(C_{\text{out}_j}, k) \star \text{input}(N_i, k)
$$

where `★` is the 3D cross-correlation operator.

### Code Example

```python
import torch.nn as nn
nn.Conv3d(3, 64, kernel_size=3, stride=1, padding=1)
```

### Visualizing the Process

<img src="/dl/assets/conv3d.svg" alt="3D Convolution" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
