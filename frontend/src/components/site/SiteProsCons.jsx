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
        <div className="ui-site-pros-container">
          <div className="ui-site-glow-positive" />
          <div className="ui-site-glow-top-line" />
          
          <div className="ui-site-icon-circle-pros">
            <HiOutlinePlus className="text-green-500 text-xl" />
          </div>
          <div className="relative z-10">
            <ul className="inline">
              {pros.map((item, index) => (
                <li key={index} className="inline text-sm lg:text-base leading-relaxed font-medium text-zinc-100">
                  {item}{index < pros.length - 1 ? ', ' : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 👎 Минусы */}
      {cons.length > 0 && (
        <div className="ui-site-pros-container">
          <div className="ui-site-glow-negative" />
          <div className="ui-site-glow-top-line" />

          <div className="ui-site-icon-circle-cons">
            <HiOutlineMinus className="text-red-500 text-xl" />
          </div>
          <div className="relative z-10">
            <ul className="inline">
              {cons.map((item, index) => (
                <li key={index} className="inline text-sm lg:text-base leading-relaxed font-medium text-zinc-100">
                  {item}{index < cons.length - 1 ? ', ' : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default SiteProsCons