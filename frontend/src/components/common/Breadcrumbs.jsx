import React from "react"
import LocalLink from "@/components/LocalLink"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

/**
 * 🧱 Universal Breadcrumbs Component
 * Handles Home > Category and Home > Category > Site structures.
 */
const Breadcrumbs = ({ category, site }) => {
  const tHome = useTranslateUniversal("common.home", "Home")
  const categoryName = category?.name || site?.category?.name || "Category"
  const categorySlug = category?.slug || site?.category?.slug
  const categoryIcon = category?.icon || site?.category?.icon

  const breadcrumbItems = [
    { name: tHome, url: window.location.origin + "/" },
    ...(categorySlug ? [{ name: categoryName, url: window.location.origin + "/" + categorySlug }] : []),
    ...(site ? [{ name: site.name, url: window.location.origin + "/review/" + site.slug }] : [])
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <nav 
        className="text-sm text-gray-400 mb-6 flex items-center gap-1 sm:gap-2 whitespace-nowrap overflow-hidden text-ellipsis"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-1 sm:gap-2 grow overflow-hidden">
          {/* 🏠 Home */}
          <li className="flex items-center shrink-0">
            <LocalLink
              to="/"
              className="hover:text-white transition-colors"
            >
              {tHome}
            </LocalLink>
          </li>
          
          {(categoryName || site) && (
            <ChevronRightIcon className="w-4 h-4 text-gray-600 shrink-0" aria-hidden="true" />
          )}

          {/* 📁 Category */}
          {categorySlug ? (
            <li className="flex items-center min-w-0">
              <LocalLink
                to={`/${categorySlug}`}
                className={`flex items-center gap-1.5 hover:text-white transition-colors shrink-0 truncate ${!site ? 'text-white font-medium' : ''}`}
                aria-current={!site ? "page" : undefined}
              >
                {categoryIcon && (
                  <img
                    src={`/storage/${categoryIcon}`}
                    alt=""
                    className="w-4 h-4 object-contain shrink-0"
                    loading="lazy"
                  />
                )}
                <span>{categoryName}</span>
              </LocalLink>
              {site && (
                <ChevronRightIcon className="w-4 h-4 text-gray-600 shrink-0 ml-1 sm:ml-2" aria-hidden="true" />
              )}
            </li>
          ) : categoryName && (
            <li className="text-white font-medium truncate" aria-current={!site ? "page" : undefined}>
              {categoryName}
            </li>
          )}

          {/* 📄 Site Name */}
          {site && (
            <li className="text-white font-medium truncate" aria-current="page">
              {site.name}
            </li>
          )}
        </ol>
      </nav>
    </>
  )
}

export default React.memo(Breadcrumbs)
