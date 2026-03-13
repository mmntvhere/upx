// src/components/footer/LanguageDropdown.jsx
import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n/languageConfig'
import { useSwitchLanguage } from '@/i18n/switchLanguage'
import LangFlags from '../LangFlags'

const LanguageDropdown = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] || 'en'
  const dropdownRef = useRef(null)
  const switchLanguage = useSwitchLanguage()

  // Получаем язык браузера
  const browserLang =
    typeof navigator !== 'undefined' ? navigator.language?.split('-')[0] : 'en'

  const recommended = LANGUAGES.filter((l) => l.code === browserLang)

  const otherLangs = LANGUAGES
    .filter((l) => l.code !== browserLang)
    .sort((a, b) => {
      if (a.code === 'en') return -1
      if (b.code === 'en') return 1
      return a.nativeName.localeCompare(b.nativeName)
    })

  // Закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose()
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  const handleChange = (code) => {
    switchLanguage(code)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="absolute top-full mt-3 right-0 w-[280px] max-h-[450px] bg-[#1c1c1e]/80 ui-glass-xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden z-50 border border-white/10 ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-200"
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 🔮 Header с эффектом стекла */}
      <div className="sticky top-0 bg-white/[0.03] ui-glass-xl z-10 px-4 py-2.5 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t('footer.language', 'Language')}</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full"
          aria-label={t('footer.close', 'Close')}
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="hover:rotate-90 transition-all duration-300"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto max-h-[380px] py-3 scrollbar-hide">
        {/* Recommended */}
        {recommended.length > 0 && (
          <div className="px-2.5 pb-4">
            <p className="px-1 pb-2 text-[10px] font-black uppercase tracking-widest text-[#D80032]">
              {t('footer.recommended', 'Recommended')}
            </p>
            {recommended.map((lang) => (
              <LanguageItem
                key={lang.code}
                lang={lang}
                currentLang={currentLang}
                onSelect={handleChange}
              />
            ))}
          </div>
        )}

        {/* All Languages */}
        <div className="px-2.5">
          <p className="px-1 pb-2 text-[10px] font-black uppercase tracking-widest text-white/30">
            {t('footer.allLanguages', 'All Languages')}
          </p>
          <div className="space-y-1">
            {otherLangs.map((lang) => (
              <LanguageItem
                key={lang.code}
                lang={lang}
                currentLang={currentLang}
                onSelect={handleChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const LanguageItem = ({ lang, currentLang, onSelect }) => {
  const isActive = currentLang === lang.code

  return (
    <button
      onClick={() => onSelect(lang.code)}
      className={`w-full flex justify-between items-center py-3 px-2.5 rounded-xl transition-all duration-200 group ${
        isActive ? 'bg-[#D80032]/10 border border-[#D80032]/20' : 'hover:bg-white/5 border border-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
          <LangFlags langs={[lang.code]} />
        </div>
        <div className="text-left">
          <p className={`text-sm ${isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'}`}>{lang.name}</p>
          <p className="text-[10px] text-white/30 uppercase tracking-tighter">{lang.nativeName}</p>
        </div>
      </div>

      {isActive && (
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D80032] shadow-lg shadow-red-600/30 shrink-0 ml-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </button>
  )
}

export default LanguageDropdown


