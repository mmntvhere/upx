// src/layout/Layout.jsx
import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = () => {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const path = location.pathname
    const isSearchPage = path.endsWith('/search') || path === '/search'
    setSearchOpen(isSearchPage)
    
    // 📜 Сброс скролла при смене страницы (синхронно с анимацией)
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="flex flex-col min-h-screen bg-[#141415] text-white relative">
      {/* 🔝 Шапка */}
      <Header />

      {/* 📦 Контент с анимацией */}
      <main className="flex-grow w-full overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 🔻 Футер (если не поиск) */}
      {!searchOpen && <Footer />}
    </div>
  )
}

export default Layout