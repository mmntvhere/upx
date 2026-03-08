import { useContext } from "react"
import { LanguageContext } from "@/contexts/LanguageContext"

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  // Защита от ошибки
  if (!context || !context.language) {
    return "en" // fallback на английский
  }

  return context.language
}