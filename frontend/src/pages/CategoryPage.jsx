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

const CategoryPage = () => {
  const { categories, loading } = useCategories()
  const { slug } = useParams()
  const [selectedSite, setSelectedSite] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [viewType, setViewType] = useState("list")
  const [isMobile, setIsMobile] = useState(false)
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
            <div className="flex items-center justify-end mb-6 gap-4">
              {isMobile && (
                <ViewSwitcher viewType={viewType} onChange={setViewType} />
              )}
            </div>

            {/* 🧱 Сайты */}
            {category.sites?.length ? (
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