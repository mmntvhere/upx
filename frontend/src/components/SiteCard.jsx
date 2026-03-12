import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import LangFlags from "./LangFlags"

const SiteCard = ({ site, onClick, isGrid = false }) => {
  const navigate = useLocalNavigate()
  const tNoPreview = useTranslateUniversal("site.noPreview", "No Preview")
  const [isPreviewError, setPreviewError] = useState(false)
  const [isFaviconError, setFaviconError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
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
      <div className="relative w-full aspect-[155/208] group overflow-visible">
        {/* Внутренний контейнер для обрезки при увеличении */}
        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#1c1c1e] border border-white/5 shadow-lg">
          {/* Skeleton Shimmer while loading */}
          {!imageLoaded && !isPreviewError && previewUrl && (
            <div className="absolute inset-0 bg-[#212122] animate-pulse">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          )}

          {!isPreviewError && previewUrl ? (
            <img
              src={previewUrl}
              alt={`Превью сайта ${site.name}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setPreviewError(true)
                setImageLoaded(true)
              }}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white/20 text-[10px] uppercase tracking-wider"
              aria-hidden="true"
            >
              {tNoPreview}
            </div>
          )}
        </div>

        {!isFaviconError && faviconUrl && (
          <motion.div 
            initial={{ scale: 0, x: "-50%", y: "50%" }}
            animate={{ scale: 1, x: "-50%", y: "50%" }}
            transition={{ delay: 0.2 }}
            className="absolute left-1/2 bottom-0 z-20"
          >
            <img
              src={faviconUrl}
              alt={`Favicon сайта ${site.name}`}
              loading="lazy"
              onError={() => setFaviconError(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-[11px] sm:text-[13px] font-medium text-white/90 truncate w-full px-1">
        <span className="truncate" title={site.name}>{site.name}</span>
        {site.enabled_languages?.length === 1 && (
          <div className="w-4 h-4 rounded-full overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
            <LangFlags langs={site.enabled_languages} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default SiteCard