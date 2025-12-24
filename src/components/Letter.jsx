import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import LetterContent from './LetterContent'

function Letter({ isVisible, onClose }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 500)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
        onClick={!isOpen ? handleOpen : undefined}
      >
        {!isOpen ? (
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            <div className="text-6xl">✉️</div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-2 -right-2 text-2xl"
            >
              👆
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white text-sm mt-2 text-center font-semibold"
            >
              Nhấn để mở thư
            </motion.p>
          </motion.div>
        ) : (
          <LetterContent onClose={handleClose} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Letter

