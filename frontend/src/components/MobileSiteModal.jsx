import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import MobileSiteModalWrapper from "../components/MobileSiteModalWrapper"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import useLocalNavigate from "@/hooks/useLocalNavigate"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

const MobileSiteModal = ({ site, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
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
      setIsOpen(true)
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
              alt="Favicon"
              className="w-6 h-6 rounded"
            />
          )}
          <span className="font-medium text-[17px]">{site.name}</span>
        </div>
        <button
          onClick={handleClose}
          className="w-6 h-6 p-0 flex items-center justify-center bg-transparent border-none outline-none"
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

      {/* 📷 Изображение */}
      {imageSrc && (
        <div className="relative px-4 pt-2">
          <div className="overflow-hidden rounded-[20px] h-[220px] sm:h-[260px] relative">
            <div className="absolute bottom-[-1px] left-0 w-full h-4 z-10 pointer-events-none rounded-b-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.4)]" />
            <motion.img
              src={imageSrc}
              alt={site.name}
              initial={{ y: 0 }}
              animate={{ y: ["0%", "-10%", "0%"] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: 0,
              }}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* 📝 Описание */}
      {translatedDescription && (
        <div className="text-sm text-zinc-700 px-4 pt-6 pb-4">
          {translatedDescription}
        </div>
      )}

      {/* 🔘 Кнопки */}
      <div className="px-4 pb-6 space-y-3">
        <button
          onClick={() => {
            handleClose()
            setTimeout(() => navigate(`/review/${site.slug}`), 100)
          }}
          className="block text-center w-full bg-zinc-900 text-white text-sm py-2 rounded-full border-none outline-none"
        >
          {tReadReview}
        </button>
        <a
          href={site.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full text-white text-sm py-2 rounded-full flex items-center justify-center gap-2"
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