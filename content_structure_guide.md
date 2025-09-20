Content Structure Guide for Deep Learning Cheatsheet
This guide defines the required structure and syntax for content files in `src/content/concepts/` after the refactor to minimal cards and multi-topic markdown.

1. Frontmatter (YAML)
At minimum, provide a file-level `category` for grouping. Other fields are optional.

---
category: "Convolutions"
---

2. Multi-topic Body Structure
Each file can contain multiple topics. Use the following headings:

- `##` Heading: Card Title
- Optional image directly under the title (markdown or <img>), the first image becomes the card image.
- `### Desc`: Bullet list shown under the card.
- `### Parameters`: Bullet list as `name: short description`. Multiple names can be separated by `/` and will be split into individual parameters, each retaining the same description.

Example:

```
## Conv2d
![image](/dl/assets/conv2d.svg)

### Desc
- 2D convolution for images and feature maps
- Slides kernels to detect spatial patterns

### Parameters
- in_channels / out_channels: input/output channels count
- kernel_size / stride / padding / dilation / groups / bias: standard convolution controls

## ConvTranspose2d
<img src="/dl/assets/conv-transpose2d.svg" alt="" />

### Desc
- Learned upsampling via transposed convolution

### Parameters
- kernel_size: filter size
- stride: upsampling factor
- padding: input padding
- output_padding: resolve size ambiguity
```

3. Images & Diagrams
- Place static images/SVGs in `public/assets/`.
- Use absolute paths that include the site base (this project deploys at `/dl/`).
  - Preferred src: `/dl/assets/your-diagram.svg`
  - Markdown image or `<img>` are both supported.

4. Troubleshooting and Validation
- Missing frontmatter: Ensure `category` is present at minimum.
- Images: Use `/dl/assets/...` and place files in `public/assets/`.
- Validate locally: `npm run dev` and check the index page. Confirm that cards show Title, Desc bullets, and Parameters bullets.

5. Author Checklist
- Frontmatter includes `category`.
- Each topic has: `##` Title, `### Desc` bullets, `### Parameters` bullets.
- Optional image sits directly under the topic title and is referenced as `/dl/assets/...`.