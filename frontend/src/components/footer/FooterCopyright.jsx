import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

const FooterCopyright = () => {
  const rights = useTranslateUniversal('footer.rights', 'All rights reserved')
  const year = new Date().getFullYear()

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 text-gray-500 text-xs font-medium">
      <p>&copy; {year} UPX Catalog. {rights}</p>
      <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
      <span className="text-[14px] font-black border border-gray-600 px-2 py-0.5 rounded text-gray-400">18+</span>
    </div>
  )
}

export default FooterCopyright