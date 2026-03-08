// src/api/siteApi.js
import axios from "./axiosInstance"

/**
 * Получает сайт по слагу.
 *
 * @param {string} slug - Уникальный slug сайта
 * @returns {Promise<import("../types").Site>} Данные сайта
 * @throws {Error} При ошибке запроса
 */
export const fetchSiteBySlug = async (slug) => {
  if (!slug || typeof slug !== "string") {
    throw new Error("❌ Параметр slug обязателен и должен быть строкой")
  }

  try {
    const response = await axios.get(`/sites/${slug}`)
    return response.data
  } catch (error) {
    console.error(`❌ Ошибка при получении сайта с slug "${slug}":`, error)
    throw error
  }
}