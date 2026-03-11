import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SUPPORTED_LANGUAGES } from '@/config/languages'

/**
 * Универсальный SEO компонент.
 * Генерирует Title, Meta, OpenGraph и Hreflang теги.
 */
const SEO = ({ 
  title, 
  description, 
  image, 
  article,
  siteName = "UPX" 
}) => {
  const { pathname } = useLocation()
  const siteUrl = "https://upx.com" // Замените на ваш домен
  
  // 🔗 Генерируем чистый канонический URL بدون параметров
  const canonicalUrl = `${siteUrl}${pathname === '/' ? '' : pathname}`

  // 🔄 Хэлпер для формирования ссылок на другие языки (hreflang)
  const getLanguageUrl = (lang) => {
    const segments = pathname.split('/').filter(Boolean)
    // Проверяем, является ли первый сегмент кодом языка
    const firstSegmentIsLang = SUPPORTED_LANGUAGES.includes(segments[0])
    const baseSegments = firstSegmentIsLang ? segments.slice(1) : segments
    
    // Формируем путь: домен + новый язык + остаток пути
    return `${siteUrl}/${lang}/${baseSegments.join('/')}`.replace(/\/+$/, '')
  }

  const seo = {
    title: title ? `${title} | ${siteName}` : siteName,
    description: description || "Лучшие обзоры и рейтинги сайтов на UPX",
    image: image || `${siteUrl}/default-og.jpg`,
    url: canonicalUrl,
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* 🌐 SEO: Мультиязычные связи (Hreflang) */}
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={siteUrl} />
      {SUPPORTED_LANGUAGES.map((lang) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang} 
          href={getLanguageUrl(lang)} 
        />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  )
}

export default SEO
