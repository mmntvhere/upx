// src/components/PageLoader.jsx
import React from "react"

const PageLoader = ({ show }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black bg-opacity-80 ui-glass flex items-center justify-center transition-opacity duration-500 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}

export default PageLoader