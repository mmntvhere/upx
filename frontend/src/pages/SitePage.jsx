import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/hooks/useLanguage"
import { fetchSiteBySlug } from "../api/siteApi"
import DOMPurify from "dompurify"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import SEO from "@/components/SEO"
import NotFound from "./NotFound"
import Breadcrumbs from "@/components/common/Breadcrumbs"
import MainImage from "../components/site/MainImage"
import SiteDisclaimer from "../components/site/SiteDisclaimer"
import SiteHeaderRow from "../components/site/SiteHeaderRow"
import SiteDescription from "../components/site/SiteDescription"
import SiteProsCons from "../components/site/SiteProsCons"
import SimilarSitesHeader from "../components/site/SimilarSitesHeader"
import CategoryGridView from "../components/CategoryGridView"
import MobileSiteModal from "../components/MobileSiteModal"
import CategorySeoCard from "../components/CategorySeoCard"
import MobileStickyBanner from "../components/site/MobileStickyBanner"
import SiteSummaryCard from "../components/site/SiteSummaryCard"
import { useCategories } from "@/contexts/CategoryContext"

const SitePage = () => {
  const { slug } = useParams()
  const { t } = useTranslation()
  const language = useLanguage() // ✅ Fix: returns string, not object
  const navigate = useLocalNavigate()
  const { categories } = useCategories()
  const [site, setSite] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSite, setSelectedSite] = useState(null)
  const [showMobileBanner, setShowMobileBanner] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setSite(null) // ✅ Reset site state before fetching new one
    fetchSiteBySlug(slug)
      .then((data) => setSite(data))
      .catch((err) => console.error("Error fetching site:", err))
      .finally(() => setIsLoading(false))
  }, [slug, language])

  // 🎯 Фильтруем похожие сайты по категории и языку
  const categorySites = (site?.category?.sites || [])
    .filter((s) => s.id !== site?.id)
    .filter((s) => {
      const langs = s.enabled_languages
      return !langs || langs.length === 0 || langs.includes(language)
    })

  const handleSiteClick = (s) => {
    if (window.innerWidth < 1024) {
      setSelectedSite(s)
    } else {
      navigate(`/review/${s.slug}`)
    }
  }

  return (
    <>
      <SEO
        title={site?.seo_title || site?.name}
        description={site?.seo_description}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "WebSite",
            "name": site?.name,
            "url": site?.link
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": site?.rating || 5,
            "bestRating": "5"
          },
          "author": {
            "@type": "Organization",
            "name": "BeInPorn"
          }
        }}
      />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-primaryLink border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !site ? (
        <NotFound />
      ) : (
        <main className="bg-[#141415] text-white pb-10 relative">
          <div className="ui-container pt-6">
            <Breadcrumbs site={site} />
            <MainImage site={site} />
            <SiteDisclaimer siteName={site.name} />
            <SiteHeaderRow site={site} onGoToHidden={setShowMobileBanner} />
            <SiteDescription review={DOMPurify.sanitize(site.review || "")} className="mt-0" />
            {/* 🏗 Super Section: Verdict & Pros/Cons Grid */}
            <div className="ui-site-grid-section">
              {/* Pros/Cons (1st on mobile, 2nd on desktop) */}
              <div className="lg:col-span-4 flex flex-col h-full order-1 lg:order-2">
                <SiteProsCons site={site} vertical={true} />
              </div>

              {/* Verdict (2nd on mobile, 1st on desktop) */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                <SiteSummaryCard
                  rating={site.rating || 4.5}
                  title={site.name}
                  favicon={site.favicon}
                  description={t("siteVerdict.description")}
                />
              </div>
            </div>

            <SimilarSitesHeader site={site} />

            {categorySites.length > 0 && (
              <div className="mb-10">
                <CategoryGridView
                  sites={categorySites}
                  viewType="grid"
                  onSiteClick={handleSiteClick}
                />
              </div>
            )}

            <div className="ui-line-gradient my-10" />

            {categories.length > 0 && (
              <div className="mt-8">
                <h2 className="ui-title-section mb-6">
                  {t("categoryPage.otherCategories")}
                </h2>
                <div className="ui-seo-grid">
                  {categories
                    .filter((cat) => cat.id !== site?.category_id)
                    .map((cat) => (
                      <CategorySeoCard key={cat.id} category={cat} />
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* 📱 Модалка сайта */}
          {selectedSite && (
            <MobileSiteModal site={selectedSite} onClose={() => setSelectedSite(null)} />
          )}

          {typeof window !== "undefined" &&
            window.innerWidth < 1024 &&
            showMobileBanner && <MobileStickyBanner site={site} />}
        </main>
      )}
    </>
  )
}

export default SitePage