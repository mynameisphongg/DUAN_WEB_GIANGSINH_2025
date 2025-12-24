import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'

const Footer = memo(function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="relative py-12 mt-0 overflow-hidden w-full"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(139,0,0,0.4) 50%, rgba(0,100,0,0.3) 100%)',
      }}
    >
      {useMemo(() => 
        Array.from({ length: 15 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
        })), []
      ).map((snow) => (
        <motion.div
          key={`snow-${snow.id}`}
          className="absolute text-2xl"
          style={{
            left: `${snow.left}%`,
            top: `${snow.top}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: snow.duration,
            repeat: Infinity,
            delay: snow.delay,
            ease: 'linear',
          }}
        >
          ❄️
        </motion.div>
      ))}
      
      {useMemo(() => 
        Array.from({ length: 10 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 2,
        })), []
      ).map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute text-xl text-yellow-300"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
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

      <div className="w-full px-4 text-center relative z-10">
        <motion.div
          animate={{
            textShadow: [
              '0 0 20px rgba(255, 255, 255, 0.6)',
              '0 0 40px rgba(255, 215, 0, 0.8)',
              '0 0 60px rgba(255, 0, 0, 0.6)',
              '0 0 20px rgba(255, 255, 255, 0.6)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8"
        >
          <motion.p
            className="text-white text-3xl md:text-4xl font-bold mb-6"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🎅 Chúc bạn và gia đình một Giáng Sinh an lành và hạnh phúc! 🎄
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 mb-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {['🎁', '🦌', '🕯️', '🔔', '⛄', '🌟', '🎵', '❄️'].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className="text-4xl"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-gray-200 text-lg md:text-xl"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          2025 Dev Nguyễn Ngọc Phong with love ❤️
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.footer>
  )
})

export default Footer

