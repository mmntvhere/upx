// src/components/MobileNav.jsx
import React from "react"
import { Menu, Home, Trophy, Gift, Circle } from "lucide-react"

const MobileNav = ({ active = "home" }) => {
  const items = [
    { label: "1", icon: <Menu size={24} />, key: "menu" },
    { label: "Главная", icon: <Home size={24} />, key: "home" },
    { label: "2", icon: <Trophy size={24} />, key: "casino" },
    { label: "3", icon: <Gift size={24} />, key: "bonus" },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141415] border-t border-zinc-800 h-[72px] flex justify-around items-center">
      {items.map((item) => (
        <button
          key={item.key}
          className={`flex flex-col items-center justify-center text-sm ${
            active === item.key ? "text-blue-500 font-semibold" : "text-zinc-300"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default MobileNav