import { motion } from 'framer-motion'
import { useMemo, memo } from 'react'

const Header = memo(function Header() {
  const stars = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 1,
      delay: Math.random() * 1.5,
    })), []
  )

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative text-center py-4 px-4 overflow-hidden"
    >
      {stars.map((star) => (
        <motion.div
          key={`header-star-${star.id}`}
          className="absolute text-xl text-yellow-300"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [0.7, 1.1, 0.7],
            rotate: [0, 180],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          ⭐
        </motion.div>
      ))}

      <motion.h1
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 relative z-10"
        style={{
          textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 215, 0, 0.6)',
          willChange: 'transform',
        }}
      >
        🎄 Chào Mừng Giáng Sinh 🎄
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ delay: 0.5, duration: 3, repeat: Infinity }}
        className="text-xl md:text-2xl lg:text-3xl text-yellow-300 font-bold relative z-10"
        style={{
          textShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
          willChange: 'opacity',
        }}
      >
        Mùa của Yêu Thương và Hạnh Phúc
      </motion.p>

      <motion.div
        className="flex justify-center gap-4 mt-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {['🎅', '🦌', '⛄', '🎁', '🕯️', '🔔'].map((emoji, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="text-3xl md:text-4xl"
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>
    </motion.header>
  )
})

export default Header

