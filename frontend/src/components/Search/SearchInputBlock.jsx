import React from "react"
import { Search } from "lucide-react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal" // ✅ Универсальный хук перевода

/**
 * Компонент поля ввода поиска + топовые запросы
 *
 * @param {string} inputValue - текущее значение поиска
 * @param {function} setInputValue - функция обновления
 * @param {string[]} topSearches - массив популярных поисковых запросов
 */
const SearchInputBlock = ({ inputValue, setInputValue, topSearches = [] }) => {
  const tPlaceholder = useTranslateUniversal("searchInputBlock.placeholder", "Пошук сайтів...")
  const tClear = useTranslateUniversal("searchInputBlock.clear", "Очистити")
  const tSearch = useTranslateUniversal("searchInputBlock.search", "Пошук")
  const tTopSearches = useTranslateUniversal("searchInputBlock.topSearches", "Популярні запити")

  return (
    <div className="px-5">
      {/* 🔍 Поле поиска */}
      <div className="bg-[#F4F4F6] rounded-xl flex items-center px-4 py-2 mb-3 relative">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder={tPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent outline-none flex-1 placeholder-gray-500 text-base pr-8"
          aria-label={tSearch}
        />
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 min-w-[16px] min-h-[16px] rounded-full bg-[#6f7480] flex items-center justify-center p-0"
            aria-label={tClear}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[10px] h-[10px] text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* 🔥 Популярные запросы */}
      {!inputValue && topSearches.length > 0 && (
        <>
          <div className="text-center text-sm text-gray-500 mb-3">
            {tTopSearches} <span role="img" aria-label="fire">🔥</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {topSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(term)}
                className="search-term-btn bg-[#F4F4F6] text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                {term}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchInputBlock