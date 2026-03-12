import React from 'react'
import LanguageSelect from './footer/LanguageSelect'
import ScrollToTopButton from './footer/ScrollToTopButton'
// import FooterSocials from './footer/FooterSocials'
import FooterCopyright from './footer/FooterCopyright'
import RTALogo from './footer/RTALogo'
import SupportBlock from './footer/SupportBlock'
import ContactsBlock from './footer/ContactsBlock'
import BlogBlock from './footer/BlogBlock'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'
import FooterDropdowns from './footer/FooterDropdowns'


const Footer = () => {
  return (
    <footer className="bg-[#141415] text-gray-300 text-sm w-full relative z-10 border-t border-white/5">
      <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">

        {/* 🔝 HEADER LINE */}
        <div className="flex items-center justify-between relative">
          <img src="/logo.svg" alt="UPX Catalog" className="h-6" />
          <div className="flex-grow border-t border-white/5 mx-6" />
          <div className="flex items-center space-x-4">
            <LanguageSelect />
            <ScrollToTopButton />
          </div>
        </div>

        {/* 📱 MOBILE DROPDOWNS */}
        <div className="md:hidden mt-8">
          <FooterDropdowns />
        </div>

        {/* 📦 CONTENT GRID (Support, Contacts, Blog) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <SupportBlock />
          <ContactsBlock />
          <BlogBlock />
        </div>
        
        {/* 💻 DESKTOP DROPDOWNS */}
        <div className="hidden md:block mt-2">
          <FooterDropdowns />
        </div>

        {/* ➖ DIVIDER */}
        <div className="w-full h-px bg-white/5 my-10"></div>

        {/* 🔗 BOTTOM ROW (Logo & Copyright) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <RTALogo />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  )
}

export default Footer