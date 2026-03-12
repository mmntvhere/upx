// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import { fetchBanners } from "../api/bannerApi"
import CategorySection from "../components/CategorySection"
import CategoryGrid from "../components/CategoryGrid"
import SearchAndFilters from "../components/SearchAndFilters"
import SearchOverlay from "../components/SearchOverlay"
import MobileSiteModal from "../components/MobileSiteModal"
import { useTranslation } from "react-i18next"
import { useCategories } from "@/contexts/CategoryContext"

import { motion, AnimatePresence } from "framer-motion"
import SEO from "@/components/SEO"

/**
 * Placeholder shimmer shown while a banner slot is loading.
 */
const BannerSkeleton = ({ className }) => (
  <div className={`ui-banner-skeleton ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
  </div>
)

/**
 * Renders a single banner slot. Shows skeleton on load, an image link when
 * available, or a labelled placeholder when the slot has no content.
 */
const RenderBanner = ({ banner, slotLabel, className, isLoading }) => {
  if (isLoading) return <BannerSkeleton className={className} />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {banner ? (
        <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          <img
            src={banner.image}
            alt={banner.title || slotLabel}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        </a>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/10 bg-[#1c1c1e] border border-white/5">
          <span className="text-xs uppercase tracking-widest">{slotLabel}</span>
        </div>
      )}
    </motion.div>
  )
}

const Home = ({ setMobileModalOpen }) => {
  const { t } = useTranslation()
  const { categories, loading: categoriesLoading, error: categoriesError, refreshCategories } = useCategories()
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [selectedSite, setSelectedSite] = useState(null)
  const [banners, setBanners] = useState([])
  const [bannersLoading, setBannersLoading] = useState(true)

  const navigate = useLocalNavigate()

  useEffect(() => {
    let cancelled = false
    const loadBanners = async () => {
      try {
        const data = await fetchBanners()
        if (!cancelled) setBanners(data)
      } finally {
        if (!cancelled) setBannersLoading(false)
      }
    }
    loadBanners()
    return () => { cancelled = true }
  }, [])

  const mainBanner  = useMemo(() => banners.find(b => b.position === 'main'),        [banners])
  const sideTop     = useMemo(() => banners.find(b => b.position === 'side_top'),    [banners])
  const sideBottom  = useMemo(() => banners.find(b => b.position === 'side_bottom'), [banners])

  // 🟣 Обновляем Layout: скрыть футер при открытии модалки
  useEffect(() => {
    setMobileModalOpen?.(!!selectedSite)
  }, [selectedSite, setMobileModalOpen])

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId),
    [categories, activeCategoryId]
  )

  const handleSeeAllClick = (category) => {
    if (category?.slug) {
      navigate(`/${category.slug}`)
    }
  }

  const handleSiteClick = (site) => {
    if (window.innerWidth < 1024) {
      setSelectedSite(site)
    } else {
      navigate(`/review/${site.slug}`)
    }
  }

  return (
    <>
      <SEO 
        title={t("home.seoTitle", "BeInPorn - Best Site Reviews")} 
        description={t("home.seoDescription", "Top rated sites and reviews on BeInPorn.")}
      />
      <main className="bg-[#141415] w-full text-white pb-[72px]">
      {/* 🎯 Баннеры */}
      <div className="ui-container">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Main Banner Slot */}
        <RenderBanner banner={mainBanner}   slotLabel="Main Selection" className="ui-banner-main col-span-1 lg:col-span-2" isLoading={bannersLoading} />

          <div className="hidden lg:flex flex-col gap-4 lg:h-[280px]">
            <RenderBanner banner={sideTop}    slotLabel="Top Choice"    className="ui-banner-side h-[calc(50%-8px)]" isLoading={bannersLoading} />
            <RenderBanner banner={sideBottom} slotLabel="Featured Site" className="ui-banner-side h-[calc(50%-8px)]" isLoading={bannersLoading} />
          </div>
        </section>
      </div>

      {/* 🔍 Поиск и фильтры */}
      <SearchAndFilters
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
        onOpenSearch={() => setShowSearch(true)}
      />

      {/* 📚 Контент по категории */}
      <AnimatePresence mode="wait">
        {activeCategoryId && selectedCategory ? (
          <motion.div 
            key="category-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryGrid category={selectedCategory} />
          </motion.div>
        ) : categoriesLoading ? (
          /* 🦴 Скелетоны при первой загрузке */
          <div key="skeletons" className="ui-container mt-6 space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-center">
                   <div className="ui-skeleton-text w-48 h-8" />
                   <div className="ui-skeleton-text w-24 h-8 rounded-full" />
                </div>
                <div className="flex gap-4 overflow-hidden">
                   {[1, 2, 3, 4].map((j) => (
                     <div key={j} className="ui-skeleton-card" />
                   ))}
                </div>
              </div>
            ))}
          </div>
        ) : categoriesError ? (
          /* ⚠️ Ошибка при загрузке */
          <div key="error" className="ui-error-container">
            <div className="ui-error-icon">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('errors.failedToLoad', 'Failed to load content')}</h3>
            <p className="text-white/50 mb-6 max-w-sm">{t('errors.checkConnection', 'Please check your internet connection and try again.')}</p>
            <button 
              onClick={refreshCategories}
              className="px-8 py-3 bg-[#7100FF] hover:bg-[#8220FF] active:scale-95 transition-all rounded-xl font-semibold text-white"
            >
              {t('errors.retry', 'Retry')}
            </button>
          </div>
        ) : (
          <motion.section 
            key="category-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="mt-6 space-y-4"
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  onSeeAllClick={handleSeeAllClick}
                  onSiteClick={handleSiteClick}
                />
              ))
            ) : (
               <div className="py-20 text-center text-white/30 italic">
                  {t('home.noContent', 'No content available at the moment.')}
               </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* 🔍 Оверлей поиска */}
      {showSearch && (
        <SearchOverlay
          onClose={() => setShowSearch(false)}
          categories={categories}
        />
      )}

      {/* 📱 Мобильная модалка */}
      {selectedSite && (
        <MobileSiteModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
        />
      )}
      </main>
    </>
  )
}

export default Home
