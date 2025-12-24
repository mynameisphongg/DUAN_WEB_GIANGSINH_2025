import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

const Gallery = memo(function Gallery() {
  const gifts = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 1,
      delay: Math.random() * 1.5,
    })), []
  )

  const items = [
    { emoji: '🎄', label: 'Cây Thông' },
    { emoji: '🎅', label: 'Ông Già Noel' },
    { emoji: '⛄', label: 'Người Tuyết' },
    { emoji: '🦌', label: 'Tuần Lộc' },
    { emoji: '🎁', label: 'Quà Tặng' },
    { emoji: '🕯️', label: 'Nến' },
    { emoji: '❄️', label: 'Tuyết' },
    { emoji: '🌟', label: 'Ngôi Sao' },
    { emoji: '🔔', label: 'Chuông' },
    { emoji: '🍪', label: 'Bánh Quy' },
    { emoji: '☕', label: 'Cà Phê Nóng' },
    { emoji: '🎵', label: 'Âm Nhạc' },
  ]

  return (
    <section className="relative py-12 overflow-hidden w-full" style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(75,0,130,0.3) 50%, rgba(0,0,0,0.2) 100%)',
    }}>
      {gifts.map((gift) => (
        <motion.div
          key={`gift-${gift.id}`}
          className="absolute text-xl opacity-20"
          style={{
            left: `${gift.left}%`,
            top: `${gift.top}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: gift.duration,
            repeat: Infinity,
            delay: gift.delay,
            ease: 'easeInOut',
          }}
        >
          🎁
        </motion.div>
      ))}

      <div className="w-full px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(138, 43, 226, 0.6)',
            }}
          >
            🎨 Bộ Sưu Tập Giáng Sinh 🎨
          </h2>
          <p className="text-xl md:text-2xl text-gray-200">
            Những biểu tượng đẹp đẽ của mùa Giáng Sinh
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.15, rotate: 8 }}
              className="relative bg-gradient-to-br from-yellow-500 bg-opacity-20 via-red-500 bg-opacity-20 to-green-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-6 text-center border-2 border-white border-opacity-30 cursor-pointer shadow-2xl overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <motion.div
                className="text-7xl mb-3 relative z-10"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.08,
                  ease: 'easeInOut',
                }}
                style={{ willChange: 'transform' }}
              >
                {item.emoji}
              </motion.div>
              <div className="text-sm text-white font-bold relative z-10">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Gallery

