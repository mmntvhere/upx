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

  // Ref for the horizontal carousel to keep active item in view
  const carouselRef = useRef(null)

  useEffect(() => {
    const loadAllPages = async () => {
      if (pages.length > 0) return; // ✅ Уже есть, не грузим
      try {
        const data = await fetchPages();
        setPages(data);
      } catch (err) {
        console.error("Failed to fetch all pages:", err);
      }
    };
    loadAllPages();
  }, []) // Отрабатывает 1 раз при монтировании

  useEffect(() => {
    const loadCurrentPage = async () => {
      try {
        setLoading(true);
        setError(false);
        const pageData = await fetchPageBySlug(slug);
        setCurrentPage(pageData);
      } catch (err) {
        console.error("Failed to fetch page data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadCurrentPage();
  }, [slug]) // Отрабатывает при смене :slug

  // Scroll active carousel item into view on load
  useEffect(() => {
    if (!loading && currentPage && carouselRef.current) {
      const activeElement = carouselRef.current.querySelector('[data-active="true"]')
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [loading, currentPage])

  if (loading && pages.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !currentPage) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-white/60 mb-8">The legal or informational page you're looking for doesn't exist.</p>
        <LocalLink to="/" className="bg-[#2a2a2e] hover:bg-[#3a3a3e] px-6 py-3 rounded-full transition">
          Return Home
        </LocalLink>
      </div>
    )
  }

  const getLocalizedField = (fieldObj) => {
    if (!fieldObj) return ''
    if (typeof fieldObj === 'string') return fieldObj
    return fieldObj[language] || fieldObj['en'] || ''
  }

  const title = getLocalizedField(currentPage.title)
  const seoTitle = getLocalizedField(currentPage.seo_title)
  const seoDesc = getLocalizedField(currentPage.seo_description)
  const rawContent = getLocalizedField(currentPage.content)

  // Purify content to prevent XSS (since we might type raw HTML/links in Filament later)
  const cleanContent = DOMPurify.sanitize(rawContent, {
    USE_PROFILES: { html: true }
  })

  // Since React Router Link doesn't natively handle language prefixes elegantly for arbitrary links 
  // if not wrapped in LocalLink, we'll use LocalLink.

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto py-8 lg:py-12 flex flex-col min-h-[80vh]">
      <SEO
        title={`${seoTitle || title} | UPX`}
        description={seoDesc || `Read about ${title} on UPX.`}
      />

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

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch md:items-start relative flex-1 pt-8 md:pt-0">

        {/* 💻 Desktop Sticky Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-[96px]">
          <nav className="flex flex-col space-y-1">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 px-3">{infoTitle}</h3>
            {pages.map((p) => {
              const isActive = p.slug === slug
              return (
                <LocalLink
                  to={`/${p.slug}`}
                  key={p.id}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors ${isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {getLocalizedField(p.title)}
                </LocalLink>
              )
            })}
          </nav>
        </aside>

        {/* 📄 Main Content Area */}
        <main className={`flex-1 min-w-0 w-full bg-[#1c1c1e] md:bg-transparent rounded-2xl md:rounded-none p-6 md:p-0 border border-white/5 md:border-none shadow-xl md:shadow-none mb-10 transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <article className="prose prose-invert prose-blue max-w-none">
            <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight mb-8 text-white">
              {title}
            </h1>

            <div
              className="text-white/80 leading-relaxed space-y-6 text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </article>
        </main>

      </div>
    </div>
  )
}

export default StaticPage
