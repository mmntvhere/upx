// src/contexts/CategoryContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react"
import { fetchCategories } from "@/api/categoryApi"
import { LanguageContext } from "./LanguageContext"

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const { language } = useContext(LanguageContext)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false) // Новое состояние для "фонового" обновления
  const [error, setError] = useState(null)

  const refreshCategories = async () => {
    // Показываем основной лоадер только при первом входе
    const isInitialLoad = categories.length === 0
    if (isInitialLoad) {
      setLoading(true)
    } else {
      setIsUpdating(true)
    }
    setError(null) // ✅ Сбрасываем старую ошибку перед новой попыткой

    try {
      const data = await fetchCategories()
      setCategories(data)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
      setError(err.message || "Failed to load categories")
    } finally {
      setLoading(false)
      setIsUpdating(false)
    }
  }

  // Fetch when language changes
  useEffect(() => {
    refreshCategories()
  }, [language])

  return (
    <CategoryContext.Provider value={{ categories, loading, isUpdating, error, refreshCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategories = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider")
  }
  return context
}
