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


---

# 7) Styling (no frameworks, responsive)

### `/ assets/css/style.css`
```css
:root {
  --fg: #111;
  --bg: #fff;
  --muted: #666;
  --link: #0b66d0;
  --border: #e6e6e6;
  --accent: #f5f7ff;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color: var(--fg);
  background: var(--bg);
  line-height: 1.6;
}

.container { max-width: 900px; margin: 0 auto; padding: 0 1rem; }

.site-header, .site-footer { border-bottom: 1px solid var(--border); }
.site-footer { border-top: 1px solid var(--border); border-bottom: 0; }
.header-wrap, .footer-wrap { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; }

.site-title { font-weight: 700; text-decoration: none; color: var(--fg); }
.site-nav .nav-link { margin-left: 1rem; text-decoration: none; color: var(--fg); }
.site-nav .nav-link.active, .site-nav .nav-link:hover { color: var(--link); }

.site-content { padding: 2rem 0; }
h1, h2, h3 { line-height: 1.25; }
h1 { margin-top: 0; }

.hero { display: grid; grid-template-columns: 96px 1fr; gap: 1.25rem; align-items: center; margin-bottom: 1.5rem; }
.avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); }

.button { display: inline-block; padding: .5rem .9rem; border-radius: .5rem; background: var(--link); color: #fff; text-decoration: none; margin-right: .5rem; }
.button-secondary { background: var(--accent); color: var(--link); }

.page-subtitle { color: var(--muted); margin-top: -0.5rem; }
.post-meta { color: var(--muted); }

.post-list { list-style: none; padding: 0; }
.post-list li { padding: .75rem 0; border-bottom: 1px solid var(--border); }
.post-list .post-date { color: var(--muted); margin-left: .5rem; }
.excerpt { color: var(--muted); margin: .25rem 0 0; }

.tag { background: var(--accent); padding: .15rem .45rem; border-radius: .35rem; text-decoration: none; }
.tags .tag { margin-right: .35rem; }

.pagination { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; }
.pagination a { text-decoration: none; color: var(--link); }

.site-footer p { margin: .25rem 0; color: var(--muted); }
a { color: var(--link); }
code, pre { background: #f8f8f8; border: 1px solid var(--border); border-radius: .35rem; }
pre { padding: .75rem; overflow-x: auto; }
