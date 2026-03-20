import React, { useRef, useEffect, useState } from 'react'
import SlideContent from './SlideContent.jsx'
import styles from './SlideStage.module.css'

export default function SlideStage({
  slide,
  direction,
  slideIndex,
  total,
  onNext,
  onPrev,
}) {
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    setAnimKey(k => k + 1)
  }, [slideIndex])

  if (!slide) return null

  const isTitle = slide.layout === 'title'

  return (
    <div
      className={`${styles.stage} ${isTitle ? styles.stageTitle : ''}`}
      onClick={(e) => {
        // Click right half = next, left half = prev
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        if (x > rect.width * 0.5) onNext()
        else onPrev()
      }}
    >
      {/* Background decoration */}
      <div className={styles.bgDecorations} aria-hidden>
        <div className={`${styles.bgCircle} ${styles.bgCircle1}`} />
        <div className={`${styles.bgCircle} ${styles.bgCircle2}`} />
        {isTitle && <div className={`${styles.bgCircle} ${styles.bgCircle3}`} />}
      </div>

      {/* Top accent bar */}
      <div className={styles.topBar} />

      {/* Slide content */}
      <div
        key={animKey}
        className={`${styles.contentWrap} ${direction === 'forward' ? styles.enterForward : styles.enterBack}`}
      >
        <SlideContent slide={slide} />
      </div>

      {/* Bottom bar with progress */}
      <div className={styles.bottomBar} onClick={e => e.stopPropagation()}>
        <div className={styles.slideInfo}>
          {slide.label && (
            <span className={styles.slideLabel}>{slide.label}</span>
          )}
          <span className={styles.slideCount}>
            {slideIndex + 1} / {total}
          </span>
        </div>

        <div className={styles.progressTrack}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`${styles.progressDot} ${i === slideIndex ? styles.progressDotActive : ''} ${i < slideIndex ? styles.progressDotPast : ''}`}
            />
          ))}
        </div>

        <div className={styles.navHint}>
          <span>← →</span>
          <span className={styles.navHintSep}>·</span>
          <span>Tab for overview</span>
        </div>
      </div>
    </div>
  )
}
