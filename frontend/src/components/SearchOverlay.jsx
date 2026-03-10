import React, { useEffect, useRef, useState, useMemo } from "react"
import { createPortal } from "react-dom"
import useLocalNavigate from "@/hooks/useLocalNavigate"
import MobileSearchModal from "./Search/MobileSearchModal"
import SearchHeader from "./Search/SearchHeader"
import SearchInputBlock from "./Search/SearchInputBlock"
import SearchNoResults from "./Search/SearchNoResults"
import SearchResultsByCategory from "./Search/SearchResultsByCategory"
import { useLanguage } from "@/hooks/useLanguage" // ✅

const topSearches = [
  "Ai", "Cams", "Deepfake", "Premium",
  "Hentai", "Teen", "Asian", "Trans",
  "Indian", "VR"
]

const getRandomSites = (categories, count, currentLang) => {
  const allSites = categories.flatMap(c =>
    (c.sites || []).filter(site =>
      !site.enabled_languages || site.enabled_languages.length === 0 || site.enabled_languages.includes(currentLang)
    )
  )
  const shuffled = [...allSites].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const SearchOverlay = ({ onClose, categories = [] }) => {
  const currentLang = useLanguage() // ✅
  const [inputValue, setInputValue] = useState("")
  const [showModal, setShowModal] = useState(true)

  const suggestedSites = useMemo(() => getRandomSites(categories, 10, currentLang), [categories, currentLang])

  const navigate = useLocalNavigate()
  const scrollRefs = useRef({})

  const scroll = (categoryId, direction) => {
    const container = scrollRefs.current[categoryId]
    if (!container) return
    const scrollStep = container.offsetWidth * 0.5
    container.scrollBy({
      left: direction === "left" ? -scrollStep : scrollStep,
      behavior: "smooth"
    })
  }

  const handleSeeAll = (category) => {
    if (category.slug) {
      handleClose()
      setTimeout(() => navigate(`/${category.slug}`), 100)
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setTimeout(onClose, 300)
  }

  const filteredCategories = categories
    .map(category => {
      const filteredSites = (category.sites || []).filter(site => {
        const match = site.name.toLowerCase().includes(inputValue.toLowerCase())
        const allowedLangs = site.enabled_languages
        const langOk = !allowedLangs || allowedLangs.length === 0 || allowedLangs.includes(currentLang)
        return match && langOk
      })

      return { ...category, sites: filteredSites }
    })
    .filter(category => category.sites.length > 0)

  const nothingFound = inputValue && filteredCategories.length === 0

  return createPortal(
    <MobileSearchModal isOpen={showModal} onClose={handleClose}>
      <SearchHeader onClose={handleClose} />

      <SearchInputBlock
        inputValue={inputValue}
        setInputValue={setInputValue}
        topSearches={topSearches}
      />

      {/* ❌ Нет совпадений */}
      {nothingFound && (
        <SearchNoResults
          setInputValue={setInputValue}
          suggestedSites={suggestedSites}
          onClose={handleClose}
        />
      )}

      {/* 🎯 Совпадения по категориям */}
      {!nothingFound && (
        <SearchResultsByCategory
          filteredCategories={filteredCategories}
          scrollRefs={scrollRefs}
          navigate={navigate}
          onClose={handleClose}
          scroll={scroll}
          handleSeeAll={handleSeeAll}
        />
      )}
    </MobileSearchModal>,
    document.body
  )
}

export default SearchOverlay