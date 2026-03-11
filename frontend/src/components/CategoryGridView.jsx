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

  // 🧼 Фильтруем сайты по языку
  const filteredSites = sites.filter((site) => {
    const langs = site.enabled_languages
    return !langs || langs.length === 0 || langs.includes(currentLang)
  })

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredSites.map((site) => (
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