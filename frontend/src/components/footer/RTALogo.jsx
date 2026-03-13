import React from 'react'

const RTALogo = () => {
  return (
    <a 
      href="https://rta.agency" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
    >
      <img 
        src="/assets/rta.svg" 
        alt="RTA Logo" 
        className="h-5 w-auto" 
        width="40" 
        height="20" 
      />
    </a>
  )
}

export default RTALogo