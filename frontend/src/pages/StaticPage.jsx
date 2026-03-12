import React, { useEffect, useState, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import { fetchPages, fetchPageBySlug } from "@/api/pageApi"
import SEO from "@/components/SEO"
import DOMPurify from "dompurify"
import LocalLink from "@/components/LocalLink"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { LanguageContext } from "@/contexts/LanguageContext"

import NotFound from "@/pages/NotFound"

const StaticPage = () => {
  const { slug } = useParams()
  const { language } = useContext(LanguageContext)
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const infoTitle = useTranslateUniversal('page.information', 'Information')

  const carouselRef = useRef(null)

  const getLocalizedField = (fieldObj) => {
    if (!fieldObj) return ''
    if (typeof fieldObj === 'string') return fieldObj
    return fieldObj[language] || fieldObj['en'] || ''
  }

  useEffect(() => {
    const loadAllPages = async () => {
      if (pages.length > 0) return
      try {
        const data = await fetchPages()
        setPages(data)
      } catch (err) {
        console.error("Failed to fetch all pages:", err)
      }
    }
    loadAllPages()
  }, [])

  useEffect(() => {
    const loadCurrentPage = async () => {
      try {
        setLoading(true)
        setError(false)
        const pageData = await fetchPageBySlug(slug)
        setCurrentPage(pageData)
      } catch (err) {
        console.error("Failed to fetch page data:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadCurrentPage()
  }, [slug])

  useEffect(() => {
    if (!loading && currentPage && carouselRef.current) {
      const activeElement = carouselRef.current.querySelector('[data-active="true"]')
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [loading, currentPage])

  const title = currentPage ? getLocalizedField(currentPage.title) : slug
  const seoTitle = currentPage ? getLocalizedField(currentPage.seo_title) : null
  const seoDesc = currentPage ? getLocalizedField(currentPage.seo_description) : null
  const rawContent = currentPage ? getLocalizedField(currentPage.content) : ''

  const cleanContent = DOMPurify.sanitize(rawContent, {
    USE_PROFILES: { html: true }
  })

  return (
    <>
      {loading && pages.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-primaryLink border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error || !currentPage ? (
        <NotFound />
      ) : (
        <>
          <SEO 
            title={seoTitle || title} 
            description={seoDesc || `Read about ${title} on BeInPorn.`} 
          />
          <div className="ui-container py-8 lg:py-12 flex flex-col min-h-[80vh]">
          {/* 📱 Mobile Fixed Navigation Wrapper */}
          <div className="md:hidden sticky top-[60px] z-40 -mx-4 mb-8">
            <div className="bg-[#141415]/95 backdrop-blur-md px-4 pb-6 border-b border-white/5 shadow-sm">
              <div
                ref={carouselRef}
                className="flex space-x-2 overflow-x-auto hide-scrollbar pt-6 items-center snap-x whitespace-nowrap"
              >
                {pages.map((p) => {
                  const isActive = p.slug === slug
                  return (
                    <LocalLink
                      to={`/${p.slug}`}
                      key={p.id}
                      data-active={isActive}
                      className={`ui-nav-link-mobile ${isActive ? "ui-nav-link-mobile-active" : "ui-nav-link-mobile-inactive"}`}
                    >
                      {getLocalizedField(p.title)}
                    </LocalLink>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 flex-grow">
            {/* 🖥 Desktop Sidebar */}
            <aside className="hidden md:block w-64 lg:w-72 shrink-0">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">{infoTitle}</h2>
                <nav className="flex flex-col space-y-1">
                  {pages.map((p) => {
                    const isActive = p.slug === slug
                    return (
                      <LocalLink
                        to={`/${p.slug}`}
                        key={p.id}
                        className={`ui-nav-link-desktop group ${isActive ? "ui-nav-link-desktop-active" : ""}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-transform ${isActive ? "bg-primaryLink scale-100" : "bg-white/20 scale-0 group-hover:scale-75"}`} />
                        {getLocalizedField(p.title)}
                      </LocalLink>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* 📝 Main Content Area */}
            <main className="flex-grow min-w-0">
              <div className="ui-card p-6 sm:p-8 lg:p-12">
                <h1 className="ui-title-main mb-8 lg:mb-12">
                  {title}
                </h1>

                <div
                  className="ui-prose"
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
              </div>
            </main>
          </div>
        </div>
      </>
    )}
  </>
)
}

export default StaticPage
