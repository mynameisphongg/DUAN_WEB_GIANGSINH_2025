import { motion, AnimatePresence } from 'framer-motion'
import { memo, useState, useCallback, useRef, useEffect } from 'react'

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const enableBodyScroll = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

const InteractiveTree = memo(function InteractiveTree({ isOpen, onClose }) {
  const [ornaments, setOrnaments] = useState([])
  const [selectedOrnament, setSelectedOrnament] = useState(null)
  const treeRef = useRef(null)
  const ornamentIdRef = useRef(0)

  const ornamentTypes = [
    { emoji: '🎄', name: 'Cây thông nhỏ' },
    { emoji: '⭐', name: 'Ngôi sao' },
    { emoji: '🎁', name: 'Hộp quà' },
    { emoji: '🔔', name: 'Chuông' },
    { emoji: '🕯️', name: 'Nến' },
    { emoji: '❄️', name: 'Tuyết' },
    { emoji: '🎅', name: 'Ông già Noel' },
    { emoji: '🦌', name: 'Tuần lộc' },
    { emoji: '⛄', name: 'Người tuyết' },
    { emoji: '🎵', name: 'Nhạc' },
    { emoji: '💫', name: 'Sao băng' },
    { emoji: '🌟', name: 'Ngôi sao vàng' },
  ]

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll()
      const saved = localStorage.getItem('interactiveTreeOrnaments')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setOrnaments(parsed)
          if (parsed.length > 0) {
            ornamentIdRef.current = Math.max(...parsed.map(o => o.id)) + 1
          }
        } catch (e) {
          console.log('Error loading saved ornaments:', e)
        }
      }
    } else {
      enableBodyScroll()
    }
    return () => {
      enableBodyScroll()
    }
  }, [isOpen])

  const handleTreeClick = useCallback((e) => {
    if (!treeRef.current || !selectedOrnament) return

    const rect = treeRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
      const newOrnament = {
        id: ornamentIdRef.current++,
        type: selectedOrnament,
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y)),
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
      }

      setOrnaments((prev) => {
        const updated = [...prev, newOrnament]
        localStorage.setItem('interactiveTreeOrnaments', JSON.stringify(updated))
        return updated
      })
    }
  }, [selectedOrnament])

  const handleRemoveOrnament = useCallback((id) => {
    setOrnaments((prev) => {
      const updated = prev.filter((o) => o.id !== id)
      localStorage.setItem('interactiveTreeOrnaments', JSON.stringify(updated))
      return updated
    })
  }, [])

  const handleClearAll = useCallback(() => {
    setOrnaments([])
    localStorage.removeItem('interactiveTreeOrnaments')
  }, [])

  const handleReset = useCallback(() => {
    setOrnaments([])
    localStorage.removeItem('interactiveTreeOrnaments')
    setSelectedOrnament(null)
  }, [])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 rounded-3xl shadow-2xl p-6 md:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              🎄 Tạo Cây Thông Noel Của Bạn 🎄
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-3xl text-white hover:text-red-400 transition-colors"
            >
              ✕
            </motion.button>
          </div>

          <div className="mb-6">
            <p className="text-white text-lg mb-4 text-center">
              Chọn đồ trang trí và click vào cây thông để thêm vào!
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {ornamentTypes.map((ornament) => (
                <motion.button
                  key={ornament.emoji}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedOrnament(ornament.emoji)}
                  className={`text-4xl md:text-5xl p-3 rounded-xl transition-all ${
                    selectedOrnament === ornament.emoji
                      ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 scale-110'
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                  }`}
                  title={ornament.name}
                >
                  {ornament.emoji}
                </motion.button>
              ))}
            </div>
            {selectedOrnament && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-yellow-300 mt-4 text-lg font-semibold"
              >
                Đã chọn: {selectedOrnament} - Click vào cây thông để thêm!
              </motion.p>
            )}
          </div>

          <div className="relative bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900 rounded-2xl p-6 md:p-8 mb-6">
            <div
              ref={treeRef}
              className="relative mx-auto cursor-pointer"
              style={{ width: '100%', maxWidth: '400px', aspectRatio: '1/1.2' }}
              onClick={handleTreeClick}
            >
              <motion.div
                className="text-8xl md:text-9xl text-center"
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
                    'drop-shadow(0 0 30px rgba(34, 197, 94, 0.8))',
                    'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              >
                🎄
              </motion.div>

              <AnimatePresence>
                {ornaments.map((ornament) => (
                  <motion.div
                    key={ornament.id}
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    animate={{ scale: ornament.scale, opacity: 1, rotate: ornament.rotation }}
                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="absolute text-3xl md:text-4xl cursor-pointer"
                    style={{
                      left: `${ornament.x}%`,
                      top: `${ornament.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                    whileHover={{ scale: ornament.scale * 1.2, rotate: ornament.rotation + 15 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveOrnament(ornament.id)
                    }}
                    title="Click để xóa"
                  >
                    {ornament.type}
                  </motion.div>
                ))}
              </AnimatePresence>

              {ornaments.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <p className="text-white text-lg text-center px-4">
                    Chọn đồ trang trí và click vào cây thông để bắt đầu!
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearAll}
              disabled={ornaments.length === 0}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              🗑️ Xóa Tất Cả
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              🔄 Bắt Đầu Lại
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              ✅ Hoàn Thành
            </motion.button>
          </div>

          {ornaments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="text-white text-lg">
                ✨ Bạn đã trang trí {ornaments.length} đồ vật lên cây thông! ✨
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
})

export default InteractiveTree

