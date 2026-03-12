import React from "react"
import CompactCarousel from "../CompactCarousel"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"

const SearchResultsByCategory = ({
  filteredCategories,
  scrollRefs,
  navigate,
  onClose,
  scroll,
  handleSeeAll
}) => {
  const currentLang = useLanguage()

  const tAllSites = useTranslateUniversal("searchResultsByCategory.allSites", "All sites")
  const tScrollLeft = useTranslateUniversal("searchResultsByCategory.scroll.left", "Scroll left")
  const tScrollRight = useTranslateUniversal("searchResultsByCategory.scroll.right", "Scroll right")

  return (
    <div className="space-y-12 pb-[90px] sm:pb-[80px]">
      {filteredCategories.map((category) => {
        const categoryName = category.name

        // 🧼 Фильтруем сайты по языку
        const filteredSites = category.sites.filter((site) => {
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
          <div key={category.id} className="space-y-2">
            <div className="px-5">
              <div className="flex items-center justify-between">
                {/* Заголовок категории с иконкой */}
                <div className="flex items-center gap-2 text-[16px] sm:text-lg font-semibold text-[#141415]">
                  {category.icon && (
                    <img
                      src={`/storage/${category.icon?.trim()}`}
                      alt={category.name}
                      className="w-6 h-6"
                    />
                  )}
                  {categoryName}
                </div>

                {/* Кнопка "Все сайты" и стрелки прокрутки */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSeeAll(category)}
                    className="ui-button-glass min-w-[90px]"
                  >
                    {tAllSites}
                    <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Стрелки прокрутки (десктоп) */}
                  <div className="hidden sm:flex gap-2">
                    {["left", "right"].map((dir) => (
                      <button
                        key={dir}
                        onClick={() => scroll(category.id, dir)}
                        className="ui-icon-btn h-7 w-7 sm:h-8 sm:w-8"
                        aria-label={dir === "left" ? tScrollLeft : tScrollRight}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d={dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Карусель сайтов */}
            <CompactCarousel
              ref={(el) => (scrollRefs.current[category.id] = el)}
              sites={sortedSites}
              onSiteClick={(site) => {
                onClose()
                setTimeout(() => navigate(`/review/${site.slug}`), 100)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default SearchResultsByCategory