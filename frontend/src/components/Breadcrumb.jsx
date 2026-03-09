import LocalLink from "@/components/LocalLink"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"

/**
 * Компонент хлебных крошек
 *
 * @param {string} basePath — ссылка на корень (обычно "/")
 * @param {string} baseLabel — ключ перевода (например, "categoryPage.breadcrumbHome")
 * @param {object} category — объект категории с icon, name, name_translations
 */
const Breadcrumb = ({ basePath = "/", baseLabel = "categoryPage.breadcrumbHome", category }) => {
  const language = useLanguage()
  const translatedBase = useTranslateUniversal(baseLabel) || "Home"
  const translatedName = category?.name || "Category"

  return (
    <nav className="text-sm text-gray-400 mb-4 flex items-center space-x-2 overflow-hidden whitespace-nowrap">
      <LocalLink to={basePath} className="hover:text-white shrink-0">
        {translatedBase}
      </LocalLink>
      <span className="text-gray-600 shrink-0">/</span>
      <span className="flex items-center gap-2 text-white font-medium min-w-0">
        {category?.icon && (
          <img
            src={`/storage/${category.icon}`}
            alt={translatedName}
            className="w-5 h-5 object-contain shrink-0"
          />
        )}
        <span className="truncate block max-w-[200px]" title={translatedName}>
          {translatedName}
        </span>
      </span>
    </nav>
  )
}

export default Breadcrumb