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
  const idealLabel = useTranslateUniversal("searchAndFilters.ideal")
  const scrollRightLabel = useTranslateUniversal("searchAndFilters.scrollRight")

  // 📐 Проверка, нужно ли показывать кнопку прокрутки (если контент выходит за пределы экрана)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const updateScroll = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth)
    }

    updateScroll()
    window.addEventListener("resize", updateScroll)
    return () => window.removeEventListener("resize", updateScroll)
  }, [categories])

  // ⏩ Прокрутка вправо
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
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
            className="filter-glow-button h-[38px] sm:h-[44px] flex items-center justify-start gap-2 px-4 text-white text-sm font-medium whitespace-nowrap grow basis-3/4"
            aria-label={searchLabel}
          >
            <Search className="w-4 h-4 text-white shrink-0" />
            <span className="truncate text-left w-full">{searchLabel}</span>
          </button>

          {/* ✨ Кнопка "Підібрати ідеальний сайт" */}
          <button
            onClick={() => console.log("Підібрати")}
            type="button"
            className="ideal-site-button h-[38px] sm:h-[44px] flex items-center justify-center gap-2 px-4 text-white text-sm font-medium whitespace-nowrap grow basis-1/4"
            aria-label={idealLabel}
          >
            <Sparkles size={18} strokeWidth={2} />
            <span>{idealLabel}</span>
          </button>
        </div>
      </div>

      {/* ⚡ Горизонтальный скролл категорий */}
      <div className="relative pl-4 pr-0 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`h-[38px] sm:h-[44px] rounded-full border text-sm font-medium flex items-center gap-2 shrink-0 transition-all
                ${activeCategoryId === category.id
                  ? "border-white text-white"
                  : "border-[#404040] text-zinc-300 hover:border-[#666]"}
                bg-transparent
                ${index === 0 ? "pl-0 pr-4" : "px-4"}
              `}
              aria-label={category.name}
            >
              {category.icon && (
                <img
                  src={`/storage/${category.icon}`}
                  alt={category.name}
                  className="w-5 h-5 object-contain"
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
          ))}
        </div>

        {/* 👉 Градиент + кнопка прокрутки */}
        {isScrollable && (
          <>
            <div className="hidden md:block absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-[#141415] to-transparent pointer-events-none z-10" />
            <button
              onClick={scrollRight}
              className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 rounded-xl z-20 border border-zinc-600 bg-[#141415] hover:border-zinc-400 transition"
              aria-label={scrollRightLabel}
            >
              <svg
                className="w-4 h-4 text-zinc-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchAndFilters