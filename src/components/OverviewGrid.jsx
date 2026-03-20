import React from 'react'
import SlideContent from './SlideContent.jsx'
import styles from './OverviewGrid.module.css'

export default function OverviewGrid({ slides, currentIndex, onSelectSlide, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerTitle}>Overview</span>
            <span className={styles.headerCount}>{slides.length} slides</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close overview">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              className={`${styles.thumb} ${i === currentIndex ? styles.thumbActive : ''}`}
              onClick={() => { onSelectSlide(i); onClose(); }}
              aria-label={`Go to slide ${i + 1}`}
            >
              {/* Mini preview */}
              <div className={`${styles.thumbPreview} ${slide.layout === 'title' ? styles.thumbTitle : ''}`}>
                <div className={styles.thumbTopBar} />
                <div className={styles.thumbContent}>
                  {/* Just show the label + first heading from the slide */}
                  {slide.label && (
                    <div className={styles.thumbLabel}>{slide.label}</div>
                  )}
                  <MiniSlidePreview slide={slide} />
                </div>
              </div>

              {/* Index badge */}
              <div className={styles.thumbIndex}>
                {i + 1}
              </div>

              {/* Active indicator */}
              {i === currentIndex && (
                <div className={styles.thumbActiveBadge}>Current</div>
              )}
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className={styles.footer}>
          Press <kbd className={styles.kbd}>Tab</kbd> or <kbd className={styles.kbd}>Esc</kbd> to close
        </div>
      </div>
    </div>
  )
}

/**
 * Ultra-simplified preview of a slide's first section.
 * Extracts headings and first few words only.
 */
function MiniSlidePreview({ slide }) {
  const firstSection = slide.sections[0] || ''

  // Extract lines, ignore frontmatter-style dashes
  const lines = firstSection.split('\n').filter(l => l.trim() && !l.startsWith('---'))

  const previewLines = lines.slice(0, 4)

  return (
    <div className={styles.miniPreview}>
      {previewLines.map((line, i) => {
        const h1Match = line.match(/^# (.+)/)
        const h2Match = line.match(/^## (.+)/)
        const h3Match = line.match(/^### (.+)/)
        const boldMatch = line.match(/^\*\*(.+)\*\*/)

        if (h1Match) return <div key={i} className={styles.miniH1}>{h1Match[1]}</div>
        if (h2Match) return <div key={i} className={styles.miniH2}>{h2Match[1]}</div>
        if (h3Match) return <div key={i} className={styles.miniH3}>{h3Match[1]}</div>

        // Strip markdown formatting for body lines
        const plain = line.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1')
        if (plain.trim().length > 0) {
          return <div key={i} className={styles.miniBody}>{plain.slice(0, 40)}{plain.length > 40 ? '…' : ''}</div>
        }
        return null
      })}
    </div>
  )
}
