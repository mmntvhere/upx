import React, { useState, useRef, useEffect } from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

const SiteDisclaimer = ({ siteName }) => {
  const [expanded, setExpanded] = useState(false)
  const [height, setHeight] = useState("auto")
  const contentRef = useRef(null)

  const tDisclaimer = useTranslateUniversal("sitePage.disclaimer", "", { name: siteName })

  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        setHeight(`${contentRef.current.scrollHeight}px`)
      } else {
        setHeight("2.25em") // примерно 1.5 строки
      }
    }
  }, [expanded, siteName])

  if (!siteName) return null

  return (
    <div
      className="mt-1.5 relative cursor-pointer overflow-hidden transition-all duration-500 ease-in-out w-full px-0"
      style={{ maxHeight: height }}
      onClick={() => setExpanded(!expanded)}
    >
      <p
        ref={contentRef}
        className="text-[11px] sm:text-[11.5px] md:text-[12px] leading-relaxed text-[#A1A1AA] transition-all"
      >
        {tDisclaimer}
      </p>

      {!expanded && (
        <div className="absolute bottom-0 left-0 w-full h-5 pointer-events-none bg-gradient-to-b from-transparent to-[#141415]" />
      )}
    </div>
  )
}

export default SiteDisclaimer