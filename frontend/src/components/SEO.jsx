import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SUPPORTED_LANG_CODES, DEFAULT_LANGUAGE } from '@/i18n/languageConfig'

/**
 * SEO Component that automatically handles Title, Description, and crucial Hreflang tags
 * for all supported languages on the current route.
 */
const SEO = ({ title, description }) => {
  const location = useLocation()
  const path = location.pathname
  
  // 1. Determine the "base path" (the path without any language prefix)
  const pathParts = path.split('/').filter(Boolean)
  let basePath = path
  
  if (pathParts.length > 0 && SUPPORTED_LANG_CODES.includes(pathParts[0])) {
    // If the first part of the URL is a supported language code, strip it
    basePath = '/' + pathParts.slice(1).join('/')
  }
  
  // Clean up trailing slashes for consistency, except for root '/'
  if (basePath.length > 1 && basePath.endsWith('/')) {
    basePath = basePath.slice(0, -1)
  }

  // Define the base domain (hardcoded or from env). 
  // It's crucial for hreflang tags to be absolute URLs.
  const domain = import.meta.env.VITE_APP_URL || 'https://upx.com'
  
  // Helper to construct absolute URL for a specific language
  const getUrlForLang = (langCode) => {
    // English is our default language and lives at the root (no /en/ prefix)
    const prefix = langCode === DEFAULT_LANGUAGE ? '' : `/${langCode}`
    const fullPath = `${prefix}${basePath === '/' ? '' : basePath}`
    
    // Ensure we don't end up with just the domain and no trailing slash if it's the root, 
    // or double slashes.
    return `${domain}${fullPath || '/'}`
  }

  return (
    <Helmet>
      {/* Basic SEO */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Multilingual Hreflang Tags */}
      {SUPPORTED_LANG_CODES.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hreflang={lang}
          href={getUrlForLang(lang)}
        />
      ))}
      
      {/* x-default tag (Fallback for unmachted languages) */}
      <link
        rel="alternate"
        hreflang="x-default"
        href={getUrlForLang(DEFAULT_LANGUAGE)}
      />
    </Helmet>
  )
}

export default SEO
