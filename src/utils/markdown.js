import { marked } from 'marked'

// Custom renderer for slide-optimised HTML
function createRenderer() {
  const renderer = new marked.Renderer()

  renderer.heading = (text, level) => {
    const tag = `h${level}`
    const cls = `md-h${level}`
    return `<${tag} class="${cls}">${text}</${tag}>`
  }

  renderer.paragraph = (text) => {
    return `<p class="md-p">${text}</p>`
  }

  renderer.blockquote = (quote) => {
    return `<blockquote class="md-blockquote">${quote}</blockquote>`
  }

  renderer.list = (body, ordered) => {
    const tag = ordered ? 'ol' : 'ul'
    const cls = ordered ? 'md-ol' : 'md-ul'
    return `<${tag} class="${cls}">${body}</${tag}>`
  }

  renderer.listitem = (text) => {
    return `<li class="md-li">${text}</li>`
  }

  renderer.code = (code, infostring) => {
    return `<pre class="md-pre"><code class="md-code" data-lang="${infostring || ''}">${escapeHtml(code)}</code></pre>`
  }

  renderer.codespan = (text) => {
    return `<code class="md-codespan">${text}</code>`
  }

  renderer.hr = () => {
    return `<hr class="md-hr" />`
  }

  renderer.strong = (text) => {
    return `<strong class="md-strong">${text}</strong>`
  }

  renderer.em = (text) => {
    return `<em class="md-em">${text}</em>`
  }

  renderer.table = (header, body) => {
    return `<div class="md-table-wrap"><table class="md-table"><thead>${header}</thead><tbody>${body}</tbody></table></div>`
  }

  renderer.tablerow = (content) => {
    return `<tr class="md-tr">${content}</tr>`
  }

  renderer.tablecell = (content, flags) => {
    const tag = flags.header ? 'th' : 'td'
    const cls = flags.header ? 'md-th' : 'md-td'
    return `<${tag} class="${cls}">${content}</${tag}>`
  }

  return renderer
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Parse YAML-like frontmatter from markdown string.
 * Returns { frontmatter: {}, content: string }
 */
export function parseFrontmatter(raw) {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = raw.match(fmRegex)

  if (!match) {
    return { frontmatter: {}, content: raw }
  }

  const fmLines = match[1].split('\n')
  const frontmatter = {}

  for (const line of fmLines) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()
    frontmatter[key] = value
  }

  return { frontmatter, content: match[2] }
}

/**
 * Split markdown content on --- dividers into sections.
 * Each section is its own rendered block.
 */
export function splitSections(content) {
  // Split on lines that are exactly "---"
  return content.split(/\n---\n/).map(s => s.trim()).filter(Boolean)
}

/**
 * Render markdown string to HTML string.
 */
export function renderMarkdown(md) {
  marked.use({
    renderer: createRenderer(),
    breaks: true,
    gfm: true,
  })
  return marked.parse(md)
}

/**
 * Full parse: frontmatter + sections + rendered HTML per section.
 */
export function parseSlide(raw) {
  const { frontmatter, content } = parseFrontmatter(raw)
  const sections = splitSections(content)
  const renderedSections = sections.map(s => renderMarkdown(s))
  return {
    frontmatter,
    sections,
    renderedSections,
    layout: frontmatter.layout || 'default',
    label: frontmatter.label || null,
  }
}
