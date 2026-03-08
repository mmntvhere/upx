import { useTranslation } from "react-i18next"

/**
 * Возвращает языковой префикс для URL: "/uk", "/es", "/fr" — или пустую строку для "en"
 */
export const useLangPrefix = () => {
  const { i18n } = useTranslation()
  return i18n.language === "en" ? "" : `/${i18n.language}`
}