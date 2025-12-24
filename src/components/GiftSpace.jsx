import { motion, AnimatePresence } from 'framer-motion'
import { memo, useState, useEffect } from 'react'
import FinalLetter from './FinalLetter'

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const enableBodyScroll = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

const GiftSpace = memo(function GiftSpace({ onClose }) {
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0)
  const [showFinalLetter, setShowFinalLetter] = useState(false)
  const [openedGifts, setOpenedGifts] = useState(() => {
    const saved = localStorage.getItem('openedGifts')
    return saved ? JSON.parse(saved) : []
  })
  const [isGiftOpening, setIsGiftOpening] = useState(false)

  const gifts = [
    {
      id: 1,
      icon: '❄️',
      title: 'Tuyết Trắng Tinh Khôi',
      type: 'snow',
      content: 'Những bông tuyết trắng tinh khôi đang rơi nhẹ nhàng, mang theo những điều tốt đẹp nhất cho bạn trong mùa Giáng Sinh này!',
      bgGradient: 'from-blue-400 via-cyan-500 to-blue-600',
    },
    {
      id: 2,
      icon: '🌟',
      title: 'Ngôi Sao May Mắn',
      type: 'stars',
      content: 'Ngôi sao sáng nhất trên bầu trời đêm đang chiếu rọi ánh sáng may mắn, hy vọng và thành công xuống bạn!',
      bgGradient: 'from-indigo-900 via-purple-900 to-pink-900',
    },
    {
      id: 3,
      icon: '🎄',
      title: 'Cây Thông Xanh Tươi',
      type: 'tree',
      content: 'Cây thông xanh tươi tượng trưng cho sự sống và hy vọng, luôn vững vàng qua mùa đông lạnh giá, mang đến sức mạnh và niềm tin!',
      bgGradient: 'from-green-600 via-emerald-600 to-green-800',
    },
    {
      id: 4,
      icon: '🕯️',
      title: 'Nến Thắp Sáng',
      type: 'candle',
      content: 'Ánh sáng của nến ấm áp, xua tan bóng tối và mang đến sự bình yên, ấm áp cho tâm hồn trong đêm Giáng Sinh!',
      bgGradient: 'from-yellow-600 via-orange-600 to-red-600',
    },
    {
      id: 5,
      icon: '🎵',
      title: 'Giai Điệu Giáng Sinh',
      type: 'music',
      content: 'Những giai điệu quen thuộc vang lên, đánh thức kỷ niệm đẹp và niềm vui trong tim, làm ấm lòng mọi người!',
      bgGradient: 'from-pink-500 via-purple-600 to-indigo-700',
    },
    {
      id: 6,
      icon: '🦌',
      title: 'Tuần Lộc Thần Kỳ',
      type: 'reindeer',
      content: 'Tuần lộc bay qua bầu trời, mang theo những điều ước, hy vọng và niềm vui cho năm mới sắp tới!',
      bgGradient: 'from-blue-800 via-indigo-900 to-purple-900',
    },
  ]

  useEffect(() => {
    disableBodyScroll()
    return () => {
      enableBodyScroll()
    }
  }, [])

  useEffect(() => {
    if (currentGiftIndex < gifts.length) {
      const timer = setTimeout(() => {
        setCurrentGiftIndex(prev => prev + 1)
      }, 5000)

      return () => clearTimeout(timer)
    } else if (currentGiftIndex === gifts.length) {
      const timer = setTimeout(() => {
        setShowFinalLetter(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentGiftIndex, gifts.length])

  const Sparkle = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        boxShadow: '0 0 10px rgba(255, 255, 0, 0.8)',
      }}
    />
  )

  const renderGiftContent = (gift) => {
    switch (gift.type) {
      case 'snow':
        return (
          <div className="relative w-full h-full overflow-hidden" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {Array.from({ length: 200 }, (_, i) => {
              const startX = Math.random() * 100
              const driftAmount = (Math.random() - 0.5) * 30
              const endX = startX + driftAmount
              return (
                <motion.div
                  key={i}
                  className="absolute text-2xl md:text-3xl"
                  initial={{ 
                    y: -100, 
                    x: startX + '%', 
                    opacity: 0 
                  }}
                  animate={{
                    y: window.innerHeight + 200,
                    opacity: [0, 0.8, 1, 0.8, 0],
                    x: [startX + '%', endX + '%'],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: 'linear',
                  }}
                  style={{
                    left: startX + '%',
                  }}
                >
                  ❄️
                </motion.div>
              )
            })}
            {Array.from({ length: 40 }, (_, i) => (
              <Sparkle key={`sparkle-${i}`} delay={i * 0.1} />
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-8 md:gap-12 z-[5] px-4" style={{ paddingBottom: '8vh' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-4xl md:text-6xl"
              >
                🏠
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-5xl md:text-7xl"
              >
                ⛄
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-4xl md:text-6xl"
              >
                🏠
              </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ maxHeight: '100vh', overflow: 'hidden', paddingTop: '8vh', paddingBottom: '20vh' }}>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                  filter: [
                    'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
                    'drop-shadow(0 0 40px rgba(135, 206, 250, 1))',
                    'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-6xl md:text-[120px] mb-4 relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 blur-xl"
                >
                  ❄️
                </motion.div>
                {gift.icon}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-white text-shadow-lg mb-3 text-center"
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(135, 206, 250, 0.6)',
                }}
              >
                {gift.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white text-center max-w-2xl leading-tight text-shadow-lg"
              >
                {gift.content}
              </motion.p>
            </div>
          </div>
        )

      case 'stars':
        return (
          <div className="relative w-full h-full overflow-hidden" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {Array.from({ length: 80 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl md:text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                ⭐
              </motion.div>
            ))}
            {Array.from({ length: 50 }, (_, i) => (
              <Sparkle key={`sparkle-${i}`} delay={i * 0.1} />
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-6 md:gap-10 z-[5] px-4 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl md:text-7xl relative"
              >
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl"
                >
                  🪟
                </motion.div>
                🏠
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-6xl md:text-8xl relative"
              >
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl"
                >
                  🪟
                </motion.div>
                🏠
              </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ maxHeight: '100vh', overflow: 'hidden', paddingTop: '10vh', paddingBottom: '25vh' }}>
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 360],
                  filter: [
                    'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                    'drop-shadow(0 0 60px rgba(255, 215, 0, 1))',
                    'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-6xl md:text-[120px] mb-4 relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 blur-2xl"
                >
                  🌟
                </motion.div>
                {gift.icon}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-white text-shadow-lg mb-3 text-center"
                style={{
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6)',
                }}
              >
                {gift.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white text-center max-w-2xl leading-tight text-shadow-lg"
              >
                {gift.content}
              </motion.p>
            </div>
          </div>
        )

      case 'tree':
        return (
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.div>
            ))}
            {Array.from({ length: 40 }, (_, i) => (
              <Sparkle key={`sparkle-${i}`} delay={i * 0.1} />
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-8 md:gap-12 z-[5] px-4" style={{ paddingBottom: '8vh' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-3xl md:text-5xl relative"
              >
                🎁
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-3xl md:text-5xl relative"
              >
                🎁
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-3xl md:text-5xl relative"
              >
                🎁
              </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ maxHeight: '100vh', overflow: 'hidden', paddingTop: '8vh', paddingBottom: '20vh' }}>
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                    'drop-shadow(0 0 60px rgba(255, 215, 0, 1))',
                    'drop-shadow(0 0 90px rgba(34, 197, 94, 0.8))',
                    'drop-shadow(0 0 60px rgba(255, 215, 0, 1))',
                    'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                  ],
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-7xl md:text-[180px] mb-4 relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 blur-2xl"
                >
                  🎄
                </motion.div>
                {gift.icon}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-4xl md:text-6xl mb-4"
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  🎅
                </motion.div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-white text-shadow-lg mb-3 text-center"
                style={{
                  textShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(255, 215, 0, 0.6)',
                }}
              >
                {gift.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white text-center max-w-2xl leading-tight text-shadow-lg"
              >
                {gift.content}
              </motion.p>
            </div>
          </div>
        )

      case 'candle':
        return (
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.div>
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-6 md:gap-10 z-[5] px-4" style={{ paddingBottom: '8vh' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-4xl md:text-6xl relative"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl"
                >
                  🪟
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl"
                >
                  🏠
                </motion.div>
                🏠
              </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ maxHeight: '100vh', overflow: 'hidden', paddingTop: '8vh', paddingBottom: '20vh' }}>
              <div className="flex gap-4 md:gap-6 mb-4">
                {Array.from({ length: 7 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="text-5xl md:text-7xl relative"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                      scale: [1, 1.2, 1],
                      y: [0, -15, 0],
                      filter: [
                        'drop-shadow(0 0 10px rgba(255, 165, 0, 0.8))',
                        'drop-shadow(0 0 20px rgba(255, 69, 0, 1))',
                        'drop-shadow(0 0 10px rgba(255, 165, 0, 0.8))',
                      ],
                    }}
                    transition={{
                      duration: 1.5 + i * 0.15,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 blur-lg"
                    >
                      {gift.icon}
                    </motion.div>
                    {gift.icon}
                  </motion.div>
                ))}
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-white text-shadow-lg mb-3 text-center"
                style={{
                  textShadow: '0 0 20px rgba(255, 165, 0, 0.8), 0 0 40px rgba(255, 69, 0, 0.6)',
                }}
              >
                {gift.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white text-center max-w-2xl leading-tight text-shadow-lg"
              >
                {gift.content}
              </motion.p>
            </div>
          </div>
        )

      case 'music':
        return (
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {Array.from({ length: 40 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                🎵
              </motion.div>
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-6 md:gap-10 z-[5] px-4" style={{ paddingBottom: '8vh' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-4xl md:text-6xl relative"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl"
                >
                  🪟
                </motion.div>
                🏠
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-5xl md:text-7xl"
              >
                ⛄
              </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ maxHeight: '100vh', overflow: 'hidden', paddingTop: '8vh', paddingBottom: '20vh' }}>
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                  filter: [
                    'drop-shadow(0 0 30px rgba(219, 39, 119, 0.8))',
                    'drop-shadow(0 0 60px rgba(147, 51, 234, 1))',
                    'drop-shadow(0 0 30px rgba(219, 39, 119, 0.8))',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="text-7xl md:text-[160px] mb-4 relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 blur-2xl"
                >
                  🎵
                </motion.div>
                {gift.icon}
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex gap-3 md:gap-4 mb-4"
              >
                {['♪', '♫', '♪', '♫', '♪'].map((note, i) => (
                  <motion.span
                    key={i}
                    className="text-4xl md:text-6xl text-white text-shadow-lg"
                    animate={{
                      y: [0, -50, 0],
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                    style={{
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {note}
                  </motion.span>
                ))}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-white text-shadow-lg mb-3 text-center"
                style={{
                  textShadow: '0 0 20px rgba(219, 39, 119, 0.8), 0 0 40px rgba(147, 51, 234, 0.6)',
                }}
              >
                {gift.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white text-center max-w-2xl leading-tight text-shadow-lg"
              >
                {gift.content}
              </motion.p>
            </div>
          </div>
        )

      case 'reindeer':
        return (
          <div className="relative w-full h-full overflow-hidden" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.div>
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-6 md:gap-10 z-[5] px-4" style={{ paddingBottom: '8vh' }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-4xl md:text-6xl relative"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl"
                >
                  🪟
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl"
                >
                  🏠
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-11 left-1/2 transform -translate-x-1/2 text-lg md:text-xl"
                >
                  🚪
                </motion.div>
                🏠
              </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ maxHeight: '100vh', overflow: 'hidden', paddingTop: '8vh', paddingBottom: '20vh' }}>
              <motion.div
                initial={{ x: '-150%' }}
                animate={{ x: ['-150%', '150%'] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-6xl md:text-[140px] mb-4"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    filter: [
                      'drop-shadow(0 0 30px rgba(59, 130, 246, 0.8))',
                      'drop-shadow(0 0 60px rgba(99, 102, 241, 1))',
                      'drop-shadow(0 0 30px rgba(59, 130, 246, 0.8))',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {gift.icon}
                </motion.div>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -40, 0],
                  filter: [
                    'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
                    'drop-shadow(0 0 40px rgba(59, 130, 246, 0.8))',
                    'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-5xl md:text-7xl mb-4"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 blur-xl"
                >
                  🎅
                </motion.div>
                🎅
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-white text-shadow-lg mb-3 text-center"
                style={{
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(99, 102, 241, 0.6)',
                }}
              >
                {gift.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white text-center max-w-2xl leading-tight text-shadow-lg"
              >
                {gift.content}
              </motion.p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const handleClose = () => {
    enableBodyScroll()
    onClose()
  }

  if (showFinalLetter) {
    return <FinalLetter onClose={handleClose} />
  }

  return (
    <div className="fixed inset-0 z-[105]" style={{ perspective: '2000px', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {gifts.map((gift, index) => (
          index === currentGiftIndex && (
            <motion.div
              key={gift.id}
              initial={{ 
                opacity: 0, 
                rotateY: 90,
                scale: 0.95,
                transformOrigin: 'right center',
                x: 100,
              }}
              animate={{ 
                opacity: 1, 
                rotateY: 0,
                scale: 1,
                transformOrigin: 'right center',
                x: 0,
              }}
              exit={{ 
                opacity: 0, 
                rotateY: -90,
                scale: 0.95,
                transformOrigin: 'left center',
                x: -100,
              }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`fixed inset-0 bg-gradient-to-br ${gift.bgGradient} flex items-center justify-center`}
              style={{ 
                height: '100vh', 
                width: '100vw', 
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              {renderGiftContent(gift)}
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  )
})

export default GiftSpace
