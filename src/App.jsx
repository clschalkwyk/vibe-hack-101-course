import React, { useState, useCallback } from 'react'
import { useSlides } from './hooks/useSlides.js'
import { useKeyboard } from './hooks/useKeyboard.js'
import SlideStage from './components/SlideStage.jsx'
import OverviewGrid from './components/OverviewGrid.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import styles from './App.module.css'

export default function App() {
  const { slides, loading, error } = useSlides()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [showOverview, setShowOverview] = useState(false)

  const goTo = useCallback((index) => {
    if (!slides.length) return
    const clamped = Math.max(0, Math.min(index, slides.length - 1))
    setDirection(clamped >= currentIndex ? 'forward' : 'back')
    setCurrentIndex(clamped)
  }, [slides.length, currentIndex])

  const goNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection('forward')
      setCurrentIndex(i => i + 1)
    }
  }, [currentIndex, slides.length])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection('back')
      setCurrentIndex(i => i - 1)
    }
  }, [currentIndex])

  const goFirst = useCallback(() => goTo(0), [goTo])
  const goLast = useCallback(() => goTo(slides.length - 1), [goTo, slides.length])
  const toggleOverview = useCallback(() => setShowOverview(v => !v), [])

  useKeyboard({
    onNext: goNext,
    onPrev: goPrev,
    onFirst: goFirst,
    onLast: goLast,
    onToggleOverview: toggleOverview,
  })

  if (loading || error) {
    return <LoadingScreen error={error} />
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className={styles.app}>
      <SlideStage
        slide={currentSlide}
        direction={direction}
        slideIndex={currentIndex}
        total={slides.length}
        onNext={goNext}
        onPrev={goPrev}
      />

      {showOverview && (
        <OverviewGrid
          slides={slides}
          currentIndex={currentIndex}
          onSelectSlide={goTo}
          onClose={toggleOverview}
        />
      )}
    </div>
  )
}
