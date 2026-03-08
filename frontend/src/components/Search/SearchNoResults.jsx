import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

/**
 * Компонент отображается, если по запросу ничего не найдено.
 * Также показывает предложенные сайты.
 */
const SearchNoResults = ({ setInputValue, suggestedSites = [], onClose }) => {
  const navigate = useNavigate()

  // 📦 Переводы UI
  const tNotFound = useTranslateUniversal("searchNoResults.notFound", "Nothing found")
  const tCheckSpelling = useTranslateUniversal("searchNoResults.checkSpelling", "Check spelling or use different keywords.")
  const tTryAnother = useTranslateUniversal("searchNoResults.tryAnother", "Try another search.")
  const tClearSearch = useTranslateUniversal("searchNoResults.clearSearch", "Clear search")
  const tSuggested = useTranslateUniversal("searchNoResults.suggested", "Suggested for you")
  const tNoPreview = useTranslateUniversal("searchNoResults.noPreview", "No preview")

  return (
    <div className="flex flex-col items-center justify-center text-center py-6 text-[#141415]">
      {/* 🔍 Иконка поиска */}
      <svg className="w-16 h-16 text-[#6f7480] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>

      {/* 🧾 Текст "ничего не найдено" */}
      <p className="text-xl font-semibold mb-2">{tNotFound}</p>

      {/* ✍️ Подсказка по проверке запроса */}
      <p className="text-sm text-gray-500 mb-3">
        {tCheckSpelling}<br />
        {tTryAnother}
      </p>

      {/* 🔄 Кнопка очистки поиска */}
      <button
        onClick={() => setInputValue("")}
        className="px-5 py-2 rounded-[12px] bg-[#005CFF] hover:bg-[#004DE0] text-white text-sm font-medium transition"
      >
        {tClearSearch}
      </button>

      {/* 💡 Блок "вам может понравиться" */}
      <div className="mt-12 text-left w-full px-5">
        <h3 className="text-[20px] font-semibold text-[#141415] mb-3">
          {tSuggested}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1024px] mx-auto">
          {suggestedSites.slice(0, 8).map((site, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(`/review/${site.slug}`)
                onClose()
              }}
              className="cursor-pointer"
            >
              <div className="w-full aspect-[3/4] bg-[#F4F4F6] rounded-xl overflow-hidden">
                {site.preview ? (
                  <img
                    src={site.preview.startsWith("http") ? site.preview : `/storage/${site.preview}`}
                    alt={site.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    {tNoPreview}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchNoResults