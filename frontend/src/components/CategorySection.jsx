import React from "react"
import SiteCarousel from "./SiteCarousel"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage" // ✅ импорт хука языка

/**
 * Компонент отображает одну категорию на главной странице.
 * Включает:
 * - Название категории с переводом
 * - Иконку
 * - Кнопку "Все сайты" с переводом
 * - Стрелки прокрутки с переводами
 * - Карусель сайтов
 */
const CategorySection = ({
  category,
  onSeeAllClick = () => { },
  onSiteClick = () => { },
  scrollByStep = null,
  sliders = null
}) => {
  const currentLang = useLanguage() // 🔁 Получаем текущий язык

  // 🈸 Название категории
  const name = category?.name || "Category"

  // 🌍 Перевод для кнопки "Все сайты"
  const seeAllLabel = useTranslateUniversal("category.seeAll", "All sites")

  // 👀 Перевод для aria-label (для screen reader’ов)
  const ariaLabel = useTranslateUniversal(
    "category.seeAllFor",
    `See all sites from category ${name}`,
    { name }
  )

  // ⬅️➡️ Переводы для стрелок прокрутки
  const scrollLeftLabel = useTranslateUniversal("searchResultsByCategory.scroll.left", "Scroll left")
  const scrollRightLabel = useTranslateUniversal("searchResultsByCategory.scroll.right", "Scroll right")

  // ✨ Теперь мы доверяем бэкенду. API уже фильтрует сайты по Accept-Language.
  const filteredSites = category.sites || []

  // 🎯 Логика видимости стрелок (Smart Arrows)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)
  const sliderRef = React.useRef(null)

  const checkScroll = React.useCallback(() => {
    const el = sliderRef.current
    if (!el) return
    
    // Даем небольшой допуск в 5px для точности
    const left = el.scrollLeft > 5
    const right = el.scrollLeft + el.offsetWidth < el.scrollWidth - 5
    
    setCanScrollLeft(left)
    setCanScrollRight(right)
  }, [])

  React.useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    
    checkScroll()
    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [filteredSites, checkScroll])

  return (
    <section
      className="mb-10"
      aria-labelledby={`category-${category.id}-title`}
      role="region"
    >
      {/* 🔠 Заголовок + кнопка + стрелки */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {category.icon && (
              <img
                src={`/storage/${category.icon}`}
                alt={`${name} icon`}
                className="w-8 h-8 object-contain shrink-0"
                loading="lazy"
              />
            )}
            <h2
              id={`category-${category.id}-title`}
              className="text-white text-base sm:text-lg lg:text-xl font-semibold truncate"
            >
              {name}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onSeeAllClick(category)}
              className="ui-button-glass min-w-[100px]"
              aria-label={ariaLabel}
            >
              {seeAllLabel}
              <svg
                className="w-3.5 h-3.5 opacity-50"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* ⬅️➡️ Стрелки прокрутки (Desktop) - Теперь расположены ПОСЛЕ кнопки */}
            <div className="hidden lg:flex items-center gap-2 ml-1">
              <button
                onClick={() => {
                  const el = sliderRef.current;
                  if (el) el.scrollBy({ left: -el.offsetWidth * 0.4, behavior: 'smooth' });
                }}
                className="ui-icon-btn"
                aria-label={scrollLeftLabel}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const el = sliderRef.current;
                  if (el) el.scrollBy({ left: el.offsetWidth * 0.4, behavior: 'smooth' });
                }}
                className="ui-icon-btn"
                aria-label={scrollRightLabel}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🖥️ Карусель сайтов с внутренними стрелками и градиентами */}
      <div className="w-full max-w-[1280px] mx-auto px-0 sm:px-6 lg:px-8 relative">
        
        {/* Градиенты (Desktop) */}
        <div className="hidden lg:block pointer-events-none">
          {canScrollLeft && (
            <div className="absolute top-0 left-0 sm:left-6 lg:left-8 bottom-0 w-24 bg-gradient-to-r from-[#141415] to-transparent z-10" />
          )}
          {canScrollRight && (
            <div className="absolute top-0 right-0 sm:right-6 lg:right-8 bottom-0 w-24 bg-gradient-to-l from-[#141415] to-transparent z-10" />
          )}
        </div>

        {/* Навигация (Desktop) - Убрана отсюда, возвращена в заголовок */}

        <SiteCarousel
          categoryId={category.id}
          sites={filteredSites}
          onSiteClick={onSiteClick}
          externalRef={sliderRef}
        />
      </div>
    </section>
  )
}

export default React.memo(CategorySection)