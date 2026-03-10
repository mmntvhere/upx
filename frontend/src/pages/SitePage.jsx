// src/pages/SitePage.jsx
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSiteBySlug } from "../api/siteApi"
import { useLanguage } from "@/hooks/useLanguage"
import NotFound from "./NotFound"

import { useTranslation } from "react-i18next"
import Breadcrumbs from "../components/site/Breadcrumbs"
import MainImage from "../components/site/MainImage"
import SiteDisclaimer from "../components/site/SiteDisclaimer"
import SiteHeaderRow from "../components/site/SiteHeaderRow"
import SiteDescription from "../components/site/SiteDescription"
import SiteProsCons from "../components/site/SiteProsCons"
import MobileStickyBanner from "../components/site/MobileStickyBanner"
import SimilarSitesHeader from "../components/site/SimilarSitesHeader"
import CategoryListView from "../components/CategoryListView"
import AllCategoryCard from "../components/AllCategoryCard"

const SitePage = () => {
  const language = useLanguage()
  const { slug } = useParams()
  const [site, setSite] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileBanner, setShowMobileBanner] = useState(false)


  const { t } = useTranslation()

  useEffect(() => {
    setIsLoading(true)
    fetchSiteBySlug(slug)
      .then((data) => setSite(data))
      .catch((err) => {
        console.error("Ошибка загрузки сайта:", err)
        setSite(null)
      })
      .finally(() => setIsLoading(false))
  }, [slug, language])

  if (isLoading)
    return <div className="text-white p-4">{t("sitePage.loading")}</div>
  if (!site)
    return <NotFound />



  // 🎯 Переводы: review
  const review = site.review

  // 🎯 Фильтруем похожие сайты по категории и языку
  const categorySites = (site.category?.sites || [])
    .filter((s) => s.id !== site.id)
    .filter((s) => {
      const langs = s.enabled_languages
      return !langs || langs.length === 0 || langs.includes(language)
    })

  return (
    <main className="bg-[#141415] text-white pb-10 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs site={site} />
        <MainImage site={site} />
        <SiteDisclaimer siteName={site.name} />
        <SiteHeaderRow site={site} onGoToHidden={setShowMobileBanner} />
        <SiteDescription review={review} className="mt-0" />
        <SiteProsCons site={site} />
        <SimilarSitesHeader site={site} />
        {categorySites.length > 0 && (
          <CategoryListView
            sites={categorySites.slice(0, 6)}
            isCategoryPage={false}
          />
        )}
      </div>

      <div className="w-full h-px my-6 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

      {site.allCategories?.length > 0 && (
        <div className="mt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {t("sitePage.otherCategories")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {site.allCategories.map((cat) => (
              <AllCategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      )}

      {typeof window !== "undefined" &&
        window.innerWidth < 1024 &&
        showMobileBanner && <MobileStickyBanner site={site} />}
    </main>
  )
}

export default SitePage