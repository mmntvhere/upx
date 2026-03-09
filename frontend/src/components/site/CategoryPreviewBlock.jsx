// src/components/site/CategoryPreviewBlock.jsx
import React from "react"
import LocalLink from "@/components/LocalLink"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"


const CategoryPreviewBlock = ({ category, currentSiteSlug }) => {

  // 🧠 Перевод названия категории
  const translatedCategoryName = category?.name || "Category"

  // 🧠 UI-переводы
  const tSeeAll = useTranslateUniversal("common.seeAll", "See all")
  const tSites = useTranslateUniversal("common.sites", "sites")

  if (!category || !category.sites || category.sites.length === 0) return null

  const previewSites = category.sites.filter(s => s.slug !== currentSiteSlug).slice(0, 6)

  return (
    <div className="hidden lg:flex flex-col w-full max-w-[340px] h-full pl-6">
      {/* Заголовок */}
      <div className="flex items-center gap-2 mb-5">
        {category.icon ? (
          <img
            src={`/storage/${category.icon}`}
            alt={translatedCategoryName}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm text-white font-bold">
            {translatedCategoryName.charAt(0)}
          </div>
        )}
        <h2 className="text-white font-semibold text-base">{translatedCategoryName}</h2>
      </div>

      {/* Сайты */}
      <div className="space-y-3 flex-1 overflow-hidden">
        {previewSites.map((site, index) => {
          return (
            <LocalLink
              to={`/review/${site.slug}`}
              key={site.id}
              className="flex items-center justify-between gap-2 px-2 py-1 rounded-md hover:bg-white/5 transition group"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/40 w-4">{index + 1}</span>
                <img
                  src={site.favicon ? `/storage/${site.favicon}` : "/default-favicon.png"}
                  alt={site?.name || "Site"}
                  className="w-5 h-5 rounded-sm object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium leading-none truncate max-w-[160px]">
                    {site?.name || "Site"}
                  </span>
                  <span className="text-xs text-white/40 leading-none truncate max-w-[160px]">
                    {new URL(site.url).hostname}
                  </span>
                </div>
              </div>
              <span className="text-white/30 group-hover:text-white text-sm">›</span>
            </LocalLink>
          )
        })}
      </div>

      {/* Кнопка See All */}
      <LocalLink
        to={`/${category.slug}`}
        className="mt-6 text-sm font-medium text-center text-white border border-white/10 rounded-xl py-2 hover:bg-white/5 transition"
      >
        {tSeeAll} <span className="text-[#D80032] font-semibold">{category.sites.length}</span> {tSites}
      </LocalLink>
    </div>
  )
}

export default CategoryPreviewBlock