// src/api/axiosInstance.js
import axios from "axios"

import i18n from "../i18n"

const axiosInstance = axios.create({
  baseURL: "/api", // ✅ проксируется через Vite
  headers: {
    "Content-Type": "application/json",
  },
})

// Подставляем текущий язык в каждый запрос (в формате 'en' или 'ru')
axiosInstance.interceptors.request.use((config) => {
  const fullLang = i18n.language || "en"
  const shortLang = fullLang.split("-")[0]
  config.headers["Accept-Language"] = shortLang
  return config
})

export default axiosInstance