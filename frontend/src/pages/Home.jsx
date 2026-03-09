// src/pages/Home.jsx
import React, { useEffect, useRef, useState, useMemo } from "react"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import { fetchCategories } from "../api/categoryApi"
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
          <div className="col-span-1 lg:col-span-2 aspect-[16/7] lg:aspect-auto lg:min-h-[280px] bg-[#7100FF] rounded-2xl overflow-hidden relative">
            <img
              src="/assets/banner-main.jpg"
              alt={t("home.mainBanner")}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:flex flex-col justify-between gap-4">
            <div className="flex-1 bg-[#7100FF] rounded-2xl overflow-hidden relative">
              <img
                src="/assets/banner-small-1.jpg"
                alt={t("home.banner1")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-[#7100FF] rounded-2xl overflow-hidden relative">
              <img
                src="/assets/banner-small-2.jpg"
                alt={t("home.banner2")}
                className="w-full h-full object-cover"
              />
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
        <section className="mt-10 space-y-4">
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
