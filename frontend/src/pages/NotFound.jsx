import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LocalLink from '@/components/LocalLink'
import { Home } from 'lucide-react'
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import CategorySeoCard from "@/components/CategorySeoCard"
import { useCategories } from "@/contexts/CategoryContext"

const NotFound = () => {
  const { t } = useTranslation()
  const { categories } = useCategories()
  const otherCategoriesTitle = useTranslateUniversal("categoryPage.otherCategories", "Other categories")

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="flex items-center justify-center min-h-[60vh] px-4 py-16 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primaryLink/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative z-10 max-w-lg"
        >
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", damping: 15 }}
            className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-none mb-6"
          >
            {t('notFound.title')}
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            {t('notFound.subTitle')}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white/60 mb-10 leading-relaxed text-lg"
          >
            {t('notFound.description')}
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.5 }}
          >
            <LocalLink 
              to="/"
              className="inline-flex items-center gap-2 bg-primaryLink hover:bg-primaryLinkHover text-white font-semibold px-8 py-3.5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-primaryLink/20"
            >
              <Home className="w-5 h-5" />
              {t('notFound.backHome')}
            </LocalLink>
          </motion.div>
        </motion.div>
      </div>

      {/* 🔗 Другие категории */}
      {categories && categories.length > 0 && (
        <div className="mt-8 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-6 text-white text-center sm:text-left">
            {otherCategoriesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategorySeoCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotFound
