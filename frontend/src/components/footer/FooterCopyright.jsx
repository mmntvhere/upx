import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'

const FooterCopyright = () => {
  const rights = useTranslateUniversal('footer.rights', 'All rights reserved')

  return (
    <div className="w-full mt-6 flex justify-between items-center">
      <p className="text-gray-500 text-xs">&copy; 2025 UPX Catalog. {rights}</p>
      <span className="text-gray-500 text-[20px]">18+</span>
    </div>
  )
}

export default FooterCopyright