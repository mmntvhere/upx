// src/contexts/LanguageContext.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react"
import i18n from "@/i18n"

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const getShortLang = (fullLang) => fullLang?.split("-")[0] || "en"
  const [language, setLanguage] = useState(getShortLang(i18n.language))

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language])

  // Слушаем внешние изменения i18n и синхронизируем
  useEffect(() => {
    const handleLangChange = (lng) => {
      setLanguage(getShortLang(lng))
    }

    i18n.on("languageChanged", handleLangChange)
    return () => {
      i18n.off("languageChanged", handleLangChange)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}