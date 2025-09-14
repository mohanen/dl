---
title: "Functional Convolution APIs"
description: "Stateless convolution operations via torch.nn.functional."
category: "Convolutions"
keywords: ["torch.nn.functional", "F.conv2d", "F.conv1d", "F.conv3d"]
---

### The Concept

The `torch.nn.functional` API provides stateless convolution functions. Unlike `nn.ConvNd` layers, they don't store parameters (weights and biases). Instead, these parameters are passed as arguments on each call. This offers more flexibility for advanced models where weights are managed dynamically.

### How It Works

You call a function like `F.conv2d`, providing the input, weight, and bias tensors as arguments. The function is a pure, stateless operation; it's up to you to create and manage the weight tensors as `nn.Parameter`.

### Key Parameters

#### weight / bias tensors
- **What it is:** The learnable parameters, passed as function arguments.
- **What it does:** The `weight` tensor holds the filter values, and `bias` holds the offsets. You must manage these tensors yourself.
- **When to use it:** When you need direct, flexible control over the convolution's parameters.

#### stride / padding / dilation / groups
- **What it is:** The standard convolution configuration parameters.
- **What it does:** They behave identically to their layer-based counterparts.
- **When to use it:** Required to configure the convolution's geometry and behavior.

### Types of Functional Conv

- F.conv1d
- F.conv2d
- F.conv3d
- F.conv_transpose1d/2d/3d

### Mathematical Formulae

The underlying mathematical operation is identical to the module-based convolutions:

$$
\text{out} = \text{bias} + \sum (\text{weight} \star \text{input})
$$

The key difference is that `weight` and `bias` are provided as function arguments rather than being stored as internal state.

### Code Example

```python
import torch
import torch.nn.functional as F

x = torch.randn(1, 64, 56, 56)
w = torch.randn(128, 64, 3, 3)
y = F.conv2d(x, w, stride=1, padding=1)
```

### Visualizing the Process

<img src="/assets/convolutional-layer.svg" alt="Functional Convolution Operation" class="w-full h-auto mx-auto bg-muted/30 rounded-md p-4" />
