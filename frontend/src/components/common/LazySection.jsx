import React, { useState, useEffect, useRef } from 'react'

/**
 * 🧊 LazySection Wrapper
 * Loads content when it enters the viewport. 
 * High-performance solution for heavy pages.
 */
const LazySection = ({ children, height = "200px", className = "" }) => {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    // Fallsback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      setIntersecting(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' } // Load way before it appears
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ minHeight: isIntersecting ? 'auto' : height }}
    >
      {isIntersecting ? children : <div style={{ height }} />}
    </div>
  )
}

export default LazySection
