// src/i18n/languageConfig.js
export const LANGUAGES = [
  { code: "en", label: "🇬🇧", name: "English", nativeName: "English" },
  { code: "uk", label: "🇺🇦", name: "Ukrainian", nativeName: "Українська" },
  { code: "fr", label: "🇫🇷", name: "French", nativeName: "Français" },
  { code: "de", label: "🇩🇪", name: "German", nativeName: "Deutsch" },
  { code: "es", label: "🇪🇸", name: "Spanish", nativeName: "Español" },
  { code: "it", label: "🇮🇹", name: "Italian", nativeName: "Italiano" },
  { code: "pt", label: "🇵🇹", name: "Portuguese", nativeName: "Português" },
  { code: "pl", label: "🇵🇱", name: "Polish", nativeName: "Polski" },
  { code: "nl", label: "🇳🇱", name: "Dutch", nativeName: "Nederlands" },
  { code: "ru", label: "🇷🇺", name: "Russian", nativeName: "Русский" },
  { code: "tr", label: "🇹🇷", name: "Turkish", nativeName: "Türkçe" },
  { code: "ro", label: "🇷🇴", name: "Romanian", nativeName: "Română" },
  { code: "sv", label: "🇸🇪", name: "Swedish", nativeName: "Svenska" },
  { code: "fi", label: "🇫🇮", name: "Finnish", nativeName: "Suomi" },
  { code: "no", label: "🇳🇴", name: "Norwegian", nativeName: "Norsk" },
  { code: "da", label: "🇩🇰", name: "Danish", nativeName: "Dansk" },
  { code: "cs", label: "🇨🇿", name: "Czech", nativeName: "Čeština" },
  { code: "hu", label: "🇭🇺", name: "Hungarian", nativeName: "Magyar" },
  { code: "el", label: "🇬🇷", name: "Greek", nativeName: "Ελληνικά" },
  { code: "he", label: "🇮🇱", name: "Hebrew", nativeName: "עברית" },
  { code: "hi", label: "🇮🇳", name: "Hindi", nativeName: "हिन्दी" },
  { code: "id", label: "🇮🇩", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "vi", label: "🇻🇳", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "th", label: "🇹🇭", name: "Thai", nativeName: "ไทย" },
  { code: "ja", label: "🇯🇵", name: "Japanese", nativeName: "日本語" },
  { code: "ko", label: "🇰🇷", name: "Korean", nativeName: "한국어" },
  { code: "zh", label: "🇨🇳", name: "Chinese", nativeName: "中文" },
  { code: "ar", label: "🇸🇦", name: "Arabic", nativeName: "العربية" }
]

export const DEFAULT_LANGUAGE = "en"

export const SUPPORTED_LANG_CODES = LANGUAGES.map((lang) => lang.code)