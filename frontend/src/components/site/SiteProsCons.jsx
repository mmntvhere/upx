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
const SiteProsCons = ({ site }) => {


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
    <div className="flex flex-col md:flex-row gap-6 text-white py-4">
      {/* 👍 Плюсы */}
      {pros.length > 0 && (
        <div className="filter-glow-area !justify-start bg-[#1f1f1f] rounded-xl p-5 flex gap-4 items-start flex-1">
          <div className="w-10 h-10 min-w-[40px] border-2 border-green-500 rounded-full flex items-center justify-center">
            <HiOutlinePlus className="text-green-500 text-xl" />
          </div>
          <p className="text-base leading-snug">{pros.join(", ")}</p>
        </div>
      )}

      {/* 👎 Минусы */}
      {cons.length > 0 && (
        <div className="filter-glow-area !justify-start bg-[#1f1f1f] rounded-xl p-5 flex gap-4 items-start flex-1">
          <div className="w-10 h-10 min-w-[40px] border-2 border-red-500 rounded-full flex items-center justify-center">
            <HiOutlineMinus className="text-red-500 text-xl" />
          </div>
          <p className="text-base leading-snug">{cons.join(", ")}</p>
        </div>
      )}
    </div>
  )
}

export default SiteProsCons