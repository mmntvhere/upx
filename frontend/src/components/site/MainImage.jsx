import React from "react"
import LocalLink from "@/components/LocalLink"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import SiteHeaderRow from "../site/SiteHeaderRow"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"

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
          src={`/storage/${site.main_image}`}
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
        <div className="hidden lg:flex flex-col justify-between w-full max-w-[260px] h-[460px]">
          {/* Заголовок */}
          <div className="flex items-center gap-2 mb-4">
            {site.category?.icon && (
              <img
                src={`/storage/${site.category.icon}`}
                alt={site.category.name}
                className="w-6 h-6"
              />
            )}
            <h2 className="text-white text-lg font-semibold">
              {site.category?.name}
            </h2>
          </div>

          {/* Список сайтов */}
          <div className="space-y-3 flex-1 overflow-auto pr-1">
            {relatedSites.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between group hover:bg-white/5 px-3 py-2 rounded-lg transition relative"
              >
                {/* Левая часть: фавикон и имя */}
                <div className="flex items-center gap-2 shrink-0">
                  {s.favicon ? (
                    <img
                      src={`/storage/${s.favicon}`}
                      alt={s.name}
                      className="w-5 h-5 rounded-sm shrink-0"
                    />
                  ) : (
                    <div className="w-5 h-5 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center font-bold shrink-0">
                      ?
                    </div>
                  )}
                  <span className="text-sm text-[#EDF2F4] truncate max-w-[130px] group-hover:hidden">
                    {s.name}
                  </span>
                </div>

                <ChevronRightIcon className="w-4 h-4 text-white opacity-60 group-hover:hidden transition shrink-0" />

                {/* Кнопки при наведении */}
                <div className="absolute inset-y-0 left-[44px] right-3 hidden group-hover:flex gap-2 items-center z-10">
                  <LocalLink
                    to={`/review/${s.slug}`}
                    className="flex-1 text-center px-3 py-1.5 text-xs bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition"
                  >
                    {tReview}
                  </LocalLink>
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-1.5 text-xs bg-[#D80032]/70 text-white rounded-xl font-medium hover:bg-[#D80032] transition"
                    >
                      {tGoToSite}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Кнопка See All */}
          <div className="filter-glow-button mt-4">
            <LocalLink
              to={`/${site.category?.slug}`}
              className="text-sm text-white text-center block"
            >
              {tSeeAll}{" "}
              <span className="text-[#D80032] font-semibold">
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