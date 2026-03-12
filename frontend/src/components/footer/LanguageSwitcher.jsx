// src/components/footer/LanguageSwitcher.jsx
import React from 'react'
import { LANGUAGES } from '@/i18n/languageConfig'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

import LangFlags from '../LangFlags'

const LanguageSwitcher = ({ currentLang = 'en', onOpen = () => {} }) => {
  const languageLabel = useTranslateUniversal('footer.language', 'Language')
  const currentLanguage = LANGUAGES.find((l) => l.code === currentLang)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      className="flex items-center gap-2.5 bg-white/5 px-2.5 py-1.5 rounded-full text-sm hover:bg-white/10 transition-all border border-white/5 active:scale-95 group"
      aria-label={languageLabel}
    >
      <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
        <LangFlags langs={[currentLang]} />
      </div>
      
      <span className="uppercase font-bold tracking-widest text-[11px] text-white/50 group-hover:text-white transition-colors">
        {currentLanguage?.code || 'EN'}
      </span>
      
      <svg
        className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-all transform group-hover:translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export default LanguageSwitcher