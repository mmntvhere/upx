import React from "react"

const FLAGS = {
  en: "🇬🇧",
  uk: "🇺🇦",
  es: "🇪🇸",
  de: "🇩🇪",
}

const LangFlags = ({ langs = [] }) => {
  // Показываем флаг только если явно задан ровно один язык
  if (!langs || langs.length !== 1) return null

  const lang = langs[0]
  const flag = FLAGS[lang] ?? lang.toUpperCase()

  return (
    <span
      className="ml-1 text-sm"
      title={`Only visible in ${lang.toUpperCase()}`}
    >
      {flag}
    </span>
  )
}

export default LangFlags