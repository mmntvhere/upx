import React, { useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"

const MobileSearchModal = ({ isOpen = false, onClose = () => { }, children }) => {
  const modalRef = useRef(null)                             // 🔎 Ссылка на сам модальный блок

  // 🌐 Переводы (если понадобятся в UI, например, кнопки или заголовки)

  // Глобальная блокировка скролла
  useBodyScrollLock(isOpen)

  // 🧱 Закрытие по клику вне окна
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileSearchModal