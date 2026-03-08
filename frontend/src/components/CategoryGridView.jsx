import React from "react"
import SiteCard from "./SiteCard"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage" // ✅ подключаем хук языка

const CategoryGridView = ({ sites, onSiteClick }) => {
  const currentLang = useLanguage()
  const notFoundText = useTranslateUniversal("category.noSites", "Сайти не знайдені")

  if (!sites?.length) {
    return (
      <div className="w-full text-sm text-zinc-400 py-10">
        {notFoundText}
      </div>
    )
  }

  // 🔍 Логируем язык и позиции
  console.log(
  "📊 Сайты с позициями:",
  sites.map((s) => ({
    name: s.name,
    slug: s.slug,
    pos: s.position_per_lang?.[currentLang] ?? "—",
    langs: s.enabled_languages?.length ? s.enabled_languages : "Universal",
    full: s.position_per_lang,
  }))
)

 // 🧼 Фильтруем сайты по языку
const filteredSites = sites.filter((site) => {
  const langs = site.enabled_languages
  return !langs || langs.length === 0 || langs.includes(currentLang)
})

// 🔽 Сортировка по позиции
const sortedSites = [...filteredSites].sort((a, b) => {
  const aPos = a.position_per_lang?.[currentLang] ?? 9999
  const bPos = b.position_per_lang?.[currentLang] ?? 9999
  return aPos - bPos
})

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sortedSites.map((site) => (
          <SiteCard
            key={site.slug}
            site={site}
            onClick={onSiteClick}
            isGrid={true}
            isList={false}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryGridView