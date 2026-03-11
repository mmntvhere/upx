// src/pages/Home.jsx
import React, { useEffect, useRef, useState, useMemo } from "react"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import { fetchCategories } from "../api/categoryApi"
import { fetchBanners } from "../api/bannerApi"
import CategorySection from "../components/CategorySection"
import CategoryGrid from "../components/CategoryGrid"
import SearchAndFilters from "../components/SearchAndFilters"
import SearchOverlay from "../components/SearchOverlay"
import MobileSiteModal from "../components/MobileSiteModal"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/hooks/useLanguage"
import { useCategories } from "@/contexts/CategoryContext"

import { motion, AnimatePresence } from "framer-motion"
import SEO from "@/components/SEO"

const Home = ({ setMobileModalOpen }) => {
  const { t } = useTranslation()
  const { categories, loading: categoriesLoading, error: categoriesError, refreshCategories } = useCategories()
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [selectedSite, setSelectedSite] = useState(null)

  const sliders = useRef({})
  const navigate = useLocalNavigate()

  const [banners, setBanners] = useState([])
  const [bannersLoading, setBannersLoading] = useState(true)

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setBannersLoading(true)
        const data = await fetchBanners()
        setBanners(data)
      } finally {
        setBannersLoading(false)
      }
    }
    loadBanners()
  }, [])

  const mainBanner = banners.find(b => b.position === 'main')
  const sideTop = banners.find(b => b.position === 'side_top')
  const sideBottom = banners.find(b => b.position === 'side_bottom')

  // Skeleton component for banners
  const BannerSkeleton = ({ className }) => (
    <div className={`bg-[#212122] animate-pulse overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  )

  const RenderBanner = ({ banner, slotLabel, className }) => {
    if (bannersLoading) return <BannerSkeleton className={className} />
    
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
              src={`/storage/${banner.image}`}
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

  // 🟣 Обновляем Layout: скрыть футер при открытии модалки
  useEffect(() => {
    setMobileModalOpen?.(!!selectedSite)
  }, [selectedSite, setMobileModalOpen])

  const scrollByStep = (categoryId, direction) => {
    const slider = sliders.current[categoryId]
    if (!slider) return

    const step = slider.offsetWidth * 0.33
    slider.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth"
    })
  }

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
        title={t("home.seoTitle", "UPX - Best Site Reviews")} 
        description={t("home.seoDescription", "Top rated sites and reviews on UPX.")}
      />
      <main className="bg-[#141415] w-full text-white pb-[72px]">
      {/* 🎯 Баннеры */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Main Banner Slot */}
          <RenderBanner 
            banner={mainBanner} 
            slotLabel="Main Selection" 
            className="col-span-1 lg:col-span-2 w-full aspect-[16/7] lg:aspect-auto lg:h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/5" 
          />

          {/* Side Banners Column */}
          <div className="hidden lg:flex flex-col gap-4 lg:h-[280px]">
            <RenderBanner 
              banner={sideTop} 
              slotLabel="Top Choice" 
              className="h-[calc(50%-8px)] rounded-2xl overflow-hidden border border-white/5" 
            />
            <RenderBanner 
              banner={sideBottom} 
              slotLabel="Featured Site" 
              className="h-[calc(50%-8px)] rounded-2xl overflow-hidden border border-white/5" 
            />
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
          <div key="skeletons" className="mt-6 space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                <div className="flex justify-between items-center">
                   <div className="w-48 h-8 bg-white/5 rounded-lg animate-pulse" />
                   <div className="w-24 h-8 bg-white/5 rounded-full animate-pulse" />
                </div>
                <div className="flex gap-4 overflow-hidden">
                   {[1, 2, 3, 4].map((j) => (
                     <div key={j} className="min-w-[280px] h-[320px] bg-white/5 rounded-2xl animate-pulse" />
                   ))}
                </div>
              </div>
            ))}
          </div>
        ) : categoriesError ? (
          /* ⚠️ Ошибка при загрузке */
          <div key="error" className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
               <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('errors.failedToLoad', 'Failed to load content')}</h3>
            <p className="text-white/50 mb-6 max-w-sm">{t('errors.checkConnection', 'Please check your internet connection and try again.')}</p>
            <button 
              onClick={refreshCategories}
              className="px-8 py-3 bg-[#7100FF] hover:bg-[#8220FF] active:scale-95 transition-all rounded-xl font-semibold"
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
                  scrollByStep={scrollByStep}
                  sliders={sliders}
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
