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
  // Повторная фильтрация здесь приводила к багам при несинхронном обновлении контекста языка.
  const filteredSites = category.sites || []

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
                className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Стрелки прокрутки (десктоп) */}
            <button
              onClick={() => scrollByStep?.(category.id, "left")}
              className="hidden lg:flex ui-icon-btn"
              aria-label={scrollLeftLabel}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => scrollByStep?.(category.id, "right")}
              className="hidden lg:flex ui-icon-btn"
              aria-label={scrollRightLabel}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 🖥️ Карусель сайтов */}
      <div className="w-full max-w-[1280px] mx-auto px-0 sm:px-6 lg:px-8">
        <SiteCarousel
          categoryId={category.id}
          sites={filteredSites}
          onSiteClick={onSiteClick}
          scrollByStep={scrollByStep}
          sliders={sliders}
        />
      </div>
    </section>
  )
}

export default CategorySection