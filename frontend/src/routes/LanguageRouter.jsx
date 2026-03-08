// src/routes/LanguageRouter.jsx
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import i18n from '@/i18n'
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANG_CODES,
} from '@/i18n/languageConfig'
import AppRouter from './AppRouter'

const LanguageRouter = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const path = location.pathname
  const pathParts = path.split('/').filter(Boolean)

  const currentPrefix = pathParts[0]
  const hasLangPrefix = SUPPORTED_LANG_CODES.includes(currentPrefix)

  useEffect(() => {
    const browserLang = navigator.language?.split('-')[0] || DEFAULT_LANGUAGE
    const savedLang = localStorage.getItem('lang') || browserLang
    const validLang = SUPPORTED_LANG_CODES.includes(savedLang)
      ? savedLang
      : DEFAULT_LANGUAGE

    if (hasLangPrefix) {
      i18n.changeLanguage(currentPrefix)
      localStorage.setItem('lang', currentPrefix)
    } else {
      i18n.changeLanguage(validLang)
      localStorage.setItem('lang', validLang)
    }
  }, [location.pathname])

  return <AppRouter />
}

export default LanguageRouter