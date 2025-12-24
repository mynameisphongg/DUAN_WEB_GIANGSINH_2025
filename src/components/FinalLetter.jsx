import { motion } from 'framer-motion'
import { memo, useState, useEffect } from 'react'

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const enableBodyScroll = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

const FinalLetter = memo(function FinalLetter({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLinePage1, setCurrentLinePage1] = useState(0)
  const [currentLinePage2, setCurrentLinePage2] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const letterContentPage1 = [
    'Gửi bạn thân yêu,',
    '',
    'Trong đêm Giáng Sinh thiêng liêng này,',
    'khi những bông tuyết trắng rơi nhẹ nhàng',
    'và những ngôi sao lấp lánh trên bầu trời,',
    'tôi muốn gửi đến bạn những lời chúc tốt đẹp nhất.',
    '',
    '✨ Chúc bạn và gia đình một Giáng Sinh',
    '   ấm áp, hạnh phúc và tràn đầy yêu thương!',
    '',
    '✨ Mong rằng năm mới sẽ mang đến cho bạn',
    '   sức khỏe dồi dào, thành công rực rỡ',
    '   và những cơ hội tuyệt vời!',
    '',
    '✨ Hãy để tình yêu thương lan tỏa',
    '   và làm ấm lòng mọi người xung quanh bạn!',
  ]

  const letterContentPage2 = [
    '✨ Chúc bạn có những khoảnh khắc đáng nhớ',
    '   bên gia đình và bạn bè thân yêu!',
    '',
    '✨ Hãy luôn giữ cho trái tim mình',
    '   ấm áp, trong sáng và tràn đầy niềm vui!',
    '',
    'Trong mùa lễ hội đặc biệt này,',
    'hãy để những điều tốt đẹp nhất',
    'đến với bạn và những người bạn yêu thương.',
    '',
    '🎄 Chúc bạn một Giáng Sinh tuyệt vời! 🎅',
    '🌟 Và một năm mới đầy may mắn! ✨',
    '',
    'Với tất cả tình yêu thương,',
    '🎁 Ông Già Noel 🎁',
  ]

  useEffect(() => {
    disableBodyScroll()
    return () => {
      enableBodyScroll()
    }
  }, [])

  useEffect(() => {
    if (showCelebration) {
      const autoCloseTimer = setTimeout(() => {
        setShowCelebration(false)
        setTimeout(() => {
          enableBodyScroll()
          onClose()
        }, 1000)
      }, 10000)
      return () => clearTimeout(autoCloseTimer)
    }
  }, [showCelebration, onClose])

  useEffect(() => {
    if (currentPage === 1) {
      if (currentLinePage1 < letterContentPage1.length) {
        const timer = setTimeout(() => {
          setCurrentLinePage1(prev => prev + 1)
        }, 300)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setCurrentPage(2)
          setCurrentLinePage2(0)
        }, 1000)
        return () => clearTimeout(timer)
      }
    } else if (currentPage === 2) {
      if (currentLinePage2 < letterContentPage2.length) {
        const timer = setTimeout(() => {
          setCurrentLinePage2(prev => prev + 1)
        }, 300)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setShowCelebration(true)
        }, 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [currentPage, currentLinePage1, currentLinePage2, letterContentPage1.length, letterContentPage2.length])

  const handleClose = () => {
    enableBodyScroll()
    onClose()
  }

  const renderLetterContent = (content, currentLine) => {
    return content.slice(0, currentLine + 1).map((line, index) => (
      <motion.p
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: index * 0.03,
        }}
        className={`${
          line === '' 
            ? 'h-1' 
            : line.startsWith('✨') || line.startsWith('🎄') || line.startsWith('🌟') || line.startsWith('🎁')
            ? 'text-xs md:text-sm text-red-700 font-semibold leading-tight'
            : line.startsWith('Gửi') || line.startsWith('Với')
            ? 'text-xs md:text-sm text-red-800 font-bold italic'
            : 'text-xs md:text-sm text-gray-800 leading-tight'
        }`}
      >
        {line}
      </motion.p>
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed inset-0 bg-gradient-to-br from-amber-50 via-red-50 to-pink-50 z-[105] flex items-center justify-center p-3 md:p-6 overflow-hidden"
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <div className="relative w-full max-w-6xl h-[85vh] max-h-[650px] flex gap-3 md:gap-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-1/2 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-2xl border-4 border-red-300 p-3 md:p-5 h-full flex flex-col overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-3 right-3 text-3xl md:text-4xl opacity-20"
          >
            ✉️
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-2 relative z-10"
          >
            <div className="text-3xl md:text-5xl mb-1">🎅</div>
            <h2 className="text-lg md:text-2xl font-bold text-red-800 mb-1">
              Bức Thư Giáng Sinh
            </h2>
            <div className="w-12 h-0.5 bg-red-500 mx-auto rounded"></div>
            <p className="text-xs text-red-600 mt-0.5">Trang 1/2</p>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center space-y-0.5 md:space-y-1 relative z-10 overflow-hidden">
            {renderLetterContent(letterContentPage1, currentLinePage1)}
          </div>

          {currentLinePage1 >= letterContentPage1.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center gap-1.5 md:gap-2 mt-2 relative z-10"
            >
              {['🎄', '🎅', '❄️', '🌟', '🎁', '🦌'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                  className="text-xl md:text-2xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ 
            opacity: currentPage >= 2 ? 1 : 0,
            x: currentPage >= 2 ? 0 : 50,
            scale: currentPage >= 2 ? 1 : 0.9
          }}
          transition={{ duration: 0.6, delay: currentPage >= 2 ? 0.3 : 0 }}
          className="relative w-1/2 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-2xl border-4 border-red-300 p-3 md:p-5 h-full flex flex-col overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-3 right-3 text-3xl md:text-4xl opacity-20"
          >
            ✉️
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: currentPage >= 2 ? 1 : 0, y: currentPage >= 2 ? 0 : -20 }}
            transition={{ duration: 0.6, delay: currentPage >= 2 ? 0.5 : 0 }}
            className="text-center mb-2 relative z-10"
          >
            <div className="text-3xl md:text-5xl mb-1">🎅</div>
            <h2 className="text-lg md:text-2xl font-bold text-red-800 mb-1">
              Bức Thư Giáng Sinh
            </h2>
            <div className="w-12 h-0.5 bg-red-500 mx-auto rounded"></div>
            <p className="text-xs text-red-600 mt-0.5">Trang 2/2</p>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center space-y-0.5 md:space-y-1 relative z-10 overflow-hidden">
            {currentPage >= 2 && renderLetterContent(letterContentPage2, currentLinePage2)}
          </div>

          {currentLinePage2 >= letterContentPage2.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center gap-1.5 md:gap-2 mt-2 relative z-10"
            >
              {['🎄', '🎅', '❄️', '🌟', '🎁', '🦌'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                  className="text-xl md:text-2xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 md:p-3 text-xl md:text-2xl transition-colors shadow-lg z-[120]"
      >
        ✕
      </motion.button>

      {showCelebration && (
        <>
          {Array.from({ length: 40 }, (_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-10 + Math.random() * 20}%`,
                willChange: 'transform, opacity',
              }}
              initial={{ 
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1
              }}
              animate={{
                y: window.innerHeight + 200,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                x: (Math.random() - 0.5) * 200,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            >
              <div
                className="text-3xl"
                style={{
                  color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#FFA07A'][Math.floor(Math.random() * 6)],
                }}
              >
                {['🎉', '✨', '🎊', '⭐', '🌟', '💫', '🎁', '🎄'][Math.floor(Math.random() * 8)]}
              </div>
            </motion.div>
          ))}

          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-2xl">⭐</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-center"
              style={{
                willChange: 'transform',
                filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
                style={{
                  color: '#8B0000',
                  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.9)',
                  willChange: 'opacity, transform',
                }}
              >
                🎄 Chúc Mừng Giáng Sinh! 🎅
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-2xl md:text-3xl font-semibold"
                style={{
                  color: '#B8860B',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.8)',
                  willChange: 'opacity, transform',
                }}
              >
                ✨ Hạnh Phúc & An Lành ✨
              </motion.p>
            </motion.div>
          </motion.div>

          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={`santa-${i}`}
              className="fixed z-[115]"
              style={{
                left: `${-20 - i * 30}%`,
                top: `${10 + (i % 2) * 30}%`,
                willChange: 'transform, opacity',
              }}
              initial={{ x: -200, opacity: 0 }}
              animate={{
                x: window.innerWidth + 200,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 8,
                ease: 'linear',
              }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-5xl md:text-7xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
                  willChange: 'transform',
                }}
              >
                🎅
              </motion.div>
            </motion.div>
          ))}

          {Array.from({ length: 2 }, (_, i) => (
            <motion.div
              key={`reindeer-${i}`}
              className="fixed z-[115]"
              style={{
                left: `${-20 - i * 40}%`,
                top: `${15 + (i % 2) * 35}%`,
                willChange: 'transform, opacity',
              }}
              initial={{ x: -200, opacity: 0 }}
              animate={{
                x: window.innerWidth + 200,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 5 + i * 0.5,
                delay: 2 + i * 0.6,
                repeat: Infinity,
                repeatDelay: 10,
                ease: 'linear',
              }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-4xl md:text-6xl"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))',
                  willChange: 'transform',
                }}
              >
                🦌
              </motion.div>
            </motion.div>
          ))}

          {Array.from({ length: 60 }, (_, i) => (
            <motion.div
              key={`snowflake-${i}`}
              className="absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-10 + Math.random() * 20}%`,
                fontSize: `${10 + Math.random() * 15}px`,
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 1, 1, 0],
                x: (Math.random() - 0.5) * 100,
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              ❄️
            </motion.div>
          ))}

          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.8)',
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
})

export default FinalLetter
