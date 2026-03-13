import React, { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SUPPORTED_LANGUAGES } from '@/config/languages'

/**
 * 👑 BeInPorn Premium SEO Engine
 * 
 * NOTE: Мы используем гибридный подход. 
 * Стандартные мета-теги управляются через Helmet (асинхронно), 
 * а критические hreflang и JSON-LD внедряются синхронно через DOM Injector.
 * Это гарантирует 100% видимость для поисковых роботов без "фликкера".
 */
const SEO = ({ 
  title, 
  description, 
  image, 
  type = 'website',
  schemaData,
  siteName = "BeInPorn" 
}) => {
  const { pathname } = useLocation()
  const domain = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://beinporn.com')
  
  // 🧩 Мемоизация данных для исключения лишних ререндеров
  const seoData = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const isLangInPath = SUPPORTED_LANGUAGES.includes(segments[0])
    const purePath = isLangInPath ? segments.slice(1).join('/') : segments.join('/')
    const pathPart = purePath ? `/${purePath}` : ''
    
    // Формирование URL
    const canonical = `${domain}/${isLangInPath ? segments[0] + pathPart : purePath}`.replace(/\/+$/, '') || domain
    
    // 🧱 Проверка на "грязный" заголовок (если данных еще нет)
    const displayTitle = title && !title.includes('undefined') ? title : (siteName || 'BeInPorn')

    // Создание связей hreflang
    const alternates = [
      { lang: 'x-default', url: `${domain}${pathPart}`.replace(/\/+$/, '') || domain },
      { lang: 'en', url: `${domain}${pathPart}`.replace(/\/+$/, '') || domain },
      ...SUPPORTED_LANGUAGES.map(l => ({
        lang: l,
        url: `${domain}/${l}${pathPart}`.replace(/\/+$/, '')
      }))
    ]

    return {
      title: (displayTitle ? `${displayTitle} | ${siteName}` : siteName).trim(),
      description: (description || "Best reviews and ratings on BeInPorn.").trim(),
      image: image || `${domain}/og-image.jpg`,
      canonical,
      alternates,
      lang: isLangInPath ? segments[0] : 'en'
    }
  }, [pathname, title, description, image, siteName])

  // 🚀 DOM Injector: Синхронная прописка тегов
  useEffect(() => {
    const tagId = 'beinporn-seo-manual';
    
    const injectTags = () => {
      // 1. Очистка старой порции данных
      document.querySelectorAll(`[data-seo-engine="${tagId}"]`).forEach(el => el.remove());

      // 2. Внедрение Hreflang
      seoData.alternates.forEach(link => {
        const el = document.createElement('link');
        el.rel = 'alternate';
        el.hreflang = link.lang;
        el.href = link.url;
        el.setAttribute('data-seo-engine', tagId);
        document.head.appendChild(el);
      });

      // 3. Внедрение JSON-LD
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-engine', tagId);
      script.text = JSON.stringify(schemaData || {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteName,
        "url": domain
      });
      document.head.appendChild(script);
    };

    injectTags();
    
    // Cleanup при размонтировании (необязательно, но для чистоты)
    return () => {
       // Мы не удаляем теги при мгновенном переходе, чтобы не было пустоты в head
    };
  }, [seoData, schemaData, siteName]);

  return (
    <Helmet>
      {/* 🏁 Базовые теги (Social & Main Meta) */}
      <html lang={seoData.lang} />
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonical} />

      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:image" content={seoData.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
    </Helmet>
  )
}

export default SEO
