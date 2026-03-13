import { useState, useEffect } from "react"
import LocalLink from "./LocalLink"
import { Search, Mail, Twitter, ShoppingBag, ChevronDown } from "lucide-react"
import MobileMenu from "./MobileMenu"
import SearchOverlay from "./SearchOverlay"
import { useCategories } from "@/contexts/CategoryContext"
import { useTranslation } from "react-i18next"
import LanguageDropdown from "./footer/LanguageDropdown"
import LangFlags from "./LangFlags"
import { useLanguage } from "@/hooks/useLanguage"
import { LANGUAGES } from "@/i18n/languageConfig"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  
  const { categories } = useCategories()
  const { t } = useTranslation()
  const currentLang = useLanguage()
  const currentLangData = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0]

  // Отслеживаем скролл для эффекта жидкого стекла
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
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
      <header 
        role="banner"
        className={`ui-header ${isMobileMenuOpen ? 'ui-header-fixed' : 'ui-header-mobile-fixed'} ${
          (isScrolled || isMobileMenuOpen) ? "ui-header-glass" : ""
        }`}
      >
        <div className="ui-header-inner">
          
          {/* 🍔 Бургер меню (Мобилка) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ui-header-burger"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label={t('header.toggleMenu', 'Toggle menu')}
          >
            <div className="w-[22px] h-[16px] relative flex flex-col justify-between">
              <span className={`block w-full h-[2px] bg-current rounded-full transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
              <span className={`block w-full h-[2px] bg-current rounded-full transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-[2px] bg-current rounded-full transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </div>
          </button>

          {/* 🔗 Логотип */}
          <LocalLink 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="ui-header-logo-link"
            aria-label={t('header.homeLink', 'Go to home page')}
          >
            <img src="/logo.svg" alt="BeInPorn Logo" className="h-6 md:h-8" />
          </LocalLink>

          {/* 🔍 Поиск (Мобилка) */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 -mr-2 text-white/80 hover:text-white transition bg-transparent border-none outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label={t('header.search', 'Search')}
          >
            <Search className="w-6 h-6" />
          </button>

          {/* 🧭 Навигация (десктоп) */}
          <nav className="hidden md:flex items-center gap-3 ml-auto" aria-label={t('header.desktopNav', 'Desktop navigation')}>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="ui-header-btn group hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              title={t('header.search', 'Search')}
              aria-label={t('header.search', 'Search')}
            >
              <Search className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </button>
            
            <button 
              className="ui-header-btn group hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]" 
              title={t('header.messages', 'Messages')} 
              aria-label={t('header.messages', 'Messages')}
            >
              <Mail className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
            </button>

            <button 
              className="ui-header-btn group hover:shadow-[0_0_20px_rgba(29,155,240,0.15)] hover:border-[#1d9bf0]/30" 
              title={t('header.twitter', 'Twitter')} 
              aria-label={t('header.twitter', 'Twitter')}
            >
              <Twitter className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-[#1d9bf0]" />
            </button>

            <button 
              className="ui-header-btn group hover:shadow-[0_0_20px_rgba(216,0,50,0.1)] hover:border-[#D80032]/30" 
              title={t('header.shop', 'Shop')} 
              aria-label={t('header.shop', 'Shop')}
            >
              <ShoppingBag className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#D80032] rounded-full border border-[#141415] shadow-[0_0_8px_rgba(216,0,50,0.4)] animate-ui-pulse"></span>
            </button>

            {/* Язык в Хедере */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`ui-header-lang-btn group ${isLangOpen ? 'ui-header-lang-btn-active' : ''}`}
                title={t('header.language', 'Language')}
                aria-label={t('header.language', 'Language')}
              >
                {/* Флаг в кружочке */}
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[15px] shrink-0 overflow-hidden transition-transform group-hover:scale-110">
                  <LangFlags langs={[currentLang]} />
                </div>
                
                {/* Название языка */}
                <span className="text-[13px] font-medium tracking-wide">
                  {currentLangData.name}
                </span>

                {/* Стрелочка */}
                <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <LanguageDropdown 
                isOpen={isLangOpen} 
                onClose={() => setIsLangOpen(false)} 
              />
            </div>
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