import React from "react"
import { motion } from "framer-motion"

const SortFilter = ({ currentSort, onChange }) => {
  const options = [
    { id: "new", label: "New", icon: "sparkles" },
    { id: "popular", label: "Popular", icon: "trending-up" },
    { id: "top", label: "Top", icon: "award" },
  ]

  return (
    <div className="inline-flex items-center p-1 bg-[#1a1a1a] rounded-full border border-white/5 relative overflow-hidden group">
      <div className="flex relative z-10 items-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`
              relative px-4 py-1.5 text-xs sm:text-sm transition-all duration-300 rounded-full flex items-center justify-center min-w-[70px] sm:min-w-[85px] font-medium
              ${currentSort === option.id ? "text-white" : "text-white/40 hover:text-white"}
            `}
          >
            {currentSort === option.id && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-[#2a2a2a]"
                transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                style={{ borderRadius: '9999px' }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SortFilter
