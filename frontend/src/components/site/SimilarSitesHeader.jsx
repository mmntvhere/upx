import React from "react"
import LocalLink from "@/components/LocalLink"
import { ArrowRight } from "lucide-react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"

const SimilarSitesHeader = ({ site }) => {
  const currentLang = useLanguage()

  // UI-тексты
  const tLike = useTranslateUniversal("sitePage.like", "like")
  const tMoreSites = useTranslateUniversal("sitePage.moreSites", "More sites like", { name: site?.name })

  if (!site || !site.category) return null

  const { category } = site
  
  // 🧼 Фильтруем сайты по текущему языку
  const filteredSites = (category.sites || []).filter((s) => {
    const langs = s.enabled_languages
    // Если список языков пуст — доступно везде. Иначе только если текущий язык в списке
    return !langs || langs.length === 0 || langs.includes(currentLang)
  })
  
  // Исключаем текущий сайт из списка "похожих"
  const similarSites = filteredSites.filter(s => s.id !== site.id)
  const count = similarSites.length

  // Перевод названия категории
  const translatedCategory = category?.name

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mt-10 mb-6 px-2 md:px-0">
      {/* Левая часть — иконка и заголовок */}
      <div className="flex items-center gap-2 text-white font-semibold text-base md:text-lg leading-snug">
        {category.icon && (
          <img
            src={`/storage/${category.icon}`}
            alt={translatedCategory}
            className="w-5 h-5 object-contain opacity-70"
          />
        )}
        <h2 className="text-white text-base md:text-lg font-bold">
          {count > 0
            ? `${count}+ ${translatedCategory} ${tLike} ${site.name}`
            : tMoreSites}
        </h2>
      </div>

      {/* Правая часть — кнопка */}
      {count > 0 && (
        <LocalLink
          to={`/${category.slug}`}
          className="filter-glow-button mt-3 md:mt-0 inline-flex items-center px-4 py-1.5 border border-zinc-500 text-sm font-medium text-zinc-300 rounded-lg"
        >
          +{count} {translatedCategory}
          <ArrowRight className="w-4 h-4 ml-2" />
        </LocalLink>
      )}
    </div>
  )
}

export default SimilarSitesHeader