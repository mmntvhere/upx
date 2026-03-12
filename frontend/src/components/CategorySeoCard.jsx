import LocalLink from "@/components/LocalLink"
import { resolveImageUrl } from "@/utils/imageUrl"
const CategorySeoCard = ({ category }) => {

  const name = category.name

  // Ограничиваем вывод максимум 4 сайтами
  const displayedSites = category.sites.slice(0, 4)

  return (
    <LocalLink
      to={`/${category.slug}`}
      className="filter-glow-area relative cursor-pointer rounded-2xl p-[2px] group transition hover:shadow-lg"
    >
      <div className="w-full h-full rounded-[15px] p-4 sm:p-5">
        {/* 🧩 Иконка и название категории */}
        <div className="flex items-center gap-2 mb-4">
          {category.icon && (
            <img
              src={resolveImageUrl(category.icon)}
              alt={name}
              className="w-6 h-6"
            />
          )}
          <h3 className="text-[16px] sm:text-[18px] font-semibold text-white">
            {name}
          </h3>
        </div>

        {/* 🔗 Сайты и стрелка */}
        <div className="flex items-center justify-between">
          {/* 🔘 Favicon'ы сайтов */}
          <div className="flex -space-x-3">
            {displayedSites.map((site) => (
              <div
                key={site.id}
                className="w-9 h-9 rounded-full border-2 border-[#141415] bg-gray-200 overflow-hidden"
                title={site.name}
              >
                {site.favicon ? (
                  <img
                    src={resolveImageUrl(site.favicon)}
                    alt={site.name}
                    className="w-full h-full object-contain p-[2px]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">?</div>
                )}
              </div>
            ))}

            {/* ➕ Ещё сайты */}
            {category.sites.length > displayedSites.length && (
              <div className="w-9 h-9 rounded-full bg-[#E4E6EA] border-2 border-[#141415] flex items-center justify-center text-xs text-[#141415] font-medium">
                +{category.sites.length - displayedSites.length}
              </div>
            )}
          </div>

          {/* 🔺 Кнопка перехода */}
          <div
            className="w-[36px] h-[36px] rounded-full bg-[#D80032] flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:rotate-45"
          >
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
    </LocalLink>
  )
}

export default CategorySeoCard