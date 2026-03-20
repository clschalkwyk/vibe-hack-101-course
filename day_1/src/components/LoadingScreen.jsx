import React from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ error }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {error ? (
          <>
            <div className={styles.icon}>⚠</div>
            <div className={styles.title}>Failed to load slides</div>
            <div className={styles.message}>{error}</div>
            <div className={styles.hint}>
              Make sure <code>public/slides/slides.json</code> exists and lists your markdown files.
            </div>
          </>
        ) : (
          <>
            <div className={styles.spinner} />
            <div className={styles.title}>Loading slides…</div>
          </>
        )}
      </div>
    </div>
  )
}
