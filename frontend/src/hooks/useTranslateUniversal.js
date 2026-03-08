import { useTranslation } from "react-i18next"

/**
 * Универсальный хук перевода для UI-интерфейса и мультиязычных данных из БД.
 *
 * Использование:
 *   useTranslateUniversal("ui.key") → переведёт строку из i18n ресурсов
 *   useTranslateUniversal({ en: "Title", uk: "Назва" }) → вернёт локализованное значение из БД
 *
 * @param {string|Object|null} input — Ключ перевода или объект с локализованными значениями (напр. { en: "text", uk: "текст" })
 * @param {string} [fallback=""] — Фолбэк значение, если перевод не найден
 * @param {Object} [options={}] — Опции для i18n.t() (напр. count, interpolation и т.д.)
 * @returns {string}
 */
export const useTranslateUniversal = (input, fallback = "", options = {}) => {
  const { t, i18n } = useTranslation()


  // Если передана строка, которая не является UI-ключом, i18next
  // по умолчанию возвращает сам ключ (если ключ содержит пробелы и т.п.)
  // Это значит, что для строк из БД этот хук тоже безопасен,
  // хотя теперь лучше использовать прямые ссылки e.g. `site.name`

  // 🔤 Case 2: UI ключ из translation.json
  if (typeof input === "string") {
    const translated = t(input, { ...options, defaultValue: "" })

    // Если нет перевода — фолбэк на английский ресурс или fallback значение
    if (!translated || translated === input) {
      const enTranslation = i18n.getResource("en", "translation", input)
      return enTranslation || fallback || input
    }

    return translated
  }

  // 🚨 Case 3: Недопустимый input
  return fallback || ""
}