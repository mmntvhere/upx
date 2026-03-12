import axios from "./axiosInstance"
import i18n from "../i18n"

// 🔄 Получить все категории с сайтами (например, для SEO-блока на странице сайта)
export const fetchAllCategories = async () => {
  const response = await axios.get("/categories")
  return response.data
}

// ✅ Получить категории со списками сайтов (для главной)
export const fetchCategories = async () => {
  const response = await axios.get("/categories")
  return response.data.data || response.data
}

// ✅ Получить конкретную категорию по SLUG (для CategoryPage) с поддержкой сортировки
export const fetchCategoryBySlug = async (slug, sort = 'popular') => {
  const response = await axios.get(`/categories/${slug}?sort=${sort}`)
  return response.data.data || response.data
}
// Примечание: fetchCategoryById удалён — маршрут /api/categories/{id} не существует в API