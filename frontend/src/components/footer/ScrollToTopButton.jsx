import React from 'react'

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className="bg-white/5 p-2.5 rounded-xl hover:bg-[#D80032] transition-all border border-white/5 shadow-lg shadow-black/20 group active:scale-90"
      aria-label="Scroll to top"
    >
      <svg
        className="w-4 h-4 text-white/50 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

export default ScrollToTopButton