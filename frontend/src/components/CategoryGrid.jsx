// src/components/CategoryGrid.jsx
import React from "react"
import SiteCard from "./SiteCard"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal" // ✅ импортируем хук

const CategoryGrid = ({ category, onSiteClick, viewType = "grid" }) => {
  const noSitesText = useTranslateUniversal("searchResults.noSites", "Сайти не знайдені.") // ✅ перевод

  if (!category?.sites?.length) {
    return (
      <div className="w-full text-sm text-zinc-400 py-10 text-center">
        {noSitesText}
      </div>
    )
  }

  const getGridClasses = () => {
    switch (viewType) {
      case "list":
        return "flex flex-col gap-4"
      case "compact":
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      case "grid":
      default:
        return "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    }
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className={getGridClasses()}>
        {category.sites.map((site) => (
          <SiteCard
            key={site.slug}
            site={site}
            onClick={onSiteClick}
            isGrid={viewType !== "list"}
            isList={viewType === "list"}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoryGrid