import React from "react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"

const FooterDropdowns = () => {
  const infoTitle = useTranslateUniversal("footer.info", "Інформація")
  const categoriesTitle = useTranslateUniversal("footer.categories", "Категорії")

  // Ссылки раздела "Інформація"
  const infoLinks = [
    { text: useTranslateUniversal("footer.aboutMe", "Про мене"), href: "#" },
    { text: useTranslateUniversal("footer.disclaimer", "Disclaimer"), href: "#" },
    { text: useTranslateUniversal("footer.copyright", "Copyright policy"), href: "#" },
    { text: useTranslateUniversal("footer.privacy", "Політика конфіденційності"), href: "#" },
  ]

  // Ссылки раздела "Категорії"
  const categoryLinks = [
    { text: useTranslateUniversal("footer.live", "Live"), href: "#" },
    { text: useTranslateUniversal("footer.liveCasino", "Live-казино"), href: "#" },
    { text: useTranslateUniversal("footer.prematch", "Pre-match"), href: "#" },
    { text: useTranslateUniversal("footer.poker", "Покер"), href: "#" },
    { text: useTranslateUniversal("footer.esports", "eSports"), href: "#" },
    { text: useTranslateUniversal("footer.casino", "Казино"), href: "#" },
    { text: useTranslateUniversal("footer.bonuses", "Бонуси"), href: "#" },
  ]

  return (
    <>
      {/* 📱 Мобильная версия — выпадающие списки */}
      <div className="md:hidden mt-[25px] mb-[25px] space-y-4">
        {[{ title: infoTitle, links: infoLinks }, { title: categoriesTitle, links: categoryLinks }].map((block, i) => (
          <details className="w-full" key={i}>
            <summary className="cursor-pointer text-white font-semibold text-[16px] flex justify-between items-center">
              {block.title}
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <ul className="mt-2 space-y-2 text-[#9aa1b1] text-[14px]">
              {block.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:underline">{link.text}</a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      {/* 💻 Десктопная версия — 2 колонки */}
      <div className="hidden md:grid grid-cols-2 gap-20 mt-[40px] mb-[25px]">
        <div>
          <h4 className="text-white font-semibold text-[16px] mb-4">{infoTitle}</h4>
          <ul className="space-y-2 text-[#9aa1b1] text-[14px]">
            {infoLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:underline">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[16px] mb-4">{categoriesTitle}</h4>
          <ul className="space-y-2 text-[#9aa1b1] text-[14px]">
            {categoryLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:underline">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default FooterDropdowns