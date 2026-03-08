import { useNavigate } from "react-router-dom"
import { getLocalizedPath } from "@/utils/routeUtils"

/**
 * Карточка категории: отображает иконку, название и список сайтов
 */
const AllCategoryCard = ({ category }) => {
  const navigate = useNavigate()

  // Обрезаем до 4 сайтов для превью
  const displayedSites = category?.sites?.slice(0, 4) || []

  // 🔁 Перевод названия категории
  const translatedName = useTranslateUniversal(category.name, category.name)

  return (
    <div
      onClick={() => navigate(`/${category.slug}`)}
      className="filter-glow-area relative cursor-pointer rounded-2xl p-[2px] group transition hover:shadow-lg"
    >
      <div className="w-full h-full rounded-[15px] p-4 sm:p-5 bg-[#1f1f1f]">
        {/* 🔰 Иконка категории + название */}
        <div className="flex items-center gap-2 mb-4">
          {category.icon && (
            <img
              src={`/storage/${category.icon}`}
              alt={translatedName}
              className="w-6 h-6"
            />
          )}
          <h3 className="text-[16px] sm:text-[18px] font-semibold text-white">
            {translatedName}
          </h3>
        </div>

        {/* 🌐 Favicon'ы сайтов и стрелка */}
        <div className="flex items-center justify-between">
          {/* ✅ Сайты: фавиконки */}
          <div className="flex -space-x-3">
            {displayedSites.map((site) => (
              <div
                key={site.id}
                className="w-9 h-9 rounded-full border-2 border-[#141415] bg-gray-200 overflow-hidden"
                title={site.name}
              >
                {site.favicon ? (
                  <img
                    src={
                      site.favicon.startsWith("http")
                        ? site.favicon
                        : `/storage/${site.favicon}`
                    }
                    alt={site.name}
                    className="w-full h-full object-contain p-[2px]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    ?
                  </div>
                )}
              </div>
            ))}

            {/* ➕ Если больше 4 сайтов — выводим "+X" */}
            {category.sites && category.sites.length > displayedSites.length && (
              <div className="w-9 h-9 rounded-full bg-[#E4E6EA] border-2 border-[#141415] flex items-center justify-center text-xs text-[#141415] font-medium">
                +{category.sites.length - displayedSites.length}
              </div>
            )}
          </div>

          {/* ➡️ Стрелка */}
          <div className="w-[36px] h-[36px] rounded-full bg-[#D80032] flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:rotate-45">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 19L19 5" />
              <path d="M5 5h14v14" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllCategoryCard