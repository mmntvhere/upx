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
  const contactUs = useTranslateUniversal('footer.contactUs', 'Contact us')
  const support = useTranslateUniversal('footer.support', 'Support')
  const contactSupport = useTranslateUniversal('footer.contactSupport', 'Contact support')
  const businessOffers = useTranslateUniversal('footer.businessOffers', 'Business offers')
  const affiliate = useTranslateUniversal('footer.affiliate', 'Affiliate program')
  const blogTitle = useTranslateUniversal('footer.blogTitle', 'Founder’s blog')
  const blogDesc = useTranslateUniversal('footer.blogDesc', 'About business and more')

  return (
    <footer className="bg-[#141415] text-gray-300 text-sm w-full relative z-10">
      <div className="pt-6 pb-6 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">

        {/* Верхняя полоса футера */}
        <div className="flex items-center justify-between relative z-0">
          <img src="/logo.svg" alt="Logo" className="h-6 z-0" />
          <div className="flex-grow border-t border-[#2e2e2e] mx-4 z-0" />
          <div className="flex items-center space-x-3 relative z-10">
            <LanguageSelect />
            <ScrollToTopButton />
          </div>
        </div>
{/* Мобильные выпадающие списки — только для мобильных */}
<div className="block md:hidden mt-8">
  <FooterDropdowns />
</div>

        {/* Контентная часть футера */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <SupportBlock support={support} contactUs={contactUs} contactSupport={contactSupport} />
          <ContactsBlock businessOffers={businessOffers} affiliate={affiliate} />
          <BlogBlock blogTitle={blogTitle} blogDesc={blogDesc} />
        </div>
        
        {/* Десктопная версия выпадающих списков */}
<div className="hidden md:block mt-10">
  <FooterDropdowns />
</div>


        {/* Разделитель */}
        <div className="w-full h-px bg-[#B3B6BD]/[.12] my-10 z-0"></div>

        {/* Соцсети и логотип */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center z-0">
          {/* <FooterSocials /> */}
          <RTALogo />
        </div>

        {/* Копирайт */}
        <FooterCopyright />
      </div>
    </footer>
  )
}

export default Footer