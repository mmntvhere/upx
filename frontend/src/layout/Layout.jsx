// src/layout/Layout.jsx
import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = () => {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const path = location.pathname
    const isSearchPage = path.endsWith('/search') || path === '/search'
    setSearchOpen(isSearchPage)
    
    // 📜 Сброс скролла при смене страницы
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="flex flex-col min-h-screen bg-[#141415] text-white relative">
      {/* 🔝 Шапка */}
      <Header />

      {/* 📦 Контент без анимации (мгновенный переход) */}
      <main className="flex-grow w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* 🔻 Футер (если не поиск) */}
      {!searchOpen && <Footer />}
    </div>
  )
}

export default Layout