// src/utils/translate.js
export const getTranslated = (translations, fallback, locale = "en") => {
  if (!translations || typeof translations !== "object") return fallback
  return translations[locale] || fallback
}