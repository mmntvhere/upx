// /src/components/Breadcrumbs.jsx
import LocalLink from "@/components/LocalLink"

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
      <LocalLink
        to="/"
        className="hover:underline text-orange-500 font-semibold"
      >
        Home
      </LocalLink>

      {/* ⬆️ Родительская категория */}
      {category?.parent && (
        <>
          <span>›</span>
          <LocalLink
            to={`/${category.parent.slug}`}
            className="hover:underline text-gray-500"
          >
            {translatedParentName}
          </LocalLink>
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