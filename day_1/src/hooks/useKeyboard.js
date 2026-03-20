import { useEffect } from 'react'

export function useKeyboard({ onNext, onPrev, onFirst, onLast, onToggleOverview }) {
  useEffect(() => {
    function handleKey(e) {
      // Don't fire if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          onNext?.()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          onPrev?.()
          break
        case 'Home':
          e.preventDefault()
          onFirst?.()
          break
        case 'End':
          e.preventDefault()
          onLast?.()
          break
        case 'Escape':
        case 'Tab':
          e.preventDefault()
          onToggleOverview?.()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onNext, onPrev, onFirst, onLast, onToggleOverview])
}
