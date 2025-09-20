---
category: "Convolutions"
---

## Conv1d
![Conv1d](/dl/assets/conv1d.svg)

### Desc
- 1D convolution for temporal signals and sequences
- Slides a kernel along the sequence to detect local patterns

### Parameters
- in_channels / out_channels: input/output channels count
- kernel_size: filter length
- stride: step size along sequence
- padding: zeros added to both ends
- dilation: spacing between kernel elements
- groups: channel grouping (depthwise if = in_channels)
- bias: add learnable offset

## Conv2d
![Conv2d](/dl/assets/conv2d.svg)

### Desc
- 2D convolution for images and feature maps
- Applies learned filters to detect spatial patterns (edges, textures)

### Parameters
- in_channels / out_channels: input/output channels count
- kernel_size: filter size (e.g., 3×3)
- stride: step size; >1 downsamples
- padding: preserves spatial size
- dilation: expands receptive field
- groups: grouped/depthwise conv
- bias: add learnable offset

## Conv3d
![Conv3d](/dl/assets/conv3d.svg)

### Desc
- 3D convolution for video and volumetric data
- Captures spatio‑temporal features across depth, height, and width

### Parameters
- in_channels / out_channels: input/output channels count
- kernel_size: 3D filter size (e.g., 3×3×3)
- stride: step size per dimension
- padding: preserve volume size
- dilation: enlarge receptive field
- groups: grouped/depthwise conv
- bias: add learnable offset

## ConvTranspose2d
![ConvTranspose2d](/dl/assets/conv-transpose2d.svg)

### Desc
- Learned upsampling via transposed (fractionally‑strided) convolution
- Commonly used in decoders and generative models

### Parameters
- kernel_size: filter size
- stride: upsampling factor
- padding: input padding
- output_padding: resolve size ambiguity

## Depthwise Convolution
![Depthwise Convolution](/dl/assets/depthwise-convolution.svg)

### Desc
- Channel‑wise grouped convolution (groups = in_channels)
- Efficient spatial filtering per channel; key part of MobileNets

### Parameters
- groups: set to in_channels (one filter per channel)
- kernel_size: spatial filter size
- stride: step size
- padding: preserve spatial size
- dilation: enlarge receptive field

## Separable Convolution
![Separable Convolution](/dl/assets/separable-convolution.svg)

### Desc
- Depthwise convolution followed by 1×1 pointwise convolution
- Reduces computation and parameters vs. standard convolution

### Parameters
- depthwise kernel: per‑channel spatial filter
- pointwise 1×1: channel mixing

## Functional Convolution APIs
![Functional Convolution](/dl/assets/convolutional-layer.svg)

### Desc
- Stateless convolution functions under torch.nn.functional
- Weights/bias passed as arguments (not stored in a module)

### Parameters
- weight / bias tensors: parameters passed as args
- stride: step size
- padding: input padding
- dilation: spacing in kernel
- groups: channel grouping


