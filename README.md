# Personal Website + Blog Template (GitHub Pages + Jekyll)

This repo is a **zero-JavaScript**, **ready-to-publish** personal site that combines:

* A **homepage** with intro + recent posts
* A **blog** with pagination and tags
* **About** and **Projects** pages
* **RSS feed** & **sitemap** for discoverability
* **Responsive design** that works on mobile

Everything here is built with **GitHub Pages** and **Jekyll**—no hosting, no backend, no manual builds.

---

## 🚀 Quick Start

1. **Create a repo**

   * If this is your main site, name it:

     ```
     yourusername.github.io
     ```

     It will appear at `https://yourusername.github.io`.
   * If it’s not your main site, pick any name and later enable it under **Settings → Pages**.

2. **Copy the files** into your repo.

3. **Edit `_config.yml`**:

   * Change `title`, `tagline`, `url`, `author` fields.
   * Update navigation links if you add/remove pages.

4. **Add your profile picture** (optional):
   Replace `assets/img/profile.jpg`.

5. **Write your first post**:
   In `_posts/` create `YYYY-MM-DD-my-title.md`:

   ```markdown
   ---
   title: "My First Post"
   tags: [Intro]
   ---
   Hello world, this is my first blog post.
   ```

6. **Commit & push to `main`**.

   * GitHub Pages will build it automatically.
   * Check the URL after 1–2 minutes.

---

## 📁 Folder Guide

| Path                   | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `_config.yml`          | Site settings (title, author, permalink style, plugins) |
| `index.md`             | Homepage content                                        |
| `about.md`             | About page                                              |
| `projects.md`          | Projects portfolio                                      |
| `blog/index.html`      | Blog index with pagination and tags                     |
| `_posts/`              | Blog posts (Markdown)                                   |
| `_layouts/`            | Page & post templates                                   |
| `_includes/`           | Common parts (header, footer, head)                     |
| `assets/css/style.css` | Site styling                                            |
| `assets/img/`          | Images (profile, banners)                               |
| `feed.xml`             | RSS feed                                                |
| `sitemap.xml`          | Sitemap for SEO                                         |
| `README.md`            | This file                                               |

---

## ✏️ How to Modify

### Change Colors, Fonts, and Layout

* All styling lives in `assets/css/style.css`.
* Change `:root` variables for colors:

  ```css
  --fg: #222;
  --bg: #fafafa;
  --link: #d14;
  ```
* To change fonts, edit `body { font-family: ... }`.

### Add/Remove Navigation Items

* Edit the `nav:` list in `_config.yml`:

  ```yml
  nav:
    - title: "Home"
      url: /
    - title: "Blog"
      url: /blog/
    - title: "About"
      url: /about/
  ```

### Add Pages

* Create a new `.md` file at the root:

  ```markdown
  ---
  title: "Uses"
  layout: page
  permalink: /uses/
  ---
  Here are my tools and setup.
  ```
* Add it to `nav:` in `_config.yml`.

### Write Posts

* Posts go in `_posts/` as:

  ```
  YYYY-MM-DD-title.md
  ```
* Front matter controls metadata:

  ```markdown
  ---
  title: "Deep Dive: Transformers"
  tags: [ML, Transformers]
  ---
  Post content here...
  ```

### Change the Homepage

* Edit `index.md` — hero section, intro text, recent posts list.

---

## 🌱 How to Expand

Here are some ideas for evolving the site:

| Feature                        | What to Do                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------- |
| **Dark mode**                  | Add `@media (prefers-color-scheme: dark)` styles in `style.css`.             |
| **Custom typography**          | Use Google Fonts or Adobe Fonts—add `<link>` in `_includes/head.html`.       |
| **Project cards**              | Create a grid in `projects.md` with images, short descriptions, and links.   |
| **Blog post images**           | Store in `assets/img/posts/` and reference with `![alt](...)`.               |
| **Categories**                 | Add a `category:` field to posts and build category pages like tags.         |
| **Math support**               | Add KaTeX via `<link>` + `<script>` in head, then write LaTeX in Markdown.   |
| **Code highlighting theme**    | Change `rouge` theme in `_config.yml` or style `pre code` in CSS.            |
| **Landing page flair**         | Add a large banner image, gradient background, or hero illustration.         |
| **Series posts**               | Use a `series:` field and link between related posts.                        |
| **About page personality**     | Add photos, timeline, skill charts (static SVG), fun facts.                  |
| **Favicons & social previews** | Add `favicon.ico` in root, configure `jekyll-seo-tag` for Open Graph images. |

---

## 🎨 Making It Yours (Avoid the Cookie-Cutter Look)

The “GitHub Pages default” vibe comes from everyone keeping the defaults. To break that:

1. **Color palette**: Pick 2–3 signature colors (e.g., accent for buttons & links).
2. **Typography personality**: Sans-serif for clarity, serif for elegance, monospace for techy vibe.
3. **Custom sections**: Add a “Now” page, or a “Uses” page (equipment/software you use).
4. **Images & illustrations**: Even 1–2 custom visuals instantly make it memorable.
5. **Microcopy tone**: Replace generic “About” with “Who I Am” or “Things I Build.”
6. **Structure shake-up**: Instead of listing recent posts on the homepage, highlight one “featured” post.
7. **Show your work-in-progress**: Have a “Lab” page where you drop experiments, snippets, prototypes.

---

## 🛠 Local Preview (Optional)

You can see changes before pushing by installing Jekyll locally:

```bash
gem install bundler jekyll
bundle init
# Add to Gemfile:
# gem "github-pages", group: :jekyll_plugins
bundle install
bundle exec jekyll serve
```

Then open: [http://localhost:4000](http://localhost:4000)

---

## 📈 Moving Forward

Once you’re comfortable:

* Add **analytics** (Plausible, Fathom, etc.—privacy-friendly).
* Optimize images for speed.
* Learn basic HTML/CSS tweaks to style components your way.
* Explore [Jekyll themes](https://jekyllrb.com/docs/themes/) and borrow patterns you like.
* Connect a **custom domain**.

This template is deliberately minimal so you can **layer personality on top** without wrestling with someone else’s complex theme.

---

Would you like me to also make a **version of this README with embedded visual examples** so you can see before/after versions of color palettes, typography, and layout tweaks? That could jumpstart your creative changes.
