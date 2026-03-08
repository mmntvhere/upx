import React from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

// 🎨 Иконка фильтра (SVG)
const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18M6 12h12M10 18h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

/**
 * Компонент кнопки "Підібрати ідеальний сайт"
 *
 * @param {Function} onClick — коллбэк при клике
 */
const FilterButton = ({ onClick }) => {
  // 🧠 Получаем перевод с fallback
  const label = useTranslateUniversal(
    "searchAndFilters.ideal",
    "Find your ideal site"
  )

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={label}
      className="filter-glow-button w-full flex items-center justify-center gap-2"
    >
      <FilterIcon />
      <span className="text-sm font-medium whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}

export default FilterButton