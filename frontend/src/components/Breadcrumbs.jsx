// /src/components/Breadcrumbs.jsx
import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"
import { getLocalizedPath } from "@/utils/routeUtils"

/**
 * Хлебные крошки (навигация по категориям)
 */
const Breadcrumbs = ({ category }) => {
  const language = useLanguage()
  const translate = useTranslateUniversal

  const translatedParentName =
    typeof category?.parent?.name === "object"
      ? translate(category.parent.name, category.parent.name?.en)
      : category?.parent?.name

  const translatedCategoryName =
    typeof category?.name === "object"
      ? translate(category.name, category.name?.en)
      : category?.name

  return (
    <nav className="text-sm text-gray-500 flex items-center gap-2 mb-4">
      {/* 🏠 Главная */}
      <Link
        to={getLocalizedPath("/", language)}
        className="hover:underline text-orange-500 font-semibold"
      >
        Home
      </Link>

      {/* ⬆️ Родительская категория */}
      {category?.parent && (
        <>
          <span>›</span>
          <Link
            to={getLocalizedPath(`/${category.parent.slug}`, language)}
            className="hover:underline text-gray-500"
          >
            {translatedParentName}
          </Link>
        </>
      )}

      {/* 📂 Текущая категория */}
      <span>›</span>
      <span className="text-gray-700 font-medium flex items-center gap-1">
        {category.icon && (
          <img
            src={`/storage/${category.icon}`}
            alt={translatedCategoryName}
            className="w-4 h-4 inline"
          />
        )}
        {translatedCategoryName}
      </span>
    </nav>
  )
}

export default Breadcrumbs