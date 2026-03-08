import axios from "./axiosInstance"
import i18n from "../i18n"

// 🔄 Получить все категории с сайтами (например, для SEO-блока на странице сайта)
export const fetchAllCategories = async () => {
  const response = await axios.get("/categories")
  return response.data
}

// ✅ Получить категории со списками сайтов (для главной и CategoryPage)
export const fetchCategories = async () => {
  const response = await axios.get("/categories")
  return response.data
}
// Примечание: fetchCategoryById удалён — маршрут /api/categories/{id} не существует в API