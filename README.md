# Vibe Hack 101

Vibe Hack 101 is a short course for hackathon teams learning how to go from vague idea to clear, judge-friendly demo. The material is built around the practical flow most teams need under time pressure: choose the right problem, validate it fast, build the hardest part first, prototype intelligently, design a demo that lands, and pitch with clarity.

This repository contains both:

- the course content
- the lightweight slide app used to present it

## Course Overview

The course is structured as a 10-slide teaching sequence in [`public/slides/`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/public/slides):

1. Title and framing
2. Mindset
3. Idea generation
4. Validation
5. Vibe coding
6. Hardest-first execution
7. Prototyping
8. Demo design
9. Pitch
10. Closing

The goal is not to teach hackathon theory in the abstract. The goal is to help teams make better decisions fast enough to matter during an actual event.

## Who This Is For

- Hackathon participants who need a tighter process
- Builders using AI-assisted workflows
- Mentors or organizers who want a reusable teaching deck
- Teams that keep overbuilding and under-explaining

## Core Teaching Themes

- Start from a real problem or a meaningful constraint
- Force clarity early
- Validate before polishing
- Build the riskiest part first
- Use AI as leverage, not decoration
- Optimize for a demo moment judges will remember
- Keep the pitch simpler than your architecture

## Repository Contents

### Course content

The actual curriculum lives in Markdown files under [`public/slides/`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/public/slides). Each file is one slide in the sequence, and [`public/slides/slides.json`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/public/slides/slides.json) controls the order.

That means the fastest way to change the course is to edit Markdown, not React code.

### Slide app

The app is a presentation shell for delivering the course:

- full-screen slide rendering
- keyboard navigation
- click navigation
- overview grid for jumping between slides
- Markdown-based authoring
- dark presentation styling for live teaching

## Running The Course Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Editing The Course

To update the curriculum:

1. Edit the relevant Markdown file in [`public/slides/`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/public/slides)
2. Add, remove, or reorder filenames in [`public/slides/slides.json`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/public/slides/slides.json)
3. Reload the deck and review pacing, readability, and flow

Example manifest:

```json
[
  "01-title.md",
  "02-mindset.md",
  "03-idea-generation.md"
]
```

## Slide Authoring Format

Slides use standard Markdown plus lightweight frontmatter.

Example:

```md
---
label: DAY 01
layout: title
---

# Winning Hackathons

Build something judges can understand quickly.

---

## Why this matters

- Clear story
- Fast demo
- Strong payoff
```

### Supported Frontmatter

| Key | Example | Effect |
| --- | --- | --- |
| `label` | `DAY 01` | Displays a small label above the slide |
| `layout` | `title` | Uses the large title-slide treatment |

### Content Notes

- `---` inside the body splits a slide into sections
- Standard Markdown is supported for headings, paragraphs, lists, blockquotes, tables, and code
- Presentation styling is applied automatically by the app

## Presenter Controls

| Action | Keys |
| --- | --- |
| Next slide | `ArrowRight`, `ArrowDown`, `Space`, `PageDown` |
| Previous slide | `ArrowLeft`, `ArrowUp`, `PageUp` |
| First slide | `Home` |
| Last slide | `End` |
| Toggle overview grid | `Tab` or `Escape` |

Mouse navigation:

- Click right half of the slide to advance
- Click left half of the slide to go back
- Use overview mode to jump directly to a slide

## App Architecture

The app is intentionally small. The important pieces are:

- [`src/hooks/useSlides.js`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/src/hooks/useSlides.js): loads the manifest and slide files
- [`src/utils/markdown.js`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/src/utils/markdown.js): parses frontmatter and Markdown
- [`src/components/SlideStage.jsx`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/src/components/SlideStage.jsx): presentation shell and transitions
- [`src/components/OverviewGrid.jsx`](/Users/raven/Desktop/phaselabs/vibe_hack_course/vibe-hack-101-course/src/components/OverviewGrid.jsx): slide picker for overview mode

## Project Structure

```text
vibe-hack-101-course/
├── public/
│   └── slides/
│       ├── slides.json
│       ├── 01-title.md
│       └── ...
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── index.css
├── index.html
└── package.json
```

## Production Build

```bash
npm run build
```

The build output goes to `dist/`.

## Stack

- React 18
- Vite
- Marked
- CSS Modules

## Notes

This repository should be read primarily as a course repo with a custom presentation layer, not as a general-purpose slideshow framework.
