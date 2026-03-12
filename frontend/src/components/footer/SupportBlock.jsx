// src/components/footer/SupportBlock.jsx
import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

const SupportBlock = () => {
  const support = useTranslateUniversal('footer.support', 'Support')
  const contactUs = useTranslateUniversal('footer.contactUs', 'Contact us')
  const contactSupport = useTranslateUniversal('footer.contactSupport', 'Contact support')

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between h-[164px] border border-white/5 transition-colors hover:border-white/10">
      <div>
        <h4 className="text-white font-bold mb-1 flex items-center">
          {support}
          <span className="bg-[#D80032] text-[10px] px-2 py-0.5 rounded-full ml-2 font-black uppercase tracking-wider shadow-lg shadow-red-600/20">24/7</span>
        </h4>
        <p className="text-sm text-gray-400 mb-4">{contactUs}</p>
      </div>
      <a 
        href="mailto:support@upx.social" 
        className="bg-[#D80032] hover:bg-[#b00029] text-white font-bold w-full py-2.5 rounded-xl text-xs uppercase tracking-widest text-center transition-all shadow-lg shadow-red-600/10"
      >
        {contactSupport}
      </a>
    </div>
  )
}

export default SupportBlock