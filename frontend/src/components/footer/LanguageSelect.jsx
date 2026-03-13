// src/components/footer/LanguageSelect.jsx
import React, { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import LanguageDropdown from './LanguageDropdown'
import { useTranslation } from 'react-i18next'

const LanguageSelect = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] || 'en'

  return (
    <div className="relative">
      <LanguageSwitcher 
        currentLang={currentLang} 
        isOpen={isOpen}
        onOpen={() => setIsOpen((prev) => !prev)} 
      />
      <LanguageDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default LanguageSelect