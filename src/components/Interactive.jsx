import { memo, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const Interactive = memo(function Interactive() {
  const [selectedWish, setSelectedWish] = useState(null)

  const hearts = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 1,
      delay: Math.random() * 1.5,
    })), []
  )

  const wishes = [
    'Sức khỏe dồi dào',
    'Hạnh phúc tràn đầy',
    'Thành công trong công việc',
    'Tình yêu viên mãn',
    'Gia đình sum vầy',
    'Bình an trong tâm hồn',
  ]

  const handleWishClick = (wish) => {
    setSelectedWish(wish)
    setTimeout(() => setSelectedWish(null), 3000)
  }

  return (
    <section className="relative py-8 overflow-hidden w-full" style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(255,20,147,0.3) 50%, rgba(0,0,0,0.2) 100%)',
    }}>
      {hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className="absolute text-xl opacity-20"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.7, 1, 0.7],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'easeInOut',
          }}
        >
          ❤️
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
              textShadow: '0 0 20px rgba(255, 20, 147, 0.5), 0 0 30px rgba(255, 215, 0, 0.6)',
            }}
          >
            💌 Gửi Lời Chúc 💌
          </h2>
          <p className="text-xl md:text-2xl text-gray-200">
            Chọn một lời chúc để gửi đến người thân yêu của bạn
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0">
          {wishes.map((wish, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWishClick(wish)}
              className="relative bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 bg-opacity-40 backdrop-blur-md rounded-2xl p-8 text-white font-bold text-lg md:text-xl border-2 border-white border-opacity-40 hover:border-opacity-80 transition-all shadow-2xl overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <span className="relative z-10">{wish}</span>
            </motion.button>
          ))}
        </div>

        {selectedWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
            className="text-center relative"
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 bg-opacity-40 backdrop-blur-md rounded-3xl p-12 inline-block border-4 border-white border-opacity-60 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 20, 147, 0.6)',
              }}
            >
              <motion.div
                className="text-6xl mb-6 relative z-10"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ willChange: 'transform' }}
              >
                ✨
              </motion.div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                Lời chúc của bạn:
              </p>
              <p
                className="text-3xl md:text-4xl text-yellow-300 font-bold relative z-10"
                style={{
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 15px rgba(255, 215, 0, 0.8)',
                }}
              >
                {selectedWish}
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
})

export default Interactive

