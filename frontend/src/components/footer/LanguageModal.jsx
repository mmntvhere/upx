import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '@/i18n/languageConfig'
import { useSwitchLanguage } from '@/i18n/switchLanguage'

const LanguageModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] || 'en'
  const modalRef = useRef(null)

  const switchLanguage = useSwitchLanguage()

  const browserLang =
    typeof navigator !== 'undefined' ? navigator.language?.split('-')[0] : 'en'

  const recommended = LANGUAGES.filter((l) => l.code === browserLang)
  const otherLangs = LANGUAGES
    .filter((l) => l.code !== browserLang)
    .sort((a, b) => a.nativeName.localeCompare(b.nativeName))

  const handleLanguageChange = (code) => {
  onClose() // 1. Закроем модалку (визуально)
  setTimeout(() => {
    switchLanguage(code) // 2. Язык и URL меняются, будет принудительный переход
  }, 50) // 3. Даем время на анимацию/отработку onClose
}

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md bg-white rounded-2xl p-6 overflow-y-auto max-h-[90vh] text-black"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('footer.language', 'Language')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-2xl"
            aria-label="Close language modal"
          >
            ✕
          </button>
        </div>

        {/* Recommended */}
        {recommended.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-500 mb-2">
              {t('footer.recommended', 'Recommended')}
            </p>
            {recommended.map((lang) => (
              <LanguageButton
                key={lang.code}
                lang={lang}
                currentLang={currentLang}
                onSelect={handleLanguageChange}
              />
            ))}
          </div>
        )}

        {/* All Languages */}
        <p className="text-sm font-semibold text-gray-500 mb-2">
          {t('footer.allLanguages', 'All Languages')}
        </p>
        {otherLangs.map((lang) => (
          <LanguageButton
            key={lang.code}
            lang={lang}
            currentLang={currentLang}
            onSelect={handleLanguageChange}
          />
        ))}
      </div>
    </div>
  )
}

const LanguageButton = ({ lang, currentLang, onSelect }) => (
  <button
    onClick={() => onSelect(lang.code)}
    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-100 ${
      currentLang === lang.code ? 'bg-gray-100 font-bold' : ''
    }`}
    aria-label={`Select language ${lang.nativeName}`}
  >
    <div className="flex items-center gap-3">
      <span className="text-xl">{lang.label}</span>
      <div className="text-left">
        <p className="text-sm">{lang.nativeName}</p>
        <p className="text-xs text-gray-500">{lang.code}</p>
      </div>
    </div>
    {currentLang === lang.code && <span className="text-blue-600 text-xl">✔</span>}
  </button>
)

export default LanguageModal