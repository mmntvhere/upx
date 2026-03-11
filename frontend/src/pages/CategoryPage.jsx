// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchCategories } from "../api/categoryApi"
import Disclosure from "../components/Disclosure"
import ExpandableText from "../components/ExpandableText"
import CategoryGridView from "../components/CategoryGridView"
import CategoryListView from "../components/CategoryListView"
import ViewSwitcher from "../components/ViewSwitcher"
import MobileSiteModal from "../components/MobileSiteModal"
import CategorySeoCard from "../components/CategorySeoCard"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import Breadcrumb from "@/components/Breadcrumb"
import CategorySeoTitle from "@/components/CategorySeoTitle"
import { useLanguage } from "@/hooks/useLanguage"
import { useCategories } from "@/contexts/CategoryContext"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import NotFound from "./NotFound"
import SEO from "@/components/SEO"
import SortFilter from "../components/SortFilter"

const CategoryPage = () => {
  const { categories, loading } = useCategories()
  const { slug } = useParams()
  const [selectedSite, setSelectedSite] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [viewType, setViewType] = useState("list")
  const [isMobile, setIsMobile] = useState(false)
  const [sortBy, setBy] = useState("popular")
  const { language } = useLanguage()
  const navigate = useLocalNavigate()

  // 🔄 Находим нужную категорию синхронно из кэша
  const category = categories.find((cat) => cat.slug === slug)
  const otherCategories = categories.filter((cat) => cat.slug !== slug)

  // 💬 Переводы UI
  const notFoundText = useTranslateUniversal("categoryPage.notFound")
  const noSites = useTranslateUniversal("categoryPage.noSites")
  const otherCategoriesTitle = useTranslateUniversal("categoryPage.otherCategories")

  // Определяем мобильность
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setViewType(isMobile ? "grid" : "list")
  }, [isMobile])

  // Старый useEffect загрузки удалён, так как данные берутся из CategoryContext

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => document.body.classList.remove("overflow-hidden")
  }, [showModal])

  const handleSiteClick = (site) => {
    if (window.innerWidth < 1024) {
      setSelectedSite(site)
      setShowModal(true)
    } else {
      navigate(`/review/${site.slug}`)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setTimeout(() => setSelectedSite(null), 300)
  }

  // 📈 Логика сортировки
  const sortedSites = React.useMemo(() => {
    if (!category?.sites) return []
    const sites = [...category.sites]
    
    switch (sortBy) {
      case "new":
        // Новинки — по ID (самые свежие сверху)
        return sites.sort((a, b) => b.id - a.id)
      case "top":
        // Топ — по рейтингу (самые высокооцененные сверху)
        return sites.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0))
      case "popular":
      default:
        // Популярные — доверяем порядку с бэкенда.
        // Бэкенд уже отсортировал их в CategoryController по позициям и языкам.
        return sites
    }
  }, [category?.sites, sortBy, language])

  return (
    <>
      <SEO 
        title={category?.seo_title || category?.name || slug} 
        description={category?.seo_description || `Best ${category?.name || slug} and reviews on UPX.`} 
      />
      
      {loading && categories.length === 0 ? (
        <div className="text-white p-4">Loading...</div>
      ) : !category ? (
        <NotFound />
      ) : (
        <main className="bg-[#141415] text-white pb-10">
          <div className="ui-container pt-6">
            {/* 🔗 Хлебные крошки */}
            <Breadcrumb basePath="/" baseLabel="categoryPage.breadcrumbHome" category={category} />

            {/* 🏷 SEO Title */}
            <CategorySeoTitle category={category} />

            {/* 📌 Дисклеймер */}
            {category.disclaimer && (
              <div className="mb-6">
                <Disclosure disclaimer={category.disclaimer} />
              </div>
            )}

            {/* 🧭 Управление отображением */}
            <div className="flex items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-4 shrink-0">
                <SortFilter currentSort={sortBy} onChange={setBy} />
                <div className="hidden lg:block h-4 w-px bg-white/10 mx-2" />
                <div className="hidden lg:block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {sortedSites.length} verified
                </div>
              </div>
              
              <div className="flex items-center justify-end shrink-0">
                <ViewSwitcher viewType={viewType} onChange={setViewType} />
              </div>
            </div>

            {/* 🧱 Сайты */}
            {sortedSites.length ? (
              viewType === "list" ? (
                <CategoryListView
                  sites={sortedSites}
                  onSiteClick={handleSiteClick}
                />
              ) : (
                <CategoryGridView
                  sites={sortedSites}
                  viewType={viewType}
                  onSiteClick={handleSiteClick}
                />
              )
            ) : (
              <div className="text-sm text-zinc-400 mt-10">{noSites}</div>
            )}

            {/* 📄 Описание */}
            {category.description && (
              <div className="mt-10">
                <ExpandableText text={category.description} />
              </div>
            )}
          </div>

          {/* 🔗 SEO-перелинковка */}
          {otherCategories.length > 0 && (
            <div className="mt-8 ui-container">
              <h2 className="ui-title-section mb-4">{otherCategoriesTitle}</h2>
              <div className="ui-seo-grid">
                {otherCategories.map((cat) => (
                  <CategorySeoCard key={cat.id} category={cat} />
                ))}
              </div>
            </div>
          )}

          {/* 📱 Модалка сайта */}
          {selectedSite && (
            <MobileSiteModal site={selectedSite} onClose={handleCloseModal} />
          )}
        </main>
      )}
    </>
  )
}

export default CategoryPage