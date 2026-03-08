import React, { useState, useRef, useEffect } from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

const SiteDescription = ({ review, className = "" }) => {
  // review может быть строкой (html) или объектом { uk: "...", en: "..." }
  const content = useTranslateUniversal(review)
  const labelExpand = useTranslateUniversal("siteDescription.expand", "Читати далі")
  const labelCollapse = useTranslateUniversal("siteDescription.collapse", "Згорнути")

  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef(null)
  const [shouldTruncate, setShouldTruncate] = useState(false)
  const [maxHeight, setMaxHeight] = useState("22.5em") // 15 строк по умолчанию

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024
      const lineHeight = 1.5
      const maxLines = isMobile ? 10 : 15
      setMaxHeight(`${lineHeight * maxLines}em`)

      if (contentRef.current) {
        const totalLines = contentRef.current.scrollHeight / (lineHeight * 16)
        setShouldTruncate(totalLines > maxLines)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [content])

  // ✅ Пропускаем, если нет контента
  if (!content || content.trim() === "") return null

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative overflow-hidden">
        <div
          ref={contentRef}
          className={`transition-all duration-500 ${expanded ? "max-h-full" : ""}`}
          style={{ maxHeight: expanded ? "none" : maxHeight }}
        >
          <article
            className="prose prose-invert max-w-none w-full text-zinc-300"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {!expanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#141415] to-transparent pointer-events-none z-10" />
        )}
      </div>

      {shouldTruncate && (
        <div className="mt-3 relative z-20">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-white text-[11px] font-medium flex items-center gap-1"
          >
            {expanded ? labelCollapse : labelExpand}
            <svg
              className={`w-4 h-4 transform transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default SiteDescription