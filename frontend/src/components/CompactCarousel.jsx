import React, { useEffect, useRef, useState } from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage" // ✅ Язык

// Обёртка React.forwardRef — позволяет пробросить ref к контейнеру карусели
const CompactCarousel = React.forwardRef(({ sites, onSiteClick }, ref) => {
  const containerRef = useRef()
  const currentLang = useLanguage() // 🌐 Получаем текущий язык

  const [isScrolledStart, setIsScrolledStart] = useState(true)
  const [isScrolledEnd, setIsScrolledEnd] = useState(false)

  const noPreviewText = useTranslateUniversal("site.noPreview", "No Preview")

  // 🎯 Обработка скролла
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      setIsScrolledStart(scrollLeft <= 5)
      setIsScrolledEnd(scrollLeft >= maxScrollLeft - 5)
    }

    container.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const containerClasses = [
    "flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth transition-all",
    isScrolledStart ? "pl-5" : "pl-0",
    isScrolledEnd ? "pr-5" : "pr-0"
  ].join(" ")

  // 🧼 Фильтрация по языку
  const filteredSites = sites.filter(site => {
    const langs = site.enabled_languages
    return !langs || langs.length === 0 || langs.includes(currentLang)
  })

  // 🔽 Сортировка по позиции
  const sortedSites = [...filteredSites].sort((a, b) => {
    const aPos = a.position_per_lang?.[currentLang] ?? 9999
    const bPos = b.position_per_lang?.[currentLang] ?? 9999
    return aPos - bPos
  })

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        if (ref) ref(el)
      }}
      className={containerClasses}
    >
      {sortedSites.map((site, index) => (
        <div
          key={index}
          className="w-[108.55px] h-[145.56px] flex-shrink-0 cursor-pointer"
          onClick={() => onSiteClick(site)}
        >
          <div className="w-full h-full bg-[#F4F4F6] rounded-xl overflow-hidden relative">
            {site.preview ? (
              <img
                src={site.preview.startsWith("http") ? site.preview : `/storage/${site.preview}`}
                alt={site.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.style.display = "none"
                  const fallback = e.target.nextSibling
                  if (fallback) fallback.style.display = "flex"
                }}
              />
            ) : null}

            <div className="w-full h-full hidden items-center justify-center text-xs text-gray-500">
              {noPreviewText}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

export default CompactCarousel