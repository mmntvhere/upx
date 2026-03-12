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

  return (
    <nav 
      className="text-sm text-gray-400 mb-6 flex items-center gap-1 sm:gap-2 whitespace-nowrap overflow-hidden text-ellipsis"
      aria-label="Breadcrumb"
    >
      {/* 🏠 Home */}
      <LocalLink
        to="/"
        className="hover:text-white transition-colors shrink-0"
      >
        {tHome}
      </LocalLink>
      
      {(categoryName || site) && (
        <ChevronRightIcon className="w-4 h-4 text-gray-600 shrink-0" />
      )}

      {/* 📁 Category */}
      {categorySlug ? (
        <>
          <LocalLink
            to={`/${categorySlug}`}
            className={`flex items-center gap-1.5 hover:text-white transition-colors shrink-0 truncate ${!site ? 'text-white font-medium' : ''}`}
          >
            {categoryIcon && (
              <img
                src={`/storage/${categoryIcon}`}
                alt={categoryName}
                className="w-4 h-4 object-contain shrink-0"
                loading="lazy"
              />
            )}
            <span>{categoryName}</span>
          </LocalLink>
          {site && (
            <ChevronRightIcon className="w-4 h-4 text-gray-600 shrink-0" />
          )}
        </>
      ) : categoryName && (
        <span className="text-white font-medium truncate">{categoryName}</span>
      )}

      {/* 📄 Site Name */}
      {site && (
        <span className="text-white font-medium truncate" aria-current="page">
          {site.name}
        </span>
      )}
    </nav>
  )
}

export default React.memo(Breadcrumbs)
