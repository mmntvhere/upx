import { useState, useEffect } from "react"
import LocalLink from "./LocalLink"
import { Search } from "lucide-react"
import MobileMenu from "./MobileMenu"
import SearchOverlay from "./SearchOverlay"
import { useCategories } from "@/contexts/CategoryContext"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { categories } = useCategories()

  // Отслеживаем скролл для эффекта жидкого стекла
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    // Вызовем один раз при монтировании, чтобы проверить начальное состояние
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Закрываем меню при ресайзе в десктоп
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <header className={`sticky top-0 z-[60] w-full transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? "bg-[#0a0a0a]/85 backdrop-blur-2xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-[#141415] border-transparent"
      }`}>
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto h-[60px] md:h-[72px] flex items-center justify-between relative">
          
          {/* 🍔 Бургер меню (Мобилка) - Анимированный квадрат */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 p-2 -ml-2 text-white/80 hover:text-white transition bg-transparent border-none outline-none focus:outline-none hover:bg-transparent"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label="Toggle menu"
          >
            <div className="w-[22px] h-[16px] relative flex flex-col justify-between">
              <span className={`block w-full h-[2px] bg-current rounded-full transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
              <span className={`block w-full h-[2px] bg-current rounded-full transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-[2px] bg-current rounded-full transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </div>
          </button>

          {/* 🔗 Логотип */}
          <LocalLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src="/logo.svg" alt="Logo" className="h-6 md:h-8" />
          </LocalLink>

          {/* 🔍 Поиск (Мобилка) - вместо невидимого блока */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 -mr-2 text-white/80 hover:text-white transition bg-transparent border-none outline-none focus:outline-none hover:bg-transparent"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>

            {/* 🧭 Навигация (десктоп) */}
            <nav className="hidden md:flex space-x-2 bg-[#1f1f1f] rounded-xl p-1 shrink-0 ml-auto">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-sm px-4 py-2 rounded-[12px] text-gray-300 hover:bg-[#2a2a2a] transition flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Поиск
              </button>
              {["Головна", "Сторінка 1", "Сторінка 2"].map((label, idx) => (
                <button
                  key={idx}
                  className={`text-sm px-4 py-2 rounded-[12px] ${
                    idx === 0
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-[#2a2a2a] transition"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

        </div>
      </header>

      {/* 📱 Мобильное Меню */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onOpenSearch={() => {
          setIsMobileMenuOpen(false)
          setIsSearchOpen(true)
        }}
      />

      {/* 🔍 Окно поиска (Глобальное) */}
      {isSearchOpen && (
        <SearchOverlay 
          onClose={() => setIsSearchOpen(false)} 
          categories={categories} 
        />
      )}
    </>
  )
}

export default Header