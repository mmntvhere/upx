import React from "react"
import { useTranslation } from "react-i18next"

/**
 * SiteSummaryCard - A premium summary component inspired by high-end dashboard aesthetics.
 * Features a split layout on desktop: rating scale on the left, textual verdict on the right.
 */
const SiteSummaryCard = ({ rating, title, description, favicon }) => {
  const { t } = useTranslation()

  // Assuming rating is 0-5. Convert to percentage for indicator position.
  const scorePercent = Math.min(Math.max((rating / 5) * 100, 0), 100)

  return (
    <div className="ui-site-summary-card group">
      
      {/* 🔴 Atmospheric Red Glow */}
      <div className="ui-site-glow-negative group-hover:opacity-40 transition-opacity duration-700" />
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#ee5253]/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Subtle top edge highlight */}
      <div className="ui-site-glow-top-line" />

      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 relative z-10">
        
        {/* 📊 LEFT PART: The Scale (Now order-1 on mobile) */}
        <div className="w-full lg:w-[40%] order-1 lg:order-1 mb-8 lg:mb-0">
           {/* Verdict Tag */}
           <div className="flex justify-between items-center mb-5 lg:mb-6">
            <span className="ui-site-verdict-tag">
              {t("siteVerdict.tag")}
            </span>
          </div>

          <div className="relative pt-4">
            {/* The Indicator (Triangle) */}
            <div 
              className="absolute -top-0.5 transition-all duration-1000 ease-out z-20"
              style={{ left: `calc(${scorePercent}% - 5px)` }}
            >
              <div 
                className="w-2.5 h-2 bg-white shadow-[0_2px_8px_rgba(255,255,255,0.8)]" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} 
              />
            </div>

            {/* The Continuous Bar */}
            <div className="ui-site-rating-bar-bg">
              <div 
                className="ui-site-rating-bar-fill"
                style={{ 
                  width: `${scorePercent}%`,
                  background: 'linear-gradient(90deg, #ff4d4d 0%, #ffd700 50%, #2ecc71 100%)',
                  backgroundSize: `calc(100% * 100 / ${scorePercent}) 100%`
                }}
              >
                {/* Visual depth overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-40" />
              </div>
            </div>

            {/* Scale Labels */}
            <div className="flex justify-between mt-3 px-1">
              <span className="text-[9px] font-black text-[#ff4d4d] uppercase tracking-widest opacity-80">{t("siteVerdict.poor")}</span>
              <span className="text-[9px] font-black text-[#ffd700] uppercase tracking-widest opacity-80">{t("siteVerdict.average")}</span>
              <span className="text-[9px] font-black text-[#2ecc71] uppercase tracking-widest opacity-80">{t("siteVerdict.excellent")}</span>
            </div>
          </div>
        </div>

        {/* 🖇 VERTICAL DIVIDER (Only on Desktop) */}
        <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent order-2" />

        {/* 📝 RIGHT PART: Verdict Text & Title (Now order-2 on mobile) */}
        <div className="flex-1 order-2 lg:order-3">
          <div className="flex items-center gap-4 mb-3 lg:mb-4">
            {favicon && (
              <div className="bg-white/5 p-1.5 rounded-xl border border-white/5 shadow-inner">
                <img 
                  src={`/storage/${favicon}`} 
                  alt="" 
                  className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}
            <h3 className="text-lg lg:text-2xl font-black text-white tracking-tighter leading-tight">
              {title || t("siteVerdict.title")}
            </h3>
          </div>
          <p className="text-white/50 text-sm lg:text-[15px] leading-relaxed font-medium max-w-2xl">
            {description || t("siteVerdict.description")}
          </p>
        </div>

      </div>
    </div>
  )
}

export default SiteSummaryCard
