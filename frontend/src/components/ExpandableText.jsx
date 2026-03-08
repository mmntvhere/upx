import React, { useState } from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

const ExpandableText = ({ text }) => {
  const [expanded, setExpanded] = useState(false)

  // ✅ Переводы для кнопки
  const readMoreLabel = useTranslateUniversal("expandable.readMore", "Read more")
  const hideLabel = useTranslateUniversal("expandable.hide", "Hide")

  return (
    <div className="relative">
      {/* 📄 Основной блок текста с обрезкой по 6 строк, если не развернут */}
      <div
        className={`transition-all duration-300 ease-in-out text-[12px] leading-relaxed prose prose-invert prose-sm max-w-none ${
          expanded
            ? "text-[#A1A1AA]"
            : "line-clamp-6 text-transparent bg-gradient-to-b from-[#A1A1AA] to-[#141415] bg-clip-text"
        }`}
        // Вставляем HTML-текст как есть. Важно убедиться, что он безопасен!
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {/* 🔘 Кнопка "Читать дальше / Скрыть" */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-2 text-white text-[11px] font-medium flex items-center gap-1"
      >
        {expanded ? hideLabel : readMoreLabel}
        <svg
          className={`w-4 h-4 transform transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

export default ExpandableText