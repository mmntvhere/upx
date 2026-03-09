import React, { useEffect, useRef, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"

const MobileSearchModal = ({ isOpen = false, onClose = () => { }, children }) => {
  const [isVisible, setIsVisible] = useState(false)         // 💡 Видимость контента
  const modalRef = useRef(null)                             // 🔎 Ссылка на сам модальный блок

  // 🌐 Переводы (если понадобятся в UI, например, кнопки или заголовки)

  // Глобальная блокировка скролла
  useBodyScrollLock(isOpen)

  // 📦 Управляем видимостью
  useEffect(() => {
    if (isOpen) setIsVisible(true)
  }, [isOpen])

  // 🚪 Закрытие по кнопке
  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  // 🧱 Закрытие по клику вне окна
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && isVisible && (
        <motion.div
          key="modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black bg-opacity-60 sm:items-center sm:justify-center"
        >
          <motion.div
            key="modal-content"
            ref={modalRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-full sm:max-w-[620px] mt-[12px] rounded-t-3xl sm:rounded-2xl bg-white text-black max-h-[calc(100dvh-200px)] overflow-y-auto sm:overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🧩 Контент, переданный внутрь модального окна */}
            {children}

            {/* 👇 Пример UI текста — можно удалить, если не нужен */}
            {/* <button onClick={handleClose} className="text-center text-sm text-gray-600 py-4 w-full">
              {tClose}
            </button> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileSearchModal