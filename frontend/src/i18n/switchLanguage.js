// src/i18n/switchLanguage.js
import i18n from './index'
import { useNavigate, useLocation } from 'react-router-dom'
import { LANGUAGES, DEFAULT_LANGUAGE } from './languageConfig'

export const useSwitchLanguage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const langCodes = LANGUAGES.map((l) => l.code)

  const switchLanguage = (newLang) => {
    const pathParts = location.pathname.split('/').filter(Boolean)

    // Удаляем старый префикс, если есть
    if (langCodes.includes(pathParts[0])) {
      pathParts.shift()
    }

    // Добавляем префикс, если язык НЕ default (en)
    if (newLang !== DEFAULT_LANGUAGE) {
      pathParts.unshift(newLang)
    }

    const newPath = '/' + pathParts.join('/')

    // 💬 Меняем язык
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)

    // ✅ Навигация без перезагрузки
    if (location.pathname !== newPath) {
      navigate(newPath, { replace: true })
    }
  }

  return switchLanguage
}