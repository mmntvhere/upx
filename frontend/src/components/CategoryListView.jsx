import React from "react"
import SiteListCard from "./SiteListCard"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage" // ✅ добавляем хук языка

const CategoryListView = ({ sites, onSiteClick, isSlice = false, excludeSiteId }) => {
  const currentLang = useLanguage()
  const notFoundText = useTranslateUniversal("category.noSites", "No sites found")

  if (!sites?.length) {
    return (
      <div className="w-full text-sm text-zinc-400 py-10">
        {notFoundText}
      </div>
    )
  }

  // 🧼 Фильтрация по языку
  let filteredSites = sites.filter((site) => {
    const langs = site.enabled_languages
    return !langs || langs.length === 0 || langs.includes(currentLang)
  })

  // 🧼 Исключаем конкретный ID
  if (excludeSiteId) {
    filteredSites = filteredSites.filter((site) => site.id !== excludeSiteId)
  }

  // 🔽 Финальный список для рендеринга (без внутренней сортировки)
  const finalSites = isSlice 
    ? (window.innerWidth < 1024 ? filteredSites.slice(0, 5) : filteredSites.slice(0, 6))
    : filteredSites

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {finalSites.map((site) => (
          <SiteListCard
            key={site.slug}
            site={site}
            onClick={() => onSiteClick?.(site)}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryListView