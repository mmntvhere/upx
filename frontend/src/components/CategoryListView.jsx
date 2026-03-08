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

  // 🔍 Логируем перед фильтрацией
  console.log(
    "📋 ListView - сайты до фильтрации:",
    sites.map((s) => ({
      name: s.name,
      slug: s.slug,
      pos: s.position_per_lang?.[currentLang] ?? "—",
      langs: s.enabled_languages?.length ? s.enabled_languages : "Universal"
    }))
  )

  // 🧼 Фильтрация по языку
  let filteredSites = sites.filter((site) => {
    const langs = site.enabled_languages
    return !langs || langs.length === 0 || langs.includes(currentLang)
  })

  // 🧼 Исключаем конкретный ID
  if (excludeSiteId) {
    filteredSites = filteredSites.filter((site) => site.id !== excludeSiteId)
  }

  // 🔽 Сортировка по позиции
  filteredSites.sort((a, b) => {
    const aPos = a.position_per_lang?.[currentLang] ?? 9999
    const bPos = b.position_per_lang?.[currentLang] ?? 9999
    return aPos - bPos
  })

  // ✂️ Обрезка по количеству
  if (isSlice) {
    filteredSites = window.innerWidth < 1024
      ? filteredSites.slice(0, 5)
      : filteredSites.slice(0, 6)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSites.map((site) => (
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