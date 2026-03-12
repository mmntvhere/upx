/**
 * @fileoverview Image URL utility.
 * Centralizes the logic for resolving asset paths from the backend.
 * Supports both absolute URLs (http/https), storage-relative paths (/storage),
 * and plain filenames which get prefixed with /storage.
 */

/**
 * Resolves an image path to a full usable URL.
 * @param {string|null|undefined} path - Raw path from the API.
 * @returns {string|null} Resolved URL, or null if no path provided.
 */
export const resolveImageUrl = (path) => {
  if (!path) return null
  const trimmed = path.trim()
  if (trimmed.startsWith('http') || trimmed.startsWith('/storage')) return trimmed
  return `/storage/${trimmed}`
}
