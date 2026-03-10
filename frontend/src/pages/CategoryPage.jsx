// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchCategories } from "../api/categoryApi"
import Disclosure from "../components/Disclosure"
import ExpandableText from "../components/ExpandableText"
import CategoryGridView from "../components/CategoryGridView"
import CategoryListView from "../components/CategoryListView"
import ViewSwitcher from "../components/ViewSwitcher"
import FilterButton from "../components/FilterButton"
import MobileSiteModal from "../components/MobileSiteModal"
import CategorySeoCard from "../components/CategorySeoCard"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import Breadcrumb from "@/components/Breadcrumb"
import CategorySeoTitle from "@/components/CategorySeoTitle"
import { useLanguage } from "@/hooks/useLanguage"
import { useCategories } from "@/contexts/CategoryContext"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import NotFound from "./NotFound"

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

  // Пока данные грузятся В ПЕРВЫЙ РАЗ (или при смене языка)
  if (loading && categories.length === 0) {
    return <div className="text-white p-4">Loading...</div>
  }

  if (!category) {
    return <NotFound />
  }

  return (
    <main className="bg-[#141415] text-white pb-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-grow">
            <FilterButton onClick={() => console.log("Открыть фильтр")} />
          </div>
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
        <div className="mt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-4 text-white">{otherCategoriesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
  )
}

export default CategoryPage