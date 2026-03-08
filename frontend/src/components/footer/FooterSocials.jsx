import React from 'react'
import { FaTelegramPlane, FaYoutube } from 'react-icons/fa' // FaTelegramPlane и FaYoutube — из 'fa'
import { FaXTwitter } from 'react-icons/fa6' // FaXTwitter — только из 'fa6'

const FooterSocials = () => {
  return (
    <div className="flex space-x-3 mb-3 md:mb-0">
      <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
        <FaTelegramPlane size={20} className="hover:text-white transition" />
      </a>
      <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
        <FaXTwitter size={20} className="hover:text-white transition" />
      </a>
      <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <FaYoutube size={20} className="hover:text-white transition" />
      </a>
    </div>
  )
}

export default FooterSocials