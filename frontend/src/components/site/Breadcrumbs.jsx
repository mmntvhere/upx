import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"
import { getLocalizedPath } from "@/utils/routeUtils"

const Breadcrumbs = ({ site }) => {
  const language = useLanguage()
  const tHome = useTranslateUniversal("breadcrumbs.home", "Home")
  const tCategoryName = site?.category?.name || "Category"

  return (
    <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1 sm:gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
      {/* 🏠 Главная */}
      <Link
        to={getLocalizedPath("/", language)}
        className="hover:text-white shrink-0 truncate"
      >
        {tHome}
      </Link>
      <ChevronRightIcon className="w-4 h-4 text-gray-500 shrink-0" />

      {/* 📁 Категория */}
      {site.category && (
        <>
          <Link
            to={getLocalizedPath(`/${site.category.slug}`, language)}
            className="flex items-center gap-1 hover:text-white shrink-0 truncate"
          >
            {site.category.icon && (
              <img
                src={`/storage/${site.category.icon}`}
                alt={tCategoryName}
                className="w-4 h-4 shrink-0"
              />
            )}
            <span className="truncate">{tCategoryName}</span>
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-gray-500 shrink-0" />
        </>
      )}

      {/* 📄 Название сайта */}
      <span className="text-white font-medium truncate">
        {site.name}
      </span>
    </nav>
  )
}

export default Breadcrumbs