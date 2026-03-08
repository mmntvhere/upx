// src/api/axiosInstance.js
import axios from "axios"

import i18n from "../i18n"

const axiosInstance = axios.create({
  baseURL: "/api", // ✅ проксируется через Vite
  headers: {
    "Content-Type": "application/json",
  },
})

// Подставляем текущий язык в каждый запрос
axiosInstance.interceptors.request.use((config) => {
  const lang = i18n.language || "en"
  config.headers["Accept-Language"] = lang
  return config
})

export default axiosInstance