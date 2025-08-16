---
title: "ML Notes: Transformers from Scratch"
tags: [ML, Transformers, Notes]
---

Some quick notes on the shape of a minimal Transformer:

1. Token + positional embeddings
2. Multi-head self-attention
3. MLP block with residual + layer norm

```python
# pseudo-ish code
x = tok_embed(input_ids) + pos_embed(indices)
for _ in range(L):
    x = x + mha(norm(x))
    x = x + mlp(norm(x))
logits = lm_head(norm(x))
```
---
