/**
 * Получить переведённый текст с учётом локали.
 *
 * @param {string} field — Основной текст (например, текст на английском, если нет перевода).
 * @param {object} translations — Объект переводов, например: { uk: "Привіт", fr: "Bonjour" }.
 * @param {string} locale — Целевая локаль, которую нужно отобразить (например, "uk").
 * @param {string} fallback — Альтернативное значение, если ни translation, ни field не заданы.
 * @returns {string} — Переведённый текст, либо основной текст, либо fallback.
 *
 * Примеры:
 *   getTranslatedText("Hello", { uk: "Привіт" }, "uk") => "Привіт"
 *   getTranslatedText("Hello", { fr: "Bonjour" }, "uk") => "Hello"
 *   getTranslatedText(null, { uk: "Привіт" }, "uk") => "Привіт"
 *   getTranslatedText(null, null, "uk", "N/A") => "N/A"
 */
export function getTranslatedText(field, translations, locale, fallback = '') {
  if (!translations || typeof translations !== 'object') {
    // Если translations отсутствует или не объект — возвращаем field или fallback
    return field || fallback;
  }

  // Пытаемся взять перевод по текущей локали. Если нет — используем field или fallback
  return translations[locale] || field || fallback;
}