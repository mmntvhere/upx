// src/components/footer/ContactsBlock.jsx
import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

const ContactsBlock = () => {
  const businessOffers = useTranslateUniversal('footer.businessOffers', 'Business offers')
  const affiliate = useTranslateUniversal('footer.affiliate', 'Affiliate program')

  return (
    <div className="flex flex-col justify-between h-[164px]">
      <div className="bg-[#1a1a1a] p-6 rounded-xl h-[76px]">
        <h4 className="text-gray-400 text-sm mb-1">{businessOffers}</h4>
        <p className="text-white font-medium break-all">business@upx.social</p>
      </div>
      <div className="bg-[#1a1a1a] p-6 rounded-xl h-[76px]">
        <h4 className="text-gray-400 text-sm mb-1">{affiliate}</h4>
        <p className="text-white font-medium break-all">partners@upx.run</p>
      </div>
    </div>
  )
}

export default ContactsBlock