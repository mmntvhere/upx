import React from "react"
import { LANGUAGES } from "@/i18n/languageConfig"

const LangFlags = ({ langs = [] }) => {
  if (!langs || langs.length !== 1) return null

  const langCode = langs[0]?.toLowerCase()
  if (!langCode) return null
  
  // Маппинг кодов языков в коды стран для флагов (ISO 3166-1 alpha-2)
  const countryMapping = {
    en: 'gb',
    uk: 'ua',
    hi: 'in',
    ko: 'kr',
    ja: 'jp',
    zh: 'cn',
    he: 'il',
    da: 'dk',
    sv: 'se',
    no: 'no',
    fi: 'fi',
    el: 'gr',
    cs: 'cz',
    vi: 'vn',
    ar: 'sa'
  }

  const countryCode = countryMapping[langCode] || langCode
  const langConfig = LANGUAGES.find(l => l.code === langCode)
  
  return (
    <img 
      src={`https://flagcdn.com/w80/${countryCode}.png`}
      alt={langConfig?.name || langCode}
      className="w-full h-full object-cover scale-[1.3] pointer-events-none"
      title={langConfig?.name || langCode}
      onError={(e) => {
        e.target.style.display = 'none'
      }}
    />
  )
}

export default LangFlags