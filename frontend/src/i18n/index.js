import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 🔗 Импорт JSON-файлов переводов
import translationEN from './locales/en/translation.json'
import translationUK from './locales/uk/translation.json'
import translationES from './locales/es/translation.json'
import translationFR from './locales/fr/translation.json'
import translationDE from './locales/de/translation.json'
import translationIT from './locales/it/translation.json'
import translationPT from './locales/pt/translation.json'
import translationPL from './locales/pl/translation.json'
import translationNL from './locales/nl/translation.json'
import translationRU from './locales/ru/translation.json'
import translationTR from './locales/tr/translation.json'
import translationRO from './locales/ro/translation.json'
import translationSV from './locales/sv/translation.json'
import translationFI from './locales/fi/translation.json'
import translationNO from './locales/no/translation.json'
import translationDA from './locales/da/translation.json'
import translationCS from './locales/cs/translation.json'
import translationHU from './locales/hu/translation.json'
import translationEL from './locales/el/translation.json'
import translationHE from './locales/he/translation.json'
import translationHI from './locales/hi/translation.json'
import translationID from './locales/id/translation.json'
import translationVI from './locales/vi/translation.json'
import translationTH from './locales/th/translation.json'
import translationJA from './locales/ja/translation.json'
import translationKO from './locales/ko/translation.json'
import translationZH from './locales/zh/translation.json'
import translationAR from './locales/ar/translation.json'

// 🌍 Ресурсы переводов
const resources = {
  en: { translation: translationEN },
  uk: { translation: translationUK },
  es: { translation: translationES },
  fr: { translation: translationFR },
  de: { translation: translationDE },
  it: { translation: translationIT },
  pt: { translation: translationPT },
  pl: { translation: translationPL },
  nl: { translation: translationNL },
  ru: { translation: translationRU },
  tr: { translation: translationTR },
  ro: { translation: translationRO },
  sv: { translation: translationSV },
  fi: { translation: translationFI },
  no: { translation: translationNO },
  da: { translation: translationDA },
  cs: { translation: translationCS },
  hu: { translation: translationHU },
  el: { translation: translationEL },
  he: { translation: translationHE },
  hi: { translation: translationHI },
  id: { translation: translationID },
  vi: { translation: translationVI },
  th: { translation: translationTH },
  ja: { translation: translationJA },
  ko: { translation: translationKO },
  zh: { translation: translationZH },
  ar: { translation: translationAR },
}

// ⚙️ Настройка i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    // 🧠 Язык по умолчанию
    fallbackLng: 'en',

    // ✅ Языки, которые поддерживаются
    supportedLngs: [
  'en', 'uk', 'fr', 'de', 'es', 'it', 'pt', 'pl', 'nl', 'ru', 'tr', 'ro', 'sv',
  'fi', 'no', 'da', 'cs', 'hu', 'el', 'he', 'hi', 'id', 'vi', 'th', 'ja', 'ko', 'zh', 'ar'
],

    // 🔄 Авто-сопоставление uk-UA → uk
    nonExplicitSupportedLngs: true,

    // 💾 Определение языка
    detection: {
  order: ['path', 'localStorage', 'navigator'],
  lookupFromPathIndex: 0,
  caches: ['localStorage'],
},

    interpolation: {
      escapeValue: false, // Не требуется для React
    },

    // debug: true, // Включи при необходимости
  })

export default i18n