import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/hooks/useLanguage"
import { fetchSiteBySlug } from "../api/siteApi"
import DOMPurify from "dompurify"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import SEO from "@/components/SEO"
import NotFound from "./NotFound"
import Breadcrumbs from "../components/site/Breadcrumbs"
import MainImage from "../components/site/MainImage"
import SiteDisclaimer from "../components/site/SiteDisclaimer"
import SiteHeaderRow from "../components/site/SiteHeaderRow"
import SiteDescription from "../components/site/SiteDescription"
import SiteProsCons from "../components/site/SiteProsCons"
import SimilarSitesHeader from "../components/site/SimilarSitesHeader"
import CategoryGridView from "../components/CategoryGridView"
import MobileSiteModal from "../components/MobileSiteModal"
import AllCategoryCard from "../components/AllCategoryCard"
import MobileStickyBanner from "../components/site/MobileStickyBanner"

const SitePage = () => {
  const { slug } = useParams()
  const { t } = useTranslation()
  const language = useLanguage() // ✅ Fix: returns string, not object
  const navigate = useLocalNavigate()
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
        title={site?.seo_title || site?.name || slug} 
        description={site?.seo_description || `${site?.name || slug} review and ratings on UPX.`} 
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
            <SiteProsCons site={site} />
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

            {site.allCategories?.length > 0 && (
              <div className="mt-8">
                <h2 className="ui-title-section mb-6">
                  {t("sitePage.otherCategories")}
                </h2>
                <div className="ui-seo-grid">
                  {site.allCategories.map((cat) => (
                    <AllCategoryCard key={cat.id} category={cat} />
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