// src/contexts/CategoryContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react"
import { fetchCategories } from "@/api/categoryApi"
import { LanguageContext } from "./LanguageContext"

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const { language } = useContext(LanguageContext)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshCategories = async () => {
    setLoading(true)
    try {
      const data = await fetchCategories()
      setCategories(data)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch when language changes
  useEffect(() => {
    refreshCategories()
  }, [language])

  return (
    <CategoryContext.Provider value={{ categories, loading, error, refreshCategories }}>
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
