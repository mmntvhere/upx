// src/components/footer/LanguageSwitcher.jsx
import React from 'react'
import { LANGUAGES } from '@/i18n/languageConfig'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'
import { ChevronDown } from 'lucide-react'
import LangFlags from '../LangFlags'

const LanguageSwitcher = ({ currentLang = 'en', onOpen = () => {}, isOpen = false }) => {
  const languageLabel = useTranslateUniversal('footer.language', 'Language')
  const currentLanguage = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0]

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      className={`h-[40px] px-2.5 pl-1.5 rounded-full flex items-center gap-2.5 transition-all duration-300 group active:scale-95 border ${
        isOpen 
          ? 'bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
          : 'bg-white/[0.03] text-white/50 border-white/5 hover:bg-white/[0.08] hover:text-white hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]'
      }`}
      aria-label={languageLabel}
    >
      <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[15px] shrink-0 overflow-hidden transition-transform group-hover:scale-110">
        <LangFlags langs={[currentLang]} />
      </div>
      
      <span className="text-[13px] font-medium tracking-wide">
        {currentLanguage.name}
      </span>
      
      <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  )
}

export default LanguageSwitcher