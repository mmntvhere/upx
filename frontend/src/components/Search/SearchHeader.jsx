import React from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal" // ✅ Унифицированный хук

/**
 * Заголовок окна поиска (мобильный/десктоп).
 *
 * @param {Function} onClose - функция закрытия окна
 */
const SearchHeader = ({ onClose }) => {
  const tTitle = useTranslateUniversal("searchHeader.title", "Пошук")
  const tClose = useTranslateUniversal("searchHeader.close", "Закрити")

  return (
    <div className="sticky top-0 z-10 bg-[#fff] px-4 pt-6 pb-4">
      <div className="flex justify-between items-center">
        {/* Заголовок */}
        <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#141415] tracking-normal">
          {tTitle}
        </h2>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="w-6 h-6 p-0 flex items-center justify-center bg-transparent border-none outline-none"
          style={{ color: "rgb(111, 116, 128)" }}
          aria-label={tClose}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchHeader