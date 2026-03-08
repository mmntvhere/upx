import { SUPPORTED_LANG_CODES, DEFAULT_LANGUAGE } from '../i18n/languageConfig';

/**
 * Generates a localized path.
 * If the language is the default language, returns the path as is.
 * Otherwise, prepends the language code.
 */
export const getLocalizedPath = (path, lang) => {
  if (!lang || lang === DEFAULT_LANGUAGE) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `/${lang}/${cleanPath}`;
};


