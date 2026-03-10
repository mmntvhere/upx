import React from "react"
import { LANGUAGES } from "@/i18n/languageConfig"

const LangFlags = ({ langs = [] }) => {
  // Показываем флаг только если явно задан ровно один язык
  if (!langs || langs.length !== 1) return null

  const langCode = langs[0]?.toLowerCase()
  if (!langCode) return null
  
  const langConfig = LANGUAGES.find(l => l.code === langCode)
  const flag = langConfig ? langConfig.label : langCode.toUpperCase()

  return (
    <span
      className="ml-1 text-sm inline-flex items-center justify-center leading-none"
      title={`Current language: ${langCode.toUpperCase()}`}
    >
      {flag}
    </span>
  )
}

export default LangFlags