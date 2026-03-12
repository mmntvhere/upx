import React from "react"
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi"


/**
 * Хелпер-функция:
 * Преобразует входное значение (строку или массив) в массив строк
 */
const normalizeToArray = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === "string") {
    return value
      .split(/[\r\n;,]+/) // 🎯 поддержка \r\n, \n, ; и запятых
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }
  return []
}

/**
 * Компонент: Компактный блок "Плюсы и Минусы"
 */
const SiteProsCons = ({ site, vertical = false }) => {
  // Получаем "плюсы" с учетом языка
  const rawPros = site.pros
  // Получаем "минусы" с учетом языка
  const rawCons = site.cons

  // Преобразуем в массив для безопасного отображения
  const pros = normalizeToArray(rawPros)
  const cons = normalizeToArray(rawCons)

  // Если нет ни плюсов, ни минусов — не отображаем блок вообще
  if (pros.length === 0 && cons.length === 0) return null

  return (
    <div className={`flex flex-col ${vertical ? '' : 'lg:flex-row'} gap-4 text-white h-full group/pc`}>
      {/* 👍 Плюсы */}
      {pros.length > 0 && (
        <div className="bg-[#141415] rounded-3xl p-5 lg:p-6 flex gap-4 items-center flex-1 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-white/10">
          {/* 🟢 Atmospheric Green Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(34,197,94,0.12)_0%,_transparent_75%)] pointer-events-none mix-blend-screen opacity-70" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="w-10 h-10 min-w-[40px] border-2 border-green-500/50 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.15)] relative z-10">
            <HiOutlinePlus className="text-green-500 text-xl" />
          </div>
          <div className="relative z-10">
            <p className="text-sm lg:text-base leading-relaxed font-medium">{pros.join(", ")}</p>
          </div>
        </div>
      )}

      {/* 👎 Минусы */}
      {cons.length > 0 && (
        <div className="bg-[#141415] rounded-3xl p-5 lg:p-6 flex gap-4 items-center flex-1 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-white/10">
          {/* 🔴 Atmospheric Red Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(239,68,68,0.12)_0%,_transparent_75%)] pointer-events-none mix-blend-screen opacity-70" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="w-10 h-10 min-w-[40px] border-2 border-red-500/50 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.15)] relative z-10">
            <HiOutlineMinus className="text-red-500 text-xl" />
          </div>
          <div className="relative z-10">
            <p className="text-sm lg:text-base leading-relaxed font-medium">{cons.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SiteProsCons