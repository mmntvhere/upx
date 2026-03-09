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

const Home = ({ setMobileModalOpen }) => {
  const { categories, loading } = useCategories()
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [selectedSite, setSelectedSite] = useState(null)

  const sliders = useRef({})
  const navigate = useLocalNavigate()
  const { t } = useTranslation()

  const [banners, setBanners] = useState([])

  useEffect(() => {
    const loadBanners = async () => {
      const data = await fetchBanners()
      setBanners(data)
    }
    loadBanners()
  }, [])

  const mainBanner = banners.find(b => b.position === 'main')
  const sideTop = banners.find(b => b.position === 'side_top')
  const sideBottom = banners.find(b => b.position === 'side_bottom')

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
    <main className="bg-[#141415] w-full text-white pb-[72px]">
      {/* 🎯 Баннеры */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Main Banner Slot */}
          <div className="col-span-1 lg:col-span-2 aspect-[16/7] lg:aspect-auto lg:h-[280px] bg-[#7100FF] rounded-2xl overflow-hidden relative">
            {mainBanner ? (
              <a href={mainBanner.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img
                  src={`/storage/${mainBanner.image}`}
                  alt={mainBanner.title || "Main Banner"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </a>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20">
                <span className="text-sm font-medium">Main Banner Slot</span>
              </div>
            )}
          </div>

          {/* Side Banners Column */}
          <div className="hidden lg:flex flex-col gap-4 lg:h-[280px]">
            {/* Side TOP */}
            <div className="h-[calc(50%-8px)] bg-[#7100FF] rounded-2xl overflow-hidden relative">
              {sideTop ? (
                <a href={sideTop.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img
                    src={`/storage/${sideTop.image}`}
                    alt={sideTop.title || "Side Banner Top"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </a>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                   <span className="text-sm">Side Top Slot</span>
                </div>
              )}
            </div>

            {/* Side BOTTOM */}
            <div className="h-[calc(50%-8px)] bg-[#7100FF] rounded-2xl overflow-hidden relative">
              {sideBottom ? (
                <a href={sideBottom.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img
                    src={`/storage/${sideBottom.image}`}
                    alt={sideBottom.title || "Side Banner Bottom"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </a>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                   <span className="text-sm">Side Bottom Slot</span>
                </div>
              )}
            </div>
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
      {activeCategoryId && selectedCategory ? (
        <CategoryGrid category={selectedCategory} />
      ) : (
        <section className="mt-6 space-y-4">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              scrollByStep={scrollByStep}
              sliders={sliders}
              onSeeAllClick={handleSeeAllClick}
              onSiteClick={handleSiteClick}
            />
          ))}
        </section>
      )}

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
  )
}

export default Home
