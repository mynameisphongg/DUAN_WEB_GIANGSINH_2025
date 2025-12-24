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

const FinalYearMessage = memo(function FinalYearMessage({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLinePage1, setCurrentLinePage1] = useState(0)
  const [currentLinePage2, setCurrentLinePage2] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const letterContentPage1 = [
    'Gửi bạn thân yêu,',
    '',
    'Trong suốt 12 tháng qua, chúng ta đã cùng nhau',
    'trải qua nhiều khoảnh khắc đáng nhớ.',
    '',
    '✨ Từ những ngày đầu năm đầy hy vọng,',
    '   qua mùa xuân nở hoa, mùa hè rực rỡ,',
    '   mùa thu vàng, đến mùa đông ấm áp',
    '   với Giáng Sinh thiêng liêng.',
    '',
    '🌟 Mỗi tháng là một món quà,',
    '   mỗi ngày là một phước lành.',
    '   Hãy trân trọng từng khoảnh khắc!',
    '',
    '💝 Năm 2025 đã qua với biết bao',
    '   kỷ niệm đẹp và những bài học quý giá.',
  ]

  const letterContentPage2 = [
    '🎊 Chào Mừng Năm Mới 2026! 🎊',
    '',
    '✨ Chúc bạn và gia đình một năm mới',
    '   tràn đầy hạnh phúc, sức khỏe,',
    '   và tình yêu thương!',
    '',
    '🌟 Năm 2026 sẽ là năm của những',
    '   thành công rực rỡ và những',
    '   ước mơ được thực hiện!',
    '',
    '🎄 Hãy để tình yêu thương lan tỏa',
    '   và làm ấm lòng mọi người xung quanh bạn!',
    '',
    '🎁 Chúc bạn có những khoảnh khắc đáng nhớ',
    '   bên gia đình và bạn bè thân yêu!',
    '',
    'Với tất cả tình yêu thương,',
    '🎅 Chúc bạn một năm mới tuyệt vời! 🎆',
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
        }}
        className={`${
          line === '' 
            ? 'h-1' 
            : line.startsWith('✨') || line.startsWith('🌟') || line.startsWith('💝') || line.startsWith('🎊') || line.startsWith('🎄') || line.startsWith('🎁') || line.startsWith('🎅') || line.startsWith('🎆')
            ? 'text-xs md:text-sm text-yellow-300 font-bold leading-tight'
            : line.startsWith('Gửi') || line.startsWith('Với')
            ? 'text-xs md:text-sm text-blue-200 font-bold italic'
            : 'text-xs md:text-sm text-white leading-tight'
        }`}
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}
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
      className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-[105] flex items-center justify-center p-3 md:p-6 overflow-hidden"
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      {Array.from({ length: 50 }, (_, i) => (
        <motion.div
          key={`star-bg-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        >
          <div className="text-2xl">⭐</div>
        </motion.div>
      ))}

      <div className="relative w-full max-w-6xl h-full flex flex-col md:flex-row gap-3 md:gap-4 overflow-hidden px-2">
        <motion.div
          initial={{ opacity: 0, x: -100, rotateY: -90 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full md:w-1/2 bg-gradient-to-br from-blue-800/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-blue-400/30 p-3 md:p-4 h-full flex flex-col overflow-hidden"
          style={{
            boxShadow: '0 0 50px rgba(59, 130, 246, 0.5), inset 0 0 50px rgba(59, 130, 246, 0.1)',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-3 right-3 text-3xl md:text-4xl opacity-30"
          >
            🎆
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-2 relative z-10"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-3xl md:text-4xl mb-1"
            >
              🎊
            </motion.div>
            <h2 className="text-lg md:text-xl font-bold text-yellow-300 mb-1" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}>
              Lời Chúc Năm Mới
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded"></div>
            <p className="text-xs text-blue-200 mt-1">Trang 1/2</p>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center space-y-0.5 md:space-y-1 relative z-10 overflow-hidden">
            {renderLetterContent(letterContentPage1, currentLinePage1)}
          </div>

          {currentLinePage1 >= letterContentPage1.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center gap-2 md:gap-3 mt-3 relative z-10"
            >
              {['🎊', '✨', '🌟', '💝', '🎄', '🎁'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="text-2xl md:text-3xl"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: 90 }}
          animate={{ 
            opacity: currentPage >= 2 ? 1 : 0,
            x: currentPage >= 2 ? 0 : 100,
            rotateY: currentPage >= 2 ? 0 : 90
          }}
          transition={{ duration: 0.8, delay: currentPage >= 2 ? 0.3 : 0, ease: 'easeOut' }}
          className="relative w-full md:w-1/2 bg-gradient-to-br from-purple-800/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-400/30 p-3 md:p-4 h-full flex flex-col overflow-hidden"
          style={{
            boxShadow: '0 0 50px rgba(147, 51, 234, 0.5), inset 0 0 50px rgba(147, 51, 234, 0.1)',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-3 right-3 text-3xl md:text-4xl opacity-30"
          >
            🎆
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: currentPage >= 2 ? 1 : 0, y: currentPage >= 2 ? 0 : -20 }}
            transition={{ duration: 0.6, delay: currentPage >= 2 ? 0.5 : 0 }}
            className="text-center mb-2 relative z-10"
          >
            <motion.div
              animate={{
                rotate: [0, -360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-3xl md:text-4xl mb-1"
            >
              🎊
            </motion.div>
            <h2 className="text-lg md:text-xl font-bold text-yellow-300 mb-1" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}>
              Lời Chúc Năm Mới
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded"></div>
            <p className="text-xs text-purple-200 mt-1">Trang 2/2</p>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center space-y-0.5 md:space-y-1 relative z-10 overflow-hidden">
            {currentPage >= 2 && renderLetterContent(letterContentPage2, currentLinePage2)}
          </div>

          {currentLinePage2 >= letterContentPage2.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center gap-2 md:gap-3 mt-3 relative z-10"
            >
              {['🎊', '✨', '🌟', '💝', '🎄', '🎁'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="text-2xl md:text-3xl"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: currentLinePage2 >= letterContentPage2.length ? 1 : 0, scale: currentLinePage2 >= letterContentPage2.length ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-3 md:p-4 text-xl md:text-2xl transition-all shadow-2xl z-[120]"
        style={{
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
        }}
      >
        ✕
      </motion.button>

      {showCelebration && (
        <>
          {Array.from({ length: 100 }, (_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-10 + Math.random() * 20}%`,
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
                className="text-4xl"
                style={{
                  color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#FFA07A'][Math.floor(Math.random() * 6)],
                }}
              >
                {['🎉', '✨', '🎊', '⭐', '🌟', '💫', '🎁', '🎄', '🎆', '🎈'][Math.floor(Math.random() * 10)]}
              </div>
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
                scale: [1, 1.2, 1],
                filter: [
                  'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                  'drop-shadow(0 0 60px rgba(255, 215, 0, 1))',
                  'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
                style={{
                  color: '#FFD700',
                  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.7)',
                }}
              >
                🎊 Chúc Mừng Năm Mới 2026! 🎊
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-2xl md:text-3xl font-semibold"
                style={{
                  color: '#FFA500',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.8)',
                }}
              >
                ✨ Hạnh Phúc & Thành Công ✨
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
})

export default FinalYearMessage
