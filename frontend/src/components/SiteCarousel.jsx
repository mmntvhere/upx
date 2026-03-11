import React from "react"
import SiteCard from "./SiteCard"
import { useLanguage } from "@/hooks/useLanguage"
import { motion, LayoutGroup } from "framer-motion"
/**
 * Компонент отображает горизонтальную карусель с сайтами.
 * Он умеет: 
 * – отслеживать ширину экрана,
 * – прокручивать сайты,
 * – обрабатывать клик по карточке сайта (если передан обработчик onSiteClick).
 */
const SiteCarousel = ({ categoryId, sites = [], sliders, onSiteClick }) => {
  const currentLang = useLanguage()

  // 🧼 Фильтрация по языку
  const filteredSites = sites.filter(site => {
    const langs = site.enabled_languages
    return !langs || langs.length === 0 || langs.includes(currentLang)
  })

  // 🔽 Сортировка по position_per_lang
  const sortedSites = [...filteredSites].sort((a, b) => {
    const aPos = a.position_per_lang?.[currentLang] ?? 9999
    const bPos = b.position_per_lang?.[currentLang] ?? 9999
    return aPos - bPos
  })

  return (
    <div
      className="overflow-x-auto hide-scrollbar"
      ref={(el) => {
        if (sliders && sliders.current && categoryId) {
          sliders.current[categoryId] = el
        }
      }}
    >
      {/* <h3 className="text-white text-lg font-semibold mb-3">
        {translatedCategoryName}
      </h3> */}

      <LayoutGroup id={`category-${categoryId}`}>
        <motion.div 
          layout
          className="flex gap-4 items-start pl-4 sm:pl-0 pr-0"
        >
          {sortedSites.map((site) => (
            <SiteCard
              key={site.slug}
              site={site}
              onClick={() => onSiteClick && onSiteClick(site)}
            />
          ))}
        </motion.div>
      </LayoutGroup>
    </div>
  )
}

export default SiteCarousel