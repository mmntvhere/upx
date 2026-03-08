import React from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

const MobileSiteModalWrapper = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black bg-opacity-60 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-full mt-4 rounded-t-3xl bg-white text-black max-h-[calc(100dvh-32px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileSiteModalWrapper