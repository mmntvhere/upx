// src/components/footer/LanguageSwitcher.jsx
import React from 'react'
import { LANGUAGES } from '@/i18n/languageConfig'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

const LanguageSwitcher = ({ currentLang = 'en', onOpen = () => {} }) => {
  const languageLabel = useTranslateUniversal('footer.language', 'Language')
  const currentLanguage = LANGUAGES.find((l) => l.code === currentLang)

  return (
    <button
      onClick={onOpen}
      className="flex items-center bg-[#1f1f1f] px-3 py-1.5 rounded-lg text-sm hover:bg-[#2a2a2a] transition"
      aria-label={languageLabel}
    >
      {/* Флаг */}
      <span className="mr-2">{currentLanguage?.label || '🌐'}</span>

      {/* Код языка */}
      <span className="uppercase">{currentLanguage?.code || 'EN'}</span>

      {/* Стрелочка */}
      <svg
        className="w-3 h-3 ml-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export default LanguageSwitcher