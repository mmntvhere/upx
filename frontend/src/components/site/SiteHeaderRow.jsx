import React, { useRef, useEffect, useState } from "react"
import { Flag } from "lucide-react"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal"
import ReportModal from "./ReportModal"

const SiteHeaderRow = ({ site, onGoToHidden }) => {
  const goToRef = useRef(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  // Мультиязычные строки
  const tGoTo = useTranslateUniversal("common.goTo", "Go to")
  const tReview = useTranslateUniversal("common.review", "Review")
  const tAltIcon = useTranslateUniversal("common.faviconAlt", "Site favicon")

  useEffect(() => {
    if (!goToRef.current || typeof window === "undefined") return

    const isMobile = window.innerWidth < 1024
    if (!isMobile || !onGoToHidden) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        onGoToHidden(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(goToRef.current)

    return () => observer.disconnect()
  }, [onGoToHidden])

  const domain = site.link?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")

  return (
    <div className="w-full py-4 px-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
        {/* Левая часть */}
        <div className="flex flex-col gap-2 w-full">
          <h1 className="relative text-white text-2xl font-bold w-fit leading-snug after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-zinc-300 after:to-transparent">
            {site.name} <span className="text-zinc-400 font-normal">{tReview}</span>
          </h1>

          {domain && (
            <div className="flex items-center gap-2 mt-1">
              {site.favicon ? (
                <img
                  src={`/storage/${site.favicon}`}
                  alt={`${tAltIcon}: ${site.name}`}
                  className="w-5 h-5 rounded-sm"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                  ?
                </div>
              )}
              <span className="text-sm text-zinc-300">{domain}</span>
            </div>
          )}
        </div>

        {/* Правая часть */}
        <div
          className="flex items-center gap-[6px] justify-between w-full lg:w-auto"
          ref={goToRef}
        >
          <a
            href={site.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#D80032] text-white text-sm font-medium h-11 rounded-full hover:bg-[#b50029] transition flex-grow lg:flex-grow-0 lg:whitespace-nowrap px-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
            <span className="truncate">{tGoTo} {site.name}</span>
          </a>

          <button
            type="button"
            className="icon-glow-button flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
            title="Report site"
            onClick={() => setIsReportModalOpen(true)}
          >
            <Flag className="w-[18px] h-[18px] text-[#EDF2F4]" />
          </button>
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        site={site}
      />
    </div>
  )
}

export default SiteHeaderRow