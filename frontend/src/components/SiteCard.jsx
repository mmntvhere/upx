import React, { useState, useMemo } from "react"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal" // 🔤 Подключаем мультиязычный перевод
import LangFlags from "./LangFlags"

const SiteCard = ({ site, onClick, isGrid = false }) => {
  const navigate = useLocalNavigate()
  const tNoPreview = useTranslateUniversal("site.noPreview", "No Preview")
  const [isPreviewError, setPreviewError] = useState(false)
  const [isFaviconError, setFaviconError] = useState(false)

  // 🖼️ Preview image
  const previewUrl = useMemo(() => {
    const raw = site.preview?.trim()
    if (!raw) return null
    return raw.startsWith("http") || raw.startsWith("/storage") ? raw : `/storage/${raw}`
  }, [site.preview])

  // 🌐 Favicon image
  const faviconUrl = useMemo(() => {
    const raw = site.favicon?.trim()
    if (!raw) return null
    return raw.startsWith("http") || raw.startsWith("/storage") ? raw : `/storage/${raw}`
  }, [site.favicon])

  // 🔗 Навигация или кастомный клик
  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) {
      onClick(site)
    } else {
      navigate(`/review/${site.slug}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center relative cursor-pointer
        ${isGrid
          ? "w-full"
          : "shrink-0 w-[120px] xs:w-[130px] sm:w-[143px] md:w-[150px] lg:w-[155px]"}
      `}
      role="group"
      aria-label={`Сайт ${site.name}`}
    >
      <div className="relative w-full aspect-[155/208] rounded-2xl overflow-visible group transition-all duration-300">
        {!isPreviewError && previewUrl ? (
          <img
            src={previewUrl}
            alt={`Превью сайта ${site.name}`}
            loading="lazy"
            onError={() => setPreviewError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-zinc-700 text-white text-xs rounded-2xl"
            aria-hidden="true"
          >
            {tNoPreview}
          </div>
        )}

        {!isFaviconError && faviconUrl && (
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-20">
            <img
              src={faviconUrl}
              alt={`Favicon сайта ${site.name}`}
              loading="lazy"
              onError={() => setFaviconError(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain drop-shadow-md"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 mt-4 text-xs sm:text-sm font-medium text-white truncate w-full">
        <span title={site.name}>{site.name}</span>
        <LangFlags langs={site.enabled_languages} />
      </div>
    </div>
  )
}

export default SiteCard