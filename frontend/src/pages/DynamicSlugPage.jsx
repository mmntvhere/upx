import React from "react"
import { useParams } from "react-router-dom"
import { useCategories } from "@/contexts/CategoryContext"
import CategoryPage from "@/pages/CategoryPage"
import StaticPage from "@/pages/StaticPage"

const DynamicSlugPage = () => {
   const { slug } = useParams()
   const { categories, loading } = useCategories()
   
   if (loading) {
      return (
         <div className="flex justify-center items-center h-[60vh]">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
         </div>
      )
   }
   
   // Check if the slug belongs to a category
   const isCategory = categories.some((c) => c.slug === slug)
   
   if (isCategory) {
      return <CategoryPage />
   }
   
   // If it's not a category, we assume it's a static page
   return <StaticPage />
}

export default DynamicSlugPage
