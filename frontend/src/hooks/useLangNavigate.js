import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

/**
 * Обёртка над navigate() с автоматическим префиксом языка
 *
 * Пример:
 *   const navigate = useLangNavigate()
 *   navigate('/category/xyz') → "/uk/category/xyz" (если выбран uk)
 */
export const useLangNavigate = () => {
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  return (to, options = {}) => {
    const path = typeof to === "string" ? to : to?.pathname || "/"
    const prefix = i18n.language === "en" ? "" : `/${i18n.language}`
    const finalPath = path.startsWith("/") ? path : `/${path}`
    navigate(`${prefix}${finalPath}`, options)
  }
}