import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'

const MoonStars = memo(function MoonStars() {
  const stars = useMemo(() => Array.from({ length: 10 }, (_, i) => i), [])

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[5]">
      <motion.div
        className="absolute top-10 right-10 text-6xl md:text-8xl"
        animate={{
          scale: [1, 1.1, 1],
          filter: [
            'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
            'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
            'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🌙
      </motion.div>

      {stars.map((star) => (
        <motion.div
          key={star}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
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
    </div>
  )
})

export default MoonStars

