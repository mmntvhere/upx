import React from 'react'

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className="bg-[#1f1f1f] p-2 rounded-lg hover:bg-[#2a2a2a] transition"
      aria-label="Scroll to top"
    >
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

export default ScrollToTopButton