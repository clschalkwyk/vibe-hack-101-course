import React from 'react'
import styles from './SlideContent.module.css'

export default function SlideContent({ slide, isActive }) {
  if (!slide) return null

  const { renderedSections, layout, label } = slide
  const isTitle = layout === 'title'

  return (
    <div className={`${styles.slideContent} ${isTitle ? styles.titleLayout : styles.defaultLayout}`}>
      {label && (
        <div className={styles.label}>
          <span className={styles.labelPill}>{label}</span>
        </div>
      )}

      <div className={styles.sections}>
        {renderedSections.map((html, i) => (
          <div
            key={i}
            className={`${styles.section} ${i === 0 ? styles.sectionPrimary : styles.sectionSecondary}`}
            style={{ '--section-index': i }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div>
    </div>
  )
}
