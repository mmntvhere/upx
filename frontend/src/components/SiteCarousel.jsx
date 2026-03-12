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
const SiteCarousel = ({ categoryId, sites = [], externalRef, onSiteClick }) => {
  const currentLang = useLanguage()

  // 🔽 Сортировка по position_per_lang для текущего языка
  const sortedSites = React.useMemo(() => {
    if (!sites || sites.length === 0) return [];
    
    return [...sites].sort((a, b) => {
      const aPos = a.position_per_lang?.[currentLang] ?? a.position ?? 999
      const bPos = b.position_per_lang?.[currentLang] ?? b.position ?? 999
      return aPos - bPos
    });
  }, [sites, currentLang]);

  if (sortedSites.length === 0) return null;

  return (
    <div className="relative">
      <ul
        ref={externalRef}
        className="ui-slider-container !pl-4 sm:!pl-0 !pr-4 sm:!pr-0 scroll-pl-4 sm:scroll-pl-0"
        role="list"
        aria-label={`Carousel of sites for category ${categoryId}`}
      >
        {sortedSites.map((site) => (
          <li
            key={site.slug}
            className="ui-slider-item"
            role="listitem"
          >
            <SiteCard
              site={site}
              onClick={() => onSiteClick && onSiteClick(site)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SiteCarousel