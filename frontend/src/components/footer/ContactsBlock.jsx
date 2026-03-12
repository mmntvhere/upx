// src/components/footer/ContactsBlock.jsx
import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

const ContactsBlock = () => {
  const businessOffers = useTranslateUniversal('footer.businessOffers', 'Business offers')
  const affiliate = useTranslateUniversal('footer.affiliate', 'Affiliate program')

  return (
    <div className="flex flex-col justify-between h-[164px] gap-2">
      <a 
        href="mailto:business@upx.social" 
        className="bg-[#1a1a1a] p-6 rounded-xl h-[78px] border border-white/5 transition-all hover:bg-[#222] hover:border-white/10 group"
      >
        <h4 className="text-gray-400 text-xs mb-1 group-hover:text-gray-300 transition-colors uppercase tracking-wider">{businessOffers}</h4>
        <p className="text-white font-bold break-all text-sm">business@upx.social</p>
      </a>
      <a 
        href="mailto:partners@upx.run" 
        className="bg-[#1a1a1a] p-6 rounded-xl h-[78px] border border-white/5 transition-all hover:bg-[#222] hover:border-white/10 group"
      >
        <h4 className="text-gray-400 text-xs mb-1 group-hover:text-gray-300 transition-colors uppercase tracking-wider">{affiliate}</h4>
        <p className="text-white font-bold break-all text-sm">partners@upx.run</p>
      </a>
    </div>
  )
}

export default ContactsBlock