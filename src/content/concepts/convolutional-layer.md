---
title: "Convolutional Layer"
description: "A foundational building block of convolutional neural networks (CNNs)."
category: "Neural Networks"
keywords: ["CNN", "convolution", "feature map", "filter", "kernel"]
---

### The Concept

A convolutional layer is the core building block of a CNN. It uses a set of learnable filters (kernels) that slide over an input image or feature map to detect patterns like edges, corners, and textures. By sharing the same filter across different spatial locations, it can efficiently identify features regardless of where they appear.

### How It Works

The layer's kernel slides across the input's height and width, computing a dot product at each position. This process, known as cross-correlation, produces an output called a feature map. Each feature map highlights the locations where its corresponding filter detected a pattern. Key parameters like `stride` and `padding` control the kernel's movement and the output's spatial dimensions.

### Key Parameters

#### Kernel Size
- **What it is:** The height and width of the filter (e.g., 3x3).
- **What it does:** Defines the size of the local region (receptive field) the layer looks at to detect patterns.
- **When to use it:** A 3x3 kernel is a common and effective choice. Larger kernels can capture more distributed patterns but have more parameters.

#### Stride
- **What it is:** The step size the kernel takes as it slides across the input.
- **What it does:** A stride greater than 1 downsamples the feature map, reducing its spatial dimensions and computational cost.
- **When to use it:** Use a stride of 2 for efficient downsampling, often as an alternative to a pooling layer.

#### Padding
- **What it is:** A border of zeros added around the input feature map.
- **What it does:** Preserves the spatial dimensions of the input, preventing the feature map from shrinking after each convolution.
- **When to use it:** Use `padding='same'` (or manually calculate it) to maintain the height and width, which is crucial in deep networks.

#### Dilation
- **What it is:** The spacing between the elements in the kernel.
- **What it does:** Increases the kernel's receptive field without adding more parameters, allowing it to capture wider context.
- **When to use it:** Essential for tasks like semantic segmentation where a large field of view is needed without losing resolution.

### Types of Convolutional Layer

- Standard (groups=1)
- Grouped / Depthwise (groups=in_channels)
- Separable (depthwise + pointwise 1×1)
- Transposed convolution (learned upsampling)

### Mathematical Formulae

For 2D cross-correlation output at location $(i, j)$ and output channel $o$:

$$
y_{o,i,j} = b_o + \sum_{c} \sum_{u=0}^{k_h-1} \sum_{v=0}^{k_w-1} w_{o,c,u,v} \; x_{c,\, i+s_i u - p_i,\, j+s_j v - p_j}
$$

where `★` is the 2D cross-correlation operator.

### Code Example

```python
import torch
import torch.nn as nn

layer = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, padding=1)
x = torch.randn(1, 3, 224, 224)
y = layer(x)
# y.shape is torch.Size([1, 64, 224, 224])
```

### Visualizing the Process

<img src="/assets/convolutional-layer.svg" alt="Convolutional Layer" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
