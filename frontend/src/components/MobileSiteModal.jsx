import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import MobileSiteModalWrapper from "../components/MobileSiteModalWrapper"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import useLocalNavigate from "@/hooks/useLocalNavigate"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

const MobileSiteModal = ({ site, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const scrollYRef = useRef(0)
  const navigate = useLocalNavigate()

  // Переводы
  const tReadReview = useTranslateUniversal("common.readReview", "Read review")
  const tGoToSite = useTranslateUniversal("common.goToSite", "Go to site")
  const tClose = useTranslateUniversal("common.close", "Close")
  const translatedDescription = site?.description

  const imageSrc = site?.main_image
    ? `/storage/${site.main_image}`
    : site?.preview || ""

  useEffect(() => {
    if (site) {
      scrollYRef.current = window.scrollY
      
      // Strict iOS lock
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"

      setIsOpen(true)
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      
      window.scrollTo(0, scrollYRef.current)
    }
  }, [site])

  const handleClose = () => {
    setIsOpen(false)
    onClose() // Call parent immediately, parent handles the final unmount timeout
  }

  if (!site) return null

  return createPortal(
    <MobileSiteModalWrapper isOpen={isOpen} onClose={handleClose}>
      {/* 🔤 Заголовок */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {site.favicon && (
            <img
              src={`/storage/${site.favicon}`}
              alt={`Favicon ${site.name}`}
              className="w-6 h-6 rounded"
            />
          )}
          <h2 className="font-medium text-[17px] m-0">{site.name}</h2>
        </div>
        <button
          onClick={handleClose}
          className="w-6 h-6 p-0 flex items-center justify-center bg-transparent border-none outline-none cursor-pointer"
          aria-label={tClose}
          style={{ color: "rgb(111, 116, 128)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* 📷 Изображение: Жесткое ограничение 5 строками с запасом высоты, чтобы не лезло на кнопки */}
      {imageSrc && (
        <div className="relative px-4 pt-2">
          <div className="overflow-hidden rounded-[20px] h-[220px] sm:h-[260px] relative bg-zinc-100">
            {/* 🌈 Исправленный градиент: теперь он привязан к нижней части и не 'плывет' */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/40 to-transparent z-10 pointer-events-none" />
            
            <motion.img
              src={imageSrc}
              alt={`Превью ${site.name}`}
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* 📝 Описание: Четкое ограничение 5 строками */}
      {translatedDescription && (
        <div className="text-sm text-zinc-600 px-5 pt-6 mb-4 leading-relaxed line-clamp-5 overflow-hidden break-words max-h-[140px]">
          {translatedDescription}
        </div>
      )}

      {/* 🔘 Кнопки: Оптимизированы для SEO как реальные ссылки */}
      <div className="px-4 pb-6 space-y-3">
        <a
          href={`/review/${site.slug}`}
          onClick={(e) => {
             e.preventDefault();
             handleClose();
             setTimeout(() => navigate(`/review/${site.slug}`), 150);
          }}
          className="block text-center w-full bg-zinc-900 text-white text-sm py-2.5 rounded-full no-underline font-medium"
        >
          {tReadReview}
        </a>
        
        <a
          href={site.link}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="block text-center w-full text-white text-sm py-2.5 rounded-full flex items-center justify-center gap-2 no-underline font-medium"
          style={{ backgroundColor: "#d80032" }}
        >
          {tGoToSite} <span className="font-semibold">{site.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M10 8l4 4-4 4"
              stroke="white"
              strokeWidth={2} />
          </svg>
        </a>
      </div>
    </MobileSiteModalWrapper>,
    document.body
  )
}

export default MobileSiteModal