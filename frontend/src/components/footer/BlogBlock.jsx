// src/components/footer/BlogBlock.jsx
import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const BlogBlock = () => {
  const blogTitle = useTranslateUniversal('footer.blogTitle', 'Founder’s blog')
  const blogDesc = useTranslateUniversal('footer.blogDesc', 'About business and more')

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between h-[164px] border border-white/5 transition-colors hover:border-white/10">
      <div>
        <h4 className="text-white font-bold mb-1">{blogTitle}</h4>
        <p className="text-gray-400 text-sm mb-4">{blogDesc}</p>
        <div className="flex space-x-3">
          <a 
            href="https://t.me/upx_ceo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-white hover:bg-[#D80032] hover:text-white transition-all duration-300 group shadow-lg shadow-black/20"
          >
            <FaTelegramPlane size={18} className="group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://x.com/upx_official" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-white hover:bg-[#D80032] hover:text-white transition-all duration-300 group shadow-lg shadow-black/20"
          >
            <FaXTwitter size={18} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogBlock