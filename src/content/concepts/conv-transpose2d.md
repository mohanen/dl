---
title: "ConvTranspose2d"
description: "Learned upsampling via transposed 2D convolution."
category: "Convolutions"
keywords: ["ConvTranspose2d", "transposed convolution", "deconvolution", "upsampling"]
---

### The Concept

A transposed convolution performs a learned upsampling, increasing the height and width of a feature map. It's often called a "deconvolution" and is essential for tasks that need to generate high-resolution outputs, like image segmentation or generative models.

### How It Works

Instead of mapping a neighborhood of input pixels to a single output pixel, a transposed convolution maps a single input pixel to a neighborhood of output pixels. The `stride` controls the upsampling factor; for example, `stride=2` will roughly double the feature map's dimensions.

### Key Parameters

#### kernel_size / stride / padding / output_padding
- **What it is:** Parameters that control the upsampling process. `output_padding` is unique to this layer.
- **What it does:**
  - `stride`: The main upsampling factor. `stride=2` doubles the output size.
  - `output_padding`: Resolves size ambiguities, helping to achieve a precise output dimension.
- **When to use it:** For any task requiring learned upsampling. Use `stride=2` for 2x upsampling.

### Types of ConvTranspose2d

- Standard
- Grouped

### Mathematical Formulae

While the implementation is more complex, the relationship between input and output size can be described as:

$$
H_{out} = (H_{in} - 1) \times \text{stride}[0] - 2 \times \text{padding}[0] + \text{dilation}[0] \times (\text{kernel\_size}[0] - 1) + \text{output\_padding}[0] + 1
$$

A similar formula applies to the width.

### Code Example

```python
import torch.nn as nn
nn.ConvTranspose2d(64, 32, kernel_size=2, stride=2)
```

### Visualizing the Process

<img src="/dl/assets/conv-transpose2d.svg" alt="Transposed 2D Convolution" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
