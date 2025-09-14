## 🗒️ Deep Learning Concepts Cheat Sheet

### Model Building Blocks

  - [ ] Parameters & Initialization
      - [ ] Concepts: fan-in/out, Xavier/He init, bias init, frozen params
      - [ ] Types:  fan-in/out, Xavier/He init, bias init, frozen params
  - [ ] Linear & Embeddings
      - [ ] Concepts: affine maps, bias handling, feature flattening, categorical lookup
      - [ ] Types: `Linear`, `Bilinear`, `Flatten`, `Unflatten`, `Identity`, `Embedding`, `EmbeddingBag`
  - [ ] Activations
      - [ ] Concepts: non-linearity choice, smooth vs piecewise, saturation
      - [ ] Types: `ReLU`, `LeakyReLU`, `PReLU`, `RReLU`, `ELU`, `CELU`, `SELU`, `GELU`, `SiLU`, `Mish`, `Tanh`, `Sigmoid`, `Softplus`, `Softsign`, `Hardshrink`, `Softshrink`, `Tanhshrink`, `Hardsigmoid`, `Hardswish`, `Hardtanh`, `Softmax`, `LogSoftmax`, `GLU`
  - [ ] Normalization
      - [ ] Concepts: batch vs layer vs group vs instance normalization
      - [ ] Types: `BatchNorm1d/2d/3d`, `SyncBatchNorm`, `LayerNorm`, `GroupNorm`, `InstanceNorm*`, `LocalResponseNorm`
  - [ ] Convolutions
      - [ ] Concepts: kernel/stride/padding/dilation, groups (grouped/depthwise), transpose conv, receptive field
      - [ ] Types: `Conv1d/2d/3d`, `ConvTranspose1d/2d/3d`, `LazyConv1d/2d/3d`; dilation via `dilation=`, groups/depthwise via `groups=`, separable via depthwise + `Conv1x1`; functional: `F.conv1d/2d/3d`, `F.conv_transpose1d/2d/3d`
  - [ ] Padding
      - [ ] Concepts: explicit vs implicit padding, border modes
      - [ ] Types: `ZeroPad2d`, `ConstantPad1d/2d/3d`, `ReflectionPad1d/2d`, `ReplicationPad1d/2d/3d`, `CircularPad1d/2d/3d`, `torch.nn.functional.pad`
  - [ ] Unfold/Fold (im2col/col2im)
      - [ ] Concepts: lowering to matrix multiply, reconstructing
      - [ ] Types: `Unfold`, `Fold`
  - [ ] Pooling & Unpooling
      - [ ] Concepts: downsampling types, adaptive pooling, fractional pooling, unpooling with indices
      - [ ] Types: `MaxPool1d/2d/3d`, `AvgPool1d/2d/3d`, `LPPool1d/2d`, `AdaptiveAvgPool1d/2d/3d`, `AdaptiveMaxPool1d/2d/3d`, `FractionalMaxPool2d/3d`, `MaxUnpool1d/2d/3d`
  - [ ] Upsampling & Pixel operations
      - [ ] Concepts: nearest/bilinear/bicubic interpolation, sub-pixel convolutions
      - [ ] Types: `Upsample`/`torch.nn.functional.interpolate`, `PixelShuffle`, `PixelUnshuffle`
  - [ ] Dropout Variants
      - [ ] Concepts: feature-wise dropout for channels, self-normalizing nets
      - [ ] Types: `Dropout`, `Dropout2d`, `Dropout3d`, `AlphaDropout`, `FeatureAlphaDropout`
  - [ ] Containers & Composition
      - [ ] Concepts: composing layers, parameter and module collections
      - [ ] Types: `Sequential`, `ModuleList`, `ModuleDict`, `ParameterList`, `ParameterDict`
  - [ ] Recurrent & Sequence Models
      - [ ] Concepts: sequence packing, hidden state management, vanishing/exploding gradients
      - [ ] Types: `RNN` (tanh/relu), `LSTM`, `GRU` (uni/bi-directional, stacked), cells: `RNNCell`, `LSTMCell`, `GRUCell`, `pack_padded_sequence`, `pad_packed_sequence`, `pad_sequence`, `pack_sequence`, `PackedSequence`
  - [ ] Attention & Transformers
      - [ ] Concepts: scaled dot-product attention, multi-head, encoder/decoder, masking
      - [ ] Types: `MultiheadAttention`, `Transformer*`, `F.scaled_dot_product_attention`

### Training Mechanics

  - [ ] Loss Functions
      - [ ] Concepts: objective choice, logits vs probabilities, class imbalance, label smoothing
      - [ ] Types: `CrossEntropyLoss(label_smoothing=...)`, `NLLLoss`, `BCEWithLogitsLoss`, `BCELoss`, `MSELoss`, `L1Loss`, `SmoothL1Loss`, `HuberLoss`, `GaussianNLLLoss`, `HingeEmbeddingLoss`, `SoftMarginLoss`, `MultiMarginLoss`, `MultiLabelSoftMarginLoss`, `CosineEmbeddingLoss`, `MarginRankingLoss`, `TripletMarginLoss`, `TripletMarginWithDistanceLoss`, `PoissonNLLLoss`, `CTCLoss`, `KLDivLoss`
  - [ ] Optimizers
      - [ ] Concepts: SGD vs adaptive, momentum, weight decay (AdamW), betas
      - [ ] Types: `torch.optim.SGD`, `Adam`, `AdamW`, `RMSprop`, `LBFGS`
  - [ ] LR Scheduling
      - [ ] Concepts: step vs cosine, warmup, plateau scheduling, one-cycle
      - [ ] Types: `StepLR`, `MultiStepLR`, `CosineAnnealingLR`, `CosineAnnealingWarmRestarts`, `ReduceLROnPlateau`, `CyclicLR`, `OneCycleLR`, `LambdaLR`, `MultiplicativeLR`, `LinearLR`, `PolynomialLR`, `ConstantLR`, `SequentialLR`
  - [ ] Regularization
      - [ ] Concepts: dropout, weight decay, gradient clipping, spectral/weight norm
      - [ ] Types: `Dropout`, `optimizer(param_groups weight_decay)`, `clip_grad_norm_`, `spectral_norm`
  - [ ] Stochastic Weight Averaging (SWA)
      - [ ] Concepts: weight averaging improves generalization, BN update on averaged model
      - [ ] Types: `torch.optim.swa_utils.AveragedModel`, `torch.optim.swa_utils.SWALR`, `torch.optim.swa_utils.update_bn`
  - [ ] Canonical Training Loop
      - [ ] Concepts: train/eval modes, gradient accumulation, mixed precision, checkpointing
      - [ ] Types: `model.train()/eval()`, `optimizer.zero_grad()`, `loss.backward()`, `optimizer.step()`
  - [ ] Activation Checkpointing
      - [ ] Concepts: trade compute for memory on long sequences/deep nets
      - [ ] Types: `torch.utils.checkpoint.checkpoint`, `checkpoint_sequential`

### Model Compression & Efficiency

  - [ ] Quantization
      - [ ] Concepts: PTQ vs QAT, observers/calibration, per-tensor vs per-channel
      - [ ] Types: `torch.ao.quantization` (`prepare`, `convert`, `quantize_dynamic`)
  - [ ] Pruning & Distillation
      - [ ] Concepts: structured vs unstructured pruning, teacher-student distillation
      - [ ] Types: `torch.nn.utils.prune.*` (methods, `remove`), custom distillation loop
