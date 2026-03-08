// src/components/CategorySeoTitle.jsx
import React from "react"


const CategorySeoTitle = ({ category }) => {
  // ✅ Хук вызван до условного return — соблюдаем Rules of Hooks
  const translatedSeoTitle = category?.seo_title || category?.name

  if (!category) return null

  return (
    <h1 className="text-[20px] sm:text-[32px] font-semibold text-white flex items-center gap-3 mb-6">
      {category.icon && (
        <img
          src={`/storage/${category.icon}`}
          alt={category.name}
          className="w-7 h-7 object-contain"
        />
      )}
      {translatedSeoTitle}
    </h1>
  )
}

export default CategorySeoTitle