import React from "react"
import LocalLink from "@/components/LocalLink"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import SiteHeaderRow from "../site/SiteHeaderRow"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"
import { resolveImageUrl } from "@/utils/imageUrl"

const MainImage = ({ site }) => {
  const currentLang = useLanguage()
  const tGoTo = useTranslateUniversal("common.goTo", "Go to")
  const tReview = useTranslateUniversal("common.review", "Review")
  const tGoToSite = useTranslateUniversal("common.goToSite", "Go to site")
  const tSeeAll = useTranslateUniversal("common.seeAll", "See all")
  const tSites = useTranslateUniversal("common.sites", "sites")

  if (!site.main_image) return null

  const relatedSites = (site.category?.sites || [])
    .filter((s) => s.slug !== site.slug)
    .filter((s) => {
      const langs = s.enabled_languages
      return !langs || langs.length === 0 || langs.includes(currentLang)
    })
    .slice(0, 9)

  // Фильтруем все сайты категории для корректного счетчика в кнопке "See All"
  const allRelatedSitesForLang = (site.category?.sites || []).filter((s) => {
    const langs = s.enabled_languages
    return !langs || langs.length === 0 || langs.includes(currentLang)
  })

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-2">
      {/* 🖼 Главное изображение */}
      <div
        className="w-full rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[25px] overflow-hidden relative group
        h-[180px] sm:h-[220px] md:h-[260px] lg:h-[460px] lg:w-[960px]"
      >
        <img
          src={resolveImageUrl(site.main_image)}
          alt={site.name}
          className="w-full h-full object-cover object-top"
        />

        {/* 🚀 Hover Overlay (десктоп) */}
        <div className="hidden lg:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center z-20">
          <a
            href={site.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#D80032] text-white font-medium text-sm sm:text-base flex items-center gap-2 shadow-lg hover:bg-[#b50029] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M7 7h10v10"
              />
            </svg>
            {tGoTo} {site.name}
          </a>
        </div>
      </div>

      {/* 📦 Сайты той же категории */}
      {relatedSites.length > 0 && (
        <div className="ui-site-sidebar">
          {/* Заголовок */}
          <div className="flex items-center gap-2 mb-4 px-1">
            {site.category?.icon && (
              <img
                src={resolveImageUrl(site.category.icon)}
                alt={site.category.name}
                className="w-5 h-5 object-contain"
              />
            )}
            <h2 className="ui-title-section !text-base">
              {site.category?.name}
            </h2>
          </div>

          {/* Список сайтов */}
          <div className="space-y-1.5 flex-1 overflow-auto hide-scrollbar">
            {relatedSites.map((s) => (
              <div key={s.id} className="ui-sidebar-row group">
                {/* Левая часть: фавикон и имя */}
                <div className="flex items-center gap-2.5 min-w-0">
                  {s.favicon ? (
                    <img
                      src={resolveImageUrl(s.favicon)}
                      alt={s.name}
                      className="w-5 h-5 rounded-md shrink-0 shadow-sm"
                    />
                  ) : (
                    <div className="w-5 h-5 bg-white/10 text-white/40 rounded-md text-[10px] flex items-center justify-center font-bold shrink-0">
                      ?
                    </div>
                  )}
                  <span className="text-sm text-white/80 truncate font-medium">
                    {s.name}
                  </span>
                </div>

                <ChevronRightIcon className="w-4 h-4 text-white/20 shrink-0" />

                {/* ⚡️ Кнопки при наведении (Анимация из CSS) */}
                <div className="ui-sidebar-actions">
                  <LocalLink
                    to={`/review/${s.slug}`}
                    className="flex-1 text-center py-1.5 text-[11px] bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    {tReview}
                  </LocalLink>
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 text-[11px] bg-[#D80032] text-white rounded-lg font-semibold hover:bg-[#ff003c] transition-colors shadow-lg shadow-red-500/20"
                    >
                      {tGoToSite}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Кнопка See All */}
          <div className="mt-4">
            <LocalLink
              to={`/${site.category?.slug}`}
              className="ui-card bg-white/5 hover:bg-white/10 py-2.5 text-xs text-white text-center block font-medium transition-colors"
            >
              {tSeeAll}{" "}
              <span className="text-primaryLink font-bold">
                {allRelatedSitesForLang.length}
              </span>{" "}
              {tSites}
            </LocalLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainImage