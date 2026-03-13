import React from "react"
import { useTranslation } from "react-i18next"
import LocalLink from "@/components/LocalLink"
import { useCategories } from "@/contexts/CategoryContext"

const FooterDropdowns = () => {
  const { categories } = useCategories()
  const { t } = useTranslation()

  const infoTitle = t("footer.info", "Information")
  const categoriesTitle = t("footer.categories", "Categories")

  // Ссылки раздела "Інформація"
  const infoLinks = [
    { text: t("footer.aboutMe", "About Us"), href: "/about" },
    { text: t("footer.faq", "FAQ"), href: "/faq" },
    { text: t("footer.privacy", "Privacy Policy"), href: "/privacy" },
    { text: t("footer.terms", "Terms of Service"), href: "/terms" },
  ]

  // Ссылки раздела "Категорії" (Динамические)
  // Т.к. API уже возвращает переведенное имя, используем cat.name напрямую
  const categoryLinks = categories.slice(0, 5).map(cat => ({
    text: cat.name,
    href: `/${cat.slug}`
  }))

  return (
    <>
      {/* 📱 Мобильная версия — выпадающие списки */}
      <div className="md:hidden mt-[25px] mb-[25px] space-y-4">
        <details className="w-full group">
          <summary className="cursor-pointer text-white font-semibold text-[16px] flex justify-between items-center list-none outline-none">
            {infoTitle}
            <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <ul className="mt-4 space-y-3 text-[#9aa1b1] text-[14px] border-l border-white/5 pl-4 ml-1">
            {infoLinks.map((link, idx) => (
              <li key={idx}>
                <LocalLink to={link.href} className="hover:text-white transition-colors">{link.text}</LocalLink>
              </li>
            ))}
          </ul>
        </details>

        <details className="w-full group">
          <summary className="cursor-pointer text-white font-semibold text-[16px] flex justify-between items-center list-none outline-none">
            {categoriesTitle}
            <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <ul className="mt-4 space-y-3 text-[#9aa1b1] text-[14px] border-l border-white/5 pl-4 ml-1 min-h-[140px]">
            {categoryLinks.length > 0 ? (
               categoryLinks.map((link, idx) => (
                <li key={idx}>
                  <LocalLink to={link.href} className="hover:text-white transition-colors">{link.text}</LocalLink>
                </li>
              ))
            ) : (
              // Skeleton items
              [1,2,3,4,5].map(i => <li key={i} className="h-4 bg-white/5 w-24 rounded animate-pulse" />)
            )}
          </ul>
        </details>
      </div>

      {/* 💻 Десктопная версия — 2 колонки */}
      <div className="hidden md:grid grid-cols-2 gap-20 mt-[40px] mb-[25px]">
        <div>
          <h4 className="text-white font-semibold text-[16px] mb-6">{infoTitle}</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-[#9aa1b1] text-[14px]">
            {infoLinks.map((link, idx) => (
              <li key={idx}>
                <LocalLink to={link.href} className="hover:text-white transition-colors">{link.text}</LocalLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[16px] mb-6">{categoriesTitle}</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-[#9aa1b1] text-[14px] min-h-[100px]">
            {categoryLinks.length > 0 ? (
              categoryLinks.map((link, idx) => (
                <li key={idx}>
                  <LocalLink to={link.href} className="hover:text-white transition-colors">{link.text}</LocalLink>
                </li>
              ))
            ) : (
              // Skeleton items
              [1,2,3,4,5,6].map(i => <li key={i} className="h-4 bg-white/5 w-24 rounded animate-pulse" />)
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default FooterDropdowns