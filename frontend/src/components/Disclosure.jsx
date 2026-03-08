import React, { useState, useRef, useEffect } from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

const Disclosure = ({ disclaimer }) => {
  // 📦 Состояние — открыт ли блок (по умолчанию закрыт)
  const [expanded, setExpanded] = useState(false)

  // 📐 Высота блока (для анимации раскрытия)
  const [height, setHeight] = useState("auto")
  const ref = useRef(null)

  // ✅ Перевод фразы "Editorial Disclaimer"
  const label = useTranslateUniversal("disclaimer.label", "Editorial Disclaimer")

  // 🛠 Пересчитываем высоту при открытии/закрытии
  useEffect(() => {
    if (ref.current) {
      setHeight(expanded ? `${ref.current.scrollHeight}px` : "60px")
    }
  }, [expanded, disclaimer])

  return (
    <div
      className="relative cursor-pointer overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: height }}
      onClick={() => setExpanded(!expanded)} // переключаем раскрытие
    >
      <p
        ref={ref}
        className="text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-[#A1A1AA] transition-all"
      >
        {/* 🧩 Лейбл + текст дисклеймера */}
        <span className="text-white font-semibold">{label}: </span>
        {disclaimer}
      </p>

      {/* 📉 Градиент внизу, чтобы создать эффект "сверху вниз" */}
      <div className="absolute bottom-0 left-0 w-full h-6 pointer-events-none bg-gradient-to-b from-transparent to-[#141415]" />
    </div>
  )
}

export default Disclosure