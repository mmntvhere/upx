import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useCategories } from "@/contexts/CategoryContext"
import { useLanguage } from "@/hooks/useLanguage"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import LocalLink from "./LocalLink"
import { Search, Mail, Twitter, ShoppingBag, Moon, X, ChevronRight } from "lucide-react"
import LangFlags from "./LangFlags"
import { motion, AnimatePresence } from "framer-motion"

// Для языков
import { LANGUAGES } from '@/i18n/languageConfig'
import { useSwitchLanguage } from '@/i18n/switchLanguage'

const MobileMenu = ({ isOpen, onClose, onOpenSearch }) => {
  const { categories } = useCategories()
  const currentLang = useLanguage()
  const { t } = useTranslation()
  const switchLanguage = useSwitchLanguage()

  const [langOpen, setLangOpen] = useState(false)

  // Глобальная блокировка скролла, предотвращающая конфликты с поиском
  useBodyScrollLock(isOpen)

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-[60px] md:top-[72px] inset-x-0 bottom-0 z-50 flex flex-col bg-[#0a0a0a]/85 ui-glass-xl"
        >
          <div className="flex-1 overflow-y-auto pb-8 hide-scrollbar">
            {/* 🛠 Функциональные иконки и Язык */}
            <motion.div variants={itemVariants} className="flex items-center justify-between px-5 py-4 border-b border-white/5 relative z-20">
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 p-0 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/10 transition">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 p-0 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/10 transition">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 p-0 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/10 transition relative">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#121212]"></span>
                </button>
              </div>

              {/* Язык */}
              <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-full border transition-all duration-300 ${
                    langOpen 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-white/5 border-white/5 text-white/70'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                    <LangFlags langs={[currentLang]} />
                  </div>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Выпадающий список языков */}
                <AnimatePresence>
                  {langOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-56 max-h-[320px] overflow-y-auto bg-[#1c1c1e]/80 ui-glass-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 ring-1 ring-white/5 scrollbar-hide py-2"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            switchLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className={`w-[calc(100%-16px)] mx-2 flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group mb-1 last:mb-0 ${
                            currentLang === lang.code 
                              ? 'bg-[#D80032]/10 text-white font-bold border border-[#D80032]/20' 
                              : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full overflow-hidden bg-white/5 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                              <LangFlags langs={[lang.code]} />
                            </div>
                            <span className="text-[13px] tracking-wide">{lang.name}</span>
                          </div>
                          {currentLang === lang.code && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D80032] shadow-[0_0_10px_rgba(216,0,50,0.5)]" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 📋 Список категорий */}
            <div className="px-5 py-2">
              {categories.map((category) => {
                const categorySites = category.sites || []
                const topSites = categorySites.filter(s => s.favicon).slice(0, 5)

                return (
                  <motion.div variants={itemVariants} key={category.id}>
                    <LocalLink 
                      to={`/${category.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between py-6 border-b border-white/5 group relative overflow-hidden"
                    >
                      {/* Левая часть: Иконка */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                          {category.icon ? (
                            <img src={`/storage/${category.icon}`} alt={category.name} className="w-full h-full object-contain drop-shadow-md brightness-110" />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-white/10" />
                          )}
                        </div>

                        {/* Название и превью сайтов */}
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                          <span className="text-white text-[17px] font-semibold tracking-wide">
                            {category.name}
                          </span>
                          {topSites.length > 0 && (
                            <div className="flex items-center mt-1">
                              {topSites.map((site, index) => (
                                <div 
                                  key={site.id} 
                                  className="w-[22px] h-[22px] rounded-full overflow-hidden bg-[#1c1c1e] relative shrink-0 shadow-md border border-white/20"
                                  style={{ marginLeft: index === 0 ? '0' : '-8px', zIndex: 10 - index }}
                                >
                                  <img src={`/storage/${site.favicon}`} alt={site.name} className="w-full h-full object-cover scale-110" />
                                </div>
                              ))}
                              {categorySites.length > 5 && (
                                <span className="text-[11px] text-white/50 ml-2 font-medium tracking-wider">+{categorySites.length - 5}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Правая часть: Стрелочка */}
                      <div className="text-white/20 group-hover:text-white/80 transition-colors shrink-0 ml-2 group-hover:translate-x-1 duration-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </LocalLink>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
