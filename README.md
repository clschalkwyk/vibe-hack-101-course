# MD Slideshow

A minimal, beautiful React-based slideshow app that renders Markdown files as presentation slides.

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Adding Your Own Slides

1. Drop `.md` files into `public/slides/`
2. Edit `public/slides/slides.json` to list them in order:

```json
[
  "01-intro.md",
  "02-content.md",
  "03-closing.md"
]
```

That's it. The app hot-reloads in dev mode.

---

## Markdown Format

Each file is one slide. Use standard Markdown:

```markdown
---
label: DAY 01
---

# Slide Title

Some body text with **bold** and *italic* support.

---

A horizontal rule (---) splits the slide into sections.
The second section appears below a divider line.

- Bullet lists work
- Like this

> Blockquotes render with an orange accent bar

| Col A | Col B |
|-------|-------|
| Tables | work too |
```

### Frontmatter options

| Key | Values | Effect |
|-----|--------|--------|
| `layout` | `title` | Large centred title layout with gradient heading |
| `label` | any string | Small pill badge (e.g. `DAY 01`) shown above the title |

---

## Navigation

| Action | Keys |
|--------|------|
| Next slide | `→` `↓` `Space` `PageDown` |
| Previous slide | `←` `↑` `PageUp` |
| First slide | `Home` |
| Last slide | `End` |
| Overview grid | `Tab` or `Esc` |
| Click right half | Next slide |
| Click left half | Previous slide |

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Serve it with any static file server.

---

## Project Structure

```
├── public/
│   └── slides/
│       ├── slides.json        ← manifest (ordered list of filenames)
│       ├── 01-title.md
│       └── ...
├── src/
│   ├── components/
│   │   ├── SlideStage         ← full-screen slide wrapper + transitions
│   │   ├── SlideContent       ← markdown rendering + typography
│   │   ├── OverviewGrid       ← Tab key thumbnail overview
│   │   └── LoadingScreen      ← loading + error states
│   ├── hooks/
│   │   ├── useSlides.js       ← fetches + parses all slides
│   │   └── useKeyboard.js     ← keyboard navigation
│   ├── utils/
│   │   └── markdown.js        ← frontmatter parser + marked renderer
│   └── App.jsx
```

---

Built with React + Vite + [marked](https://marked.js.org/).
