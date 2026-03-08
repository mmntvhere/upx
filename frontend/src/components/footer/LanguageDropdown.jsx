// src/components/LanguageDropdown.jsx
import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n/languageConfig'
import { useSwitchLanguage } from '@/i18n/switchLanguage'

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
    .sort((a, b) => a.nativeName.localeCompare(b.nativeName))

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
      className="absolute top-full mt-2 right-0 w-[320px] max-h-[425px] bg-white text-black shadow-lg rounded-xl overflow-hidden z-50 border border-gray-200"
      ref={dropdownRef}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold">{t('footer.language', 'Мови')}</h2>
        <button
  onClick={onClose}
  className="w-6 h-6 p-0 flex items-center justify-center bg-transparent border-none outline-none"
  style={{ color: "rgb(111, 116, 128)" }}
  aria-label={t('footer.close', 'Close language dropdown')}
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</button>
      </div>

      <div className="overflow-y-auto max-h-[380px]">
        {/* Recommended */}
        {recommended.length > 0 && (
          <div className="px-4 pt-4">
            <p className="text-sm font-semibold text-gray-500 mb-2">
              {t('footer.recommended', 'Рекомендовані')}
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
        <div className="px-4 pt-4">
          <p className="text-sm font-semibold text-gray-500 mb-2">
            {t('footer.allLanguages', 'Всі мови')}
          </p>
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
  )
}

const LanguageItem = ({ lang, currentLang, onSelect }) => {
  const isActive = currentLang === lang.code

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        onClick={() => onSelect(lang.code)}
        className={`btn-lang w-full flex justify-between items-center py-2 px-0 hover:bg-gray-100 transition-colors ${
          isActive ? 'bg-gray-100 font-bold' : 'bg-white font-normal'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{lang.label}</span>
          <div className="text-left">
            <p className="text-sm text-black">{lang.name}</p>
            <p className="text-xs text-gray-500">{lang.nativeName}</p>
          </div>
        </div>

        {isActive && (
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600">
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="20 6 9 17 4 12"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)}
      </button>
    </div>
  )
}

export default LanguageDropdown


