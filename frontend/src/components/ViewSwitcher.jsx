import React from "react"
import { Grid, List } from "react-bootstrap-icons"
import { useTranslateUniversal } from "@/hooks/useTranslateUniversal" // 💬 Мультиязычный хук

const ViewSwitcher = ({ viewType, onChange }) => {
  let t = (key) => key // fallback, если хук не работает

  try {
    const translate = useTranslateUniversal()
    if (typeof translate === "function") t = translate
  } catch (e) {
    console.error("Translation hook error:", e)
  }

  const isActive = (type) => viewType === type

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange("grid")}
        className={`p-2 rounded-full ${
          isActive("grid") ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"
        } text-white transition-colors`}
        aria-label={t("viewSwitcher.grid")}
        title={t("viewSwitcher.grid")}
      >
        <Grid size={18} />
      </button>

      <button
        onClick={() => onChange("list")}
        className={`p-2 rounded-full ${
          isActive("list") ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"
        } text-white transition-colors`}
        aria-label={t("viewSwitcher.list")}
        title={t("viewSwitcher.list")}
      >
        <List size={18} />
      </button>
    </div>
  )
}

export default ViewSwitcher