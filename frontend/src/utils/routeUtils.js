import { SUPPORTED_LANG_CODES, DEFAULT_LANGUAGE } from '../i18n/languageConfig';

/**
 * Generates a localized path.
 * If the language is the default language, returns the path as is.
 * Otherwise, prepends the language code.
 */
export const getLocalizedPath = (path, lang) => {
  if (typeof path !== 'string') return path;

  // Ignore external links, mailto, tel, and anchor links
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }

  // Handle root level explicitly
  if (path === '/' && lang && lang !== DEFAULT_LANGUAGE) {
    return `/${lang}`;
  }

  if (!lang || lang === DEFAULT_LANGUAGE) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `/${lang}/${cleanPath}`;
};


