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

  return (
    <div
      onClick={onClick}
      className="relative w-full h-[300px] rounded-[24px] overflow-hidden cursor-pointer shadow-[0_6px_18px_rgba(255,255,255,0.08)] transition-shadow"
    >
      {/* 🖼 Фоновое изображение */}
      {imageSrc && (
  <img
    src={imageSrc}
    alt={site.name}
    className="w-full h-full object-cover"
  />
)}

      {/* 🌫️ Градиент стекло-эффект */}
      <div
  className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
  style={{
    height: "200px", // можно варьировать по желанию
    background: "rgba(24, 24, 24, 0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    maskImage: "linear-gradient(to top, black 50%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 100%)",
    marginLeft: "-1px",
    marginRight: "-1px",
    width: "calc(100% + 2px)",
    borderRadius: "0 0 24px 24px", // если верхние края скруглены
  }}
/>

      {/* 📄 Контент */}
<div className="absolute bottom-3 left-4 right-4 z-20 text-white flex flex-col gap-2">
  {/* 🔗 Название */}
  <div className="flex items-center gap-2 text-[15px] sm:text-[17px] font-bold leading-tight">
  {site.favicon && (
    <img
      src={`/storage/${site.favicon}`}
      alt="favicon"
      className="w-4 h-4 rounded-sm object-contain"
    />
  )}
  <span>{site.name}</span>
  <LangFlags langs={site.enabled_languages} />
</div>

  {/* 📝 Описание */}
  {site.description && (
    <p className="text-[11px] sm:text-[12px] text-white/80 leading-snug line-clamp-2 sm:line-clamp-2">
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
      className="bg-white/10 text-white text-[12px] px-3 py-[6px] rounded-full hover:bg-white/20 transition whitespace-nowrap"
    >
      Читать обзор
    </button>

    {/* Кнопка Open — твоя текущая рабочая версия */}
    {site.link && (
  <button
    onClick={(e) => {
      e.stopPropagation()
      window.open(site.link, "_blank")
    }}
    className="group relative flex items-center h-[36px] min-h-[36px]
      w-[36px] min-w-[36px] bg-transparent border border-white
      rounded-full overflow-hidden transition-all duration-300 ease-in-out
      lg:hover:pl-[40px] lg:hover:pr-3 lg:hover:w-auto"
    title={`Відкрити ${site.name}`}
  >
    {/* 🔴 Красный круг со стрелкой */}
    <div
      className="absolute left-0 top-0 w-[36px] h-[36px] rounded-full bg-[#D80032]
        flex items-center justify-center z-10 pointer-events-none transition-transform duration-300 ease-in-out
        group-hover:rotate-45"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 19L19 5M5 5h14v14" />
      </svg>
    </div>

    {/* 🧾 Появляющийся текст */}
    <span
  className="hidden lg:inline-flex items-center opacity-0 group-hover:opacity-100
    ml-3 transition-all duration-300 ease-in-out whitespace-nowrap
    overflow-hidden text-white"
>
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