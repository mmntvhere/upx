import React, { useEffect, useState, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import { fetchPages, fetchPageBySlug } from "@/api/pageApi"
import SEO from "@/components/SEO"
import DOMPurify from "dompurify"
import LocalLink from "@/components/LocalLink"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { LanguageContext } from "@/contexts/LanguageContext"

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
      <SEO 
        title={seoTitle || title} 
        description={seoDesc || `Read about ${title} on UPX.`} 
      />

      {loading && pages.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-primaryLink border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error || !currentPage ? (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-white/60 mb-8">The legal or informational page you're looking for doesn't exist.</p>
          <LocalLink to="/" className="bg-[#2a2a2e] hover:bg-[#3a3a3e] px-6 py-3 rounded-full transition">
            Return Home
          </LocalLink>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto py-8 lg:py-12 flex flex-col min-h-[80vh]">
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
                      className={`snap-center shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive
                        ? "bg-white text-black drop-shadow-md"
                        : "bg-[#212122] text-white/70 hover:bg-[#2a2a2e] hover:text-white"
                        }`}
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
                        className={`px-4 py-3 rounded-xl transition-all flex items-center group ${isActive
                          ? "bg-white/10 text-white font-semibold"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-transform ${isActive ? "bg-primaryLink scale-100" : "bg-white/20 scale-0 group-hover:scale-75"
                          }`} />
                        {getLocalizedField(p.title)}
                      </LocalLink>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* 📝 Main Content Area */}
            <main className="flex-grow min-w-0">
              <div className="bg-[#1c1c1e] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-xl border border-white/5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 lg:mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
                  {title}
                </h1>

                <div
                  className="prose prose-invert prose-zinc max-w-none 
                  prose-headings:text-white prose-headings:font-bold 
                  prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-lg
                  prose-a:text-primaryLink hover:prose-a:text-primaryLinkHover prose-a:no-underline prose-a:font-semibold
                  prose-strong:text-white prose-strong:font-bold
                  prose-li:text-white/80 prose-li:text-lg
                  prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                  prose-hr:border-white/10"
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default StaticPage
