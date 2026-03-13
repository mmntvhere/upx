import React, { useRef, useEffect, useState } from "react"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import { Search, Sparkles } from "lucide-react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useTranslation } from "react-i18next"

const SearchAndFilters = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  onOpenSearch
}) => {
  const scrollRef = useRef(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const navigate = useLocalNavigate()

  const { i18n } = useTranslation()
  const currentLang = i18n.language

  // 🔁 Переводы UI текста
  const searchLabel = useTranslateUniversal("searchAndFilters.search")
  const scrollRightLabel = useTranslateUniversal("searchAndFilters.scrollRight")

  // 📐 Проверка, нужно ли показывать кнопки прокрутки (Smart Arrows)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    
    // Порог 5px для более стабильного срабатывания
    setCanScrollLeft(el.scrollLeft > 5)
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 5)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScroll()
    el.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [categories, checkScroll])

  // ⏩ Прокрутка
  const scroll = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const step = el.offsetWidth * 0.5
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: "smooth" })
  }

  // 📍 Клик по категории
  const handleCategoryClick = (category) => {
    if (category) {
      navigate(`/${category.slug}`)
    } else {
      onSelectCategory(null)
    }
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto mt-6 space-y-3">
      {/* 🔍 Поиск и кнопка "Підібрати" */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 w-full">
          {/* 🔎 Кнопка поиска */}
          <button
            onClick={onOpenSearch}
            type="button"
            className="filter-glow-button h-[38px] sm:h-[44px] flex items-center justify-start gap-2 px-4 text-white text-sm font-medium whitespace-nowrap w-full"
            aria-label={searchLabel}
          >
            <Search className="w-4 h-4 text-white shrink-0" />
            <span className="truncate text-left w-full">{searchLabel}</span>
          </button>
        </div>
      </div>

      {/* ⚡ Горизонтальный скролл категорий (Semantic List) */}
      <div className="relative sm:px-6 lg:px-8 group">
        <ul
          ref={scrollRef}
          className="ui-slider-container px-4 sm:px-0 !gap-2"
          role="list"
        >
          {categories.map((category) => (
            <li 
              key={category.id} 
              className="ui-slider-item" 
              role="listitem"
            >
              <button
                onClick={() => handleCategoryClick(category)}
                className={`h-[38px] sm:h-[44px] rounded-full border text-sm font-medium flex items-center gap-2 px-4 transition-all
                  ${activeCategoryId === category.id
                    ? "border-white text-white bg-white/10"
                    : "border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/5"}
                `}
                aria-label={category.name}
              >
                {category.icon && (
                  <img
                    src={`/storage/${category.icon}`}
                    alt={category.name}
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                )}
                <span className="relative">
                  {category.name}
                  {category.sites?.some((site) => {
                    const langs = site.enabled_languages
                    return !langs || langs.length === 0 || langs.includes(currentLang)
                  }) && (
                    <sup className="ml-[2px] text-[10px] font-normal text-zinc-400">
                      {
                        category.sites.filter((site) => {
                          const langs = site.enabled_languages
                          return !langs || langs.length === 0 || langs.includes(currentLang)
                        }).length
                      }
                    </sup>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* 👉 Навигационные стрелки с градиентами (Internal Navigation with Gradients) */}
        <div className="hidden md:block">
          {canScrollLeft && (
            <>
              <div className="absolute top-0 left-0 sm:left-6 lg:left-8 bottom-0 w-16 bg-gradient-to-r from-[#141415] to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scroll('left')}
                className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-6 lg:left-8 w-10 h-10 rounded-full z-20 bg-white/5 ui-glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all shadow-xl"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {canScrollRight && (
            <>
              <div className="absolute top-0 right-0 sm:right-6 lg:right-8 bottom-0 w-16 bg-gradient-to-l from-[#141415] to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scroll('right')}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 lg:right-8 w-10 h-10 rounded-full z-20 bg-white/5 ui-glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all shadow-xl"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilters