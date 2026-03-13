import React from "react"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import LangFlags from "@/components/LangFlags"
import { useLanguage } from "@/hooks/useLanguage"
import { getLocalizedPath } from "@/utils/routeUtils"

const SiteListCard = ({ site, onClick }) => {
  const language = useLanguage()
  const imageSrc = site?.main_image
    ? `/storage/${site.main_image}`
    : site?.preview || ""

  const navigate = useLocalNavigate()
  const isHoverable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-[300px] rounded-[24px] overflow-hidden cursor-pointer shadow-lg group transition-transform duration-300 ${isHoverable ? "hover:-translate-y-1" : ""} bg-[#141415]`}
      style={{ isolation: "isolate" }}
    >
      {/* 🖼 Фоновое изображение */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={site.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHoverable ? "group-hover:scale-110" : ""}`}
        />
      )}

      {/* 🌫️ Мягкий градиент (как на референсе) */}
      <div
        className="absolute -inset-[1px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #141415 0%, rgba(20, 20, 20, 0.95) 20%, rgba(20, 20, 20, 0.4) 45%, transparent 70%)",
          borderRadius: "inherit"
        }}
      />

      {/* 📄 Контент (вертикальная структура как была) */}
      <div className="absolute bottom-4 left-5 right-5 z-20 text-white flex flex-col gap-2">
        {/* 🔗 Название */}
        <div className="flex items-center gap-2 text-[16px] sm:text-[18px] font-bold leading-tight">
          {site.favicon && (
            <img
              src={`/storage/${site.favicon}`}
              alt="favicon"
              className="w-4 h-4 rounded-sm object-contain"
            />
          )}
          <span>{site.name}</span>
          {site.enabled_languages?.length === 1 && (
            <div className="w-5 h-5 rounded-full overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
              <LangFlags langs={site.enabled_languages} />
            </div>
          )}
        </div>

        {/* 📝 Описание */}
        {site.description && (
          <p className="text-[11px] sm:text-[12px] text-white/80 leading-snug line-clamp-2">
            {site.description}
          </p>
        )}

        {/* 🔘 Кнопки */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/review/${site.slug}`)
            }}
            className="bg-white/10 text-white text-[12px] px-4 py-[7px] rounded-full hover:bg-white/20 transition whitespace-nowrap"
          >
            Читать обзор
          </button>

          {/* Кнопка Open (Исправленный эффект выдвижения) */}
          {site.link && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                window.open(site.link, "_blank")
              }}
              className="group relative flex items-center h-[36px] w-[36px] hover:w-auto max-w-[36px] lg:hover:max-w-[240px] bg-transparent border border-white/30 rounded-full overflow-hidden transition-all duration-300 ease-in-out lg:hover:pr-4"
            >
              {/* 🔴 Неподвижный красный круг */}
              <div className="absolute left-0 top-0 w-[36px] h-[36px] rounded-full bg-[#D80032] flex items-center justify-center z-10 shrink-0 transition-transform duration-300 group-hover:rotate-45">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M5 5h14v14" />
                </svg>
              </div>

              {/* 🧾 Выезжающий текст */}
              <span className="flex items-center text-white text-sm whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out pl-10 pr-1 group-hover:opacity-100">
                Open <span className="font-bold ml-1">{site.name}</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SiteListCard