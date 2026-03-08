// src/components/footer/BlogBlock.jsx
import React from 'react'
import { useTranslateUniversal } from '@/hooks/useTranslateUniversal'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const BlogBlock = () => {
  const blogTitle = useTranslateUniversal('footer.blogTitle', 'Founder’s blog')
  const blogDesc = useTranslateUniversal('footer.blogDesc', 'About business and more')

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between h-[164px]">
      <div>
        <h4 className="text-white font-semibold mb-1">{blogTitle}</h4>
        <p className="text-gray-400 text-sm mb-2">{blogDesc}</p>
        <div className="flex space-x-2">
          <a href="#" className="bg-white bg-opacity-20 p-2 rounded-md text-white hover:bg-opacity-30 transition">
            <FaTelegramPlane size={16} />
          </a>
          <a href="#" className="bg-white bg-opacity-20 p-2 rounded-md text-white hover:bg-opacity-30 transition">
            <FaXTwitter size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogBlock