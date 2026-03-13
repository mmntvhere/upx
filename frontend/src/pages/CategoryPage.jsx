// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchCategoryBySlug } from "../api/categoryApi"
import Disclosure from "../components/Disclosure"
import ExpandableText from "../components/ExpandableText"
import CategoryGridView from "../components/CategoryGridView"
import CategoryListView from "../components/CategoryListView"
import ViewSwitcher from "../components/ViewSwitcher"
import MobileSiteModal from "../components/MobileSiteModal"
import CategorySeoCard from "../components/CategorySeoCard"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import Breadcrumbs from "@/components/common/Breadcrumbs"
import CategorySeoTitle from "@/components/CategorySeoTitle"
import { useLanguage } from "@/hooks/useLanguage"
import { useCategories } from "@/contexts/CategoryContext"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import NotFound from "./NotFound"
import SEO from "@/components/SEO"
import SortFilter from "../components/SortFilter"

const CategoryPage = () => {
  const { categories: allCategories } = useCategories() // Для SEO-перелинковки
  const { slug } = useParams()
  const { language } = useLanguage()
  const navigate = useLocalNavigate()
  
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setBy] = useState("popular")
  
  const initialIsMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  const [selectedSite, setSelectedSite] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [viewType, setViewType] = useState(initialIsMobile ? "grid" : "list")
  const [isMobile, setIsMobile] = useState(initialIsMobile)

  // 💬 Переводы UI
  const noSites = useTranslateUniversal("categoryPage.noSites")
  const otherCategoriesTitle = useTranslateUniversal("categoryPage.otherCategories")

  // 📱 Определение мобильности
  useEffect(() => {
    const mobile = window.innerWidth < 1024
    setIsMobile(mobile)
    setViewType(mobile ? "grid" : "list")

    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // Мы НЕ меняем viewType при ресайзе, чтобы не перебивать выбор пользователя 
      // (особенно важно на мобилках, где скрытие панели адреса вызывает resize)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 🚀 Загрузка данных категории
  useEffect(() => {
    let isCancelled = false
    const loadCategory = async () => {
      setLoading(true)
      try {
        const data = await fetchCategoryBySlug(slug, sortBy)
        if (!isCancelled) {
          setCategory(data)
          setError(null)
        }
      } catch (err) {
        if (!isCancelled) setError(err)
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }
    loadCategory()
    return () => { isCancelled = true }
  }, [slug, sortBy, language])

  // 🔗 SEO Перелинковка (исключаем текущую)
  const otherCategories = allCategories.filter((cat) => cat.slug !== slug)

  const handleSiteClick = (site) => {
    if (isMobile) {
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

  // Блокировка скролла при модалке
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [showModal])

  if (loading && !category) {
    return (
      <main className="bg-[#141415] text-white pb-20 min-h-screen">
        <div className="ui-container pt-6 animate-pulse">
          <div className="h-4 bg-white/5 w-48 mb-8 rounded-md" />
          <div className="h-10 bg-white/5 w-2/3 mb-10 rounded-xl" />
          <div className="flex items-center justify-between mb-10">
            <div className="h-8 bg-white/5 w-40 rounded-full" />
            <div className="h-8 bg-white/5 w-24 rounded-full" />
          </div>

          {/* Adaptive Skeleton Grid/List */}
          <div className={`grid gap-6 ${viewType === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className={viewType === 'grid' ? 'aspect-[155/208] bg-white/5 rounded-2xl' : 'h-[100px] bg-white/5 rounded-2xl'} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (error || (!loading && !category)) {
    return <NotFound />
  }

  return (
    <>
      <SEO 
        title={category?.seo_title || category?.name} 
        description={category?.seo_description}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": category?.name,
          "description": category?.seo_description,
          "itemListElement": (category?.sites || []).map((site, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${window.location.origin}/review/${site.slug}`,
            "name": site.name
          }))
        }}
      />
      
      <main className="bg-[#141415] text-white pb-20">
        <div className="ui-container pt-6">
          {/* 🔗 Хлебные крошки (используем универсальный компонент) */}
          <Breadcrumbs category={category} />

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
                {category.sites?.length || 0} verified
              </div>
            </div>
            
            <div className="flex items-center justify-end shrink-0">
              <ViewSwitcher viewType={viewType} onChange={setViewType} />
            </div>
          </div>

          {/* 🧱 Сайты */}
          {category.sites?.length > 0 ? (
            viewType === "list" ? (
              <CategoryListView
                sites={category.sites}
                onSiteClick={handleSiteClick}
              />
            ) : (
              <CategoryGridView
                sites={category.sites}
                viewType={viewType}
                onSiteClick={handleSiteClick}
              />
            )
          ) : (
            <div className="text-sm text-zinc-400 mt-10 text-center py-20">{noSites}</div>
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
    </>
  )
}

export default CategoryPage