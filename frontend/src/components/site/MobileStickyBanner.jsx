import React, { useEffect, useState } from "react"
import { ArrowUpRight, ArrowLeftRight } from "lucide-react"
import LocalLink from "@/components/LocalLink"
import clsx from "clsx"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import { useLanguage } from "@/hooks/useLanguage"


const ANIMATION_DURATION = 300

const MobileStickyBanner = ({ site }) => {
  const language = useLanguage()
  const [shouldRender, setShouldRender] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  const tGoTo = useTranslateUniversal("common.goTo", "Go to")
  const tHome = useTranslateUniversal("common.home", "Home")
  const tCategoryFallback = useTranslateUniversal("common.category", "Category")

  useEffect(() => {
    if (!site) return

    if (site.hidden) {
      setIsVisible(false)
      setTimeout(() => setShouldRender(false), ANIMATION_DURATION)
    } else {
      setShouldRender(true)
      setTimeout(() => setIsVisible(true), 10)
    }
  }, [site, site?.hidden])

  if (!site || !shouldRender) return null

  const category = site.category


  const categoryName = category?.name || tCategoryFallback

  return (
    <div
      className={clsx(
        "fixed bottom-0 inset-x-0 z-50 bg-[#141415]/80 ui-glass shadow-[0_-2px_20px_rgba(0,0,0,0.5)] p-4",
        isVisible ? "animate-fadeIn" : "animate-fadeOut"
      )}
    >
      {/* Кнопка GO TO */}
      <a
        href={site.link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#D80032] text-white text-sm font-medium h-11 rounded-full hover:bg-[#b50029] transition w-full mb-3"
      >
        <ArrowUpRight className="w-4 h-4" />
        <span className="truncate">{tGoTo} {site.name}</span>
      </a>

      {/* Нижний блок с двумя ссылками */}
      <div className="flex justify-between items-center text-white text-xs font-medium">
          <LocalLink
            to="/"
            className="flex flex-col items-center justify-center flex-1 bg-white/10 rounded-lg py-2 mr-2 hover:bg-white/20 transition"
          >
            <ArrowLeftRight className="w-5 h-5 mb-1" />
            {tHome}
          </LocalLink>

          <LocalLink
            to={`/${category?.slug || ""}`}
            className="flex flex-col items-center justify-center flex-1 bg-white/10 rounded-lg py-2 ml-2 hover:bg-white/20 transition"
          >
            {category?.icon && (
              <img
                src={`/storage/${category.icon}`}
                alt={category.name}
                className="w-5 h-5 mb-1 object-contain"
              />
            )}
            <span className="truncate max-w-[100px]">{categoryName}</span>
          </LocalLink>
      </div>
    </div>
  )
}

export default MobileStickyBanner