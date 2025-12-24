import { motion, AnimatePresence } from 'framer-motion'
import { memo, useEffect, useState } from 'react'
import GiftSpace from './GiftSpace'

const ChristmasPortal = memo(function ChristmasPortal({ isOpen, onClose }) {
  const [showGiftBox, setShowGiftBox] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setShowGiftBox(false)
      setShowGifts(false)
      setIsOpening(false)
      return
    }

    setShowGiftBox(true)
  }, [isOpen])

  const handleOpenGift = () => {
    setIsOpening(true)
    setTimeout(() => {
      setShowGiftBox(false)
      setShowGifts(true)
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showGifts && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-[100]"
              style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
            />
          )}

          {showGiftBox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-[100] flex flex-col items-center justify-center"
              style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: isOpening ? [1, 1.5, 0] : [0, 1.2, 1], 
                  rotate: isOpening ? [0, 720] : [-180, 0],
                  y: isOpening ? [0, -100] : 0,
                }}
                transition={{ duration: isOpening ? 0.8 : 1, ease: 'easeOut' }}
                className="relative cursor-pointer"
                onClick={!isOpening ? handleOpenGift : undefined}
                whileHover={!isOpening ? { scale: 1.15 } : {}}
                whileTap={!isOpening ? { scale: 0.95 } : {}}
              >
                <motion.div
                  animate={{
                    scale: isOpening ? [1, 1.3, 0] : [1, 1.1, 1],
                    rotate: isOpening ? [0, 180, 360] : [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: isOpening ? 0.8 : 1.5,
                    repeat: isOpening ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-9xl md:text-[300px] relative"
                  style={{
                    filter: 'drop-shadow(0 0 50px rgba(255, 215, 0, 0.8))',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, y: 0 }}
                    animate={{ 
                      scale: isOpening ? [1, 1.5, 0] : [0, 1.3, 1],
                      y: isOpening ? [0, -150, 0] : [0, -100, 0],
                      rotate: isOpening ? [0, 720] : [0, 360],
                    }}
                    transition={{ 
                      duration: isOpening ? 0.8 : 1.5,
                      delay: isOpening ? 0 : 0.5,
                      ease: 'easeOut'
                    }}
                    className="absolute inset-0 blur-2xl"
                    style={{
                      filter: 'drop-shadow(0 0 80px rgba(255, 215, 0, 1))',
                    }}
                  >
                    🎁
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: isOpening ? [1, 1.3, 0] : [1, 1.2, 1],
                      opacity: isOpening ? [1, 0.5, 0] : [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: isOpening ? 0.8 : 1,
                      repeat: isOpening ? 0 : Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    🎁
                  </motion.div>
                </motion.div>
                {!isOpening && Array.from({ length: 30 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 200}%`,
                      top: `${50 + (Math.random() - 0.5) * 200}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.8 + i * 0.05,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
                {isOpening && Array.from({ length: 50 }, (_, i) => (
                  <motion.div
                    key={`confetti-${i}`}
                    className="absolute text-4xl"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ 
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0,
                      rotate: 0
                    }}
                    animate={{
                      opacity: [1, 1, 0],
                      scale: [1, 1.2, 0.8],
                      x: (Math.random() - 0.5) * 500,
                      y: (Math.random() - 0.5) * 500 - 100,
                      rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.02,
                      ease: 'easeOut',
                    }}
                  >
                    {['🎉', '✨', '🎊', '⭐', '🌟', '💫'][Math.floor(Math.random() * 6)]}
                  </motion.div>
                ))}
              </motion.div>
              {!isOpening && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-8 text-center"
                >
                  <motion.p
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-2xl md:text-3xl text-white font-bold mb-4"
                    style={{
                      textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
                    }}
                  >
                    🎁 Click để mở quà! 🎁
                  </motion.p>
                  <motion.p
                    className="text-lg md:text-xl text-yellow-300"
                    style={{
                      textShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
                    }}
                  >
                    Ông già Noel đã để lại quà cho bạn
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}

          {showGifts && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[105]"
              style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
            >
              <GiftSpace onClose={onClose} />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
})

export default ChristmasPortal
