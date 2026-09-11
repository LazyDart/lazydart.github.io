# Design Direction

This document sets the visual style for lazydart.github.io. Read it before you
change layout, color, or type. It exists so future changes stay in one style,
not a mix of styles.

## Concept

The site mixes three ideas, in this order of weight:

1. **Brutalist** (main weight) — raw structure, hard edges, visible borders,
   plain type, high contrast. No rounded corners, no soft shadows, no
   gradients on backgrounds.
2. **Magical** (light touch) — small, specific moments of unexplained beauty:
   a gradient rule, a grain texture, a slow color shift. Each one is small
   and placed on purpose.
3. **Psychedelic** (smallest weight) — color. One accent gradient, used on
   text and thin lines only, never on large fill areas. It shows up at
   moments of emphasis: a title, a hover state, a rule.

The result should read as a stark, confident page with a few charged
details, not a colorful page with some black in it. If a change adds more
color or motion than the page already has, cut it back before you ship it.

## Boundary: what this is not

- Not a rainbow. One accent gradient exists on the whole site. Do not add a
  second one.
- Not animated backgrounds, particle effects, or scroll-triggered motion.
- Not rounded corners, drop shadows, or glassmorphism.
- Not stock "dark mode SaaS" styling (soft panels, pill buttons, subtle
  shadows). Every edge should be a visible line, not a blur.

## Color

Defined as CSS custom properties in `app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#09090b` | Page background. Near-black, not pure black. |
| `--fg` | `#f5f3ec` | Body text, borders, icons. Warm off-white, not pure white. |
| `--muted` | `#8f8b94` | Secondary text: dates, captions, footer. |
| `--line` | `#f5f3ec` | Border color. Same as `--fg` so structure reads as one strong color, not a separate gray system. |
| `--accent-1` | `#a78bfa` | Violet. Gradient start. |
| `--accent-2` | `#f472d0` | Magenta. Gradient middle. |
| `--accent-3` | `#7dd3fc` | Cyan. Gradient end. |
| `--accent-gradient` | `linear-gradient(115deg, var(--accent-1), var(--accent-2) 50%, var(--accent-3))` | The one gradient. Text, thin rules, focus rings, hover states. |

Rules for the accent gradient:

- Use it on text (`background-clip: text`), on 1–2px rules, or on a hover
  underline. Never as a fill behind a block of content.
- One gradient element per screen at rest. A hover state may add a second,
  temporary one.
- Do not tint the background with it. The background stays `--bg`.

## Type

Three families, each with one job. Fonts load through `next/font/google` in
`app/layout.tsx`.

1. **Display — Archivo Black** (`--font-archivob`, already in the project).
   Used only for the large titles that fill most of the screen: the post
   title on a blog post page, the name on the home page. Always set in
   uppercase or as written in the source, never italic, never colored except
   the accent gradient on the home page name.
2. **UI / mono — JetBrains Mono** (`--font-mono`, new). Used for navigation
   links, dates, labels, footer text, and code. This is the "structural"
   voice of the page: it should look like a readout, not a headline.
3. **Body — system sans stack** (already set on `html.theme`). Used for
   paragraph text in blog posts. Kept plain on purpose, so the display and
   mono type stand out by contrast, not by fighting a third styled font.

Do not introduce a fourth font. Do not use the display font for body copy —
it does not stay readable at paragraph size.

## Layout and space

- Content width stays at `--maxw: 72rem`, centered, via the existing
  `Container` component.
- Spacing keeps the existing `Section`/`.stack` rhythm (`--stack-gap`).
  Prefer the existing scale (`.75rem`, `1rem`, `1.25rem`, `2rem`, `3rem`)
  over inventing new values.
- Corners are square everywhere. `--radius` is removed from use; nothing on
  the page should have a border-radius above `0`.

## Borders

Borders replace shadows and background panels as the way to show structure.
This is the main brutalist signal on the page.

- `2px solid var(--line)` for primary structure: header bottom edge, footer
  top edge, card/block outlines, the rule under a post title.
- `1px solid var(--line)` for secondary dividers: rows in the post list,
  inline separators.
- No `box-shadow` anywhere. No `border-radius` anywhere.

## Texture and motion

- **Grain**: a fixed, full-viewport noise layer sits over the whole page at
  very low opacity (`~0.05`), blended with `mix-blend-mode: overlay`. It is
  the one "magical" texture on the site — it should be felt, not seen
  directly. It is built from an inline SVG filter, so it needs no image
  file.
- **Motion**: kept to hover and focus states plus one slow, small effect —
  the accent gradient may drift (`background-position` animation, ~20s
  loop) on the home page name only. No other element moves on its own.
  Every animation respects `prefers-reduced-motion: reduce` and turns off
  under it.
- **Hover**: links get a thicker underline and the underline switches to
  the accent gradient. No color fade on the text itself, no scale or lift
  transforms.

## Components

**Navigation** — no background chip, no pill. Plain mono wordmark on the
left, plain mono links on the right, `2px solid var(--line)` along the
bottom of the header. Active/hover link gets the gradient underline.

**Footer** — mirrors the header: `2px solid var(--line)` along the top,
mono text, muted color.

**Cards / blocks** — square-cornered box with a `2px solid var(--line)`
border and the page background inside (no separate panel color). Used for
grouped content such as a post preview on the home page.

**Blog list** — rows, not a bulleted list. Each row is separated by
`1px solid var(--line)`, with the date in muted mono and the title in the
main text color. On hover, a `2px` accent-gradient bar appears at the row's
left edge.

**Blog post** — the existing full-screen fitted title (`TextFillBox`,
Archivo Black) stays as the anchor of the page. Below it: a `2px` rule,
then the date in muted mono, then the article body in the system sans
stack. Inline code and code blocks use the mono font with a bordered (not
shadowed) box. Blockquotes get a `2px solid` left border in `--accent-1`
and italic text.

**Home page** — the name is set as a large display headline (Archivo
Black), large enough to dominate the first screen the way a post title
does, with the accent gradient applied to its text. A short mono tagline
sits underneath. A bordered block links into the blog and shows the latest
post.

## Content voice

Keep body copy plain and direct, in short sentences. Avoid marketing
language ("seamless", "cutting-edge") and avoid inside jokes in structural
text (navigation, footer, buttons) — save personality for the actual blog
posts, where it already exists.

## Accessibility

- Text contrast: `--fg` on `--bg` and `--muted` on `--bg` both stay above
  WCAG AA for normal text. Check any new color pair before you add it.
- Every interactive element keeps a visible focus state: a `2px` outline in
  `--accent-1`, offset from the element, never removed without a
  replacement.
- All motion (grain aside, which does not move) respects
  `prefers-reduced-motion: reduce`.
