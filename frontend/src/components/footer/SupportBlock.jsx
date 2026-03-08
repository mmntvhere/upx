// src/components/footer/SupportBlock.jsx
import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

const SupportBlock = () => {
  const support = useTranslateUniversal('footer.support', 'Support')
  const contactUs = useTranslateUniversal('footer.contactUs', 'Contact us')
  const contactSupport = useTranslateUniversal('footer.contactSupport', 'Contact support')

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between h-[164px]">
      <div>
        <h4 className="text-white font-bold mb-1 flex items-center">
          {support}
          <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full ml-2">24/7</span>
        </h4>
        <p className="text-sm text-gray-400 mb-4">{contactUs}</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg text-sm">
        {contactSupport}
      </button>
    </div>
  )
}

export default SupportBlock