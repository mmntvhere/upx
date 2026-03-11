import axios from "./axiosInstance"

export const fetchPages = async () => {
  const response = await axios.get("/pages")
  return response.data
}

export const fetchPageBySlug = async (slug) => {
  const response = await axios.get(`/pages/${slug}`)
  return response.data
}
