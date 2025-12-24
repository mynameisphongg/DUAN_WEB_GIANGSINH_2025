import { memo, lazy, Suspense, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import ChristmasTree from './ChristmasTree'
import Snowman from './Snowman'
import MoonStars from './MoonStars'

const AboutChristmas = lazy(() => import('./AboutChristmas'))
const Traditions = lazy(() => import('./Traditions'))
const Countdown = lazy(() => import('./Countdown'))
const Gallery = lazy(() => import('./Gallery'))
const Interactive = lazy(() => import('./Interactive'))

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="text-4xl animate-spin">❄️</div>
  </div>
)

const MainContent = memo(function MainContent({ onOpenPortal, onOpenYearlyEvents, onOpenTree }) {
  const buttonParticles = useMemo(() => 
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 50,
    })), []
  )

  const treeStars = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    })), []
  )

  const snowmanFlakes = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    })), []
  )

  const loveStars = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    })), []
  )

  return (
    <>
      <div className="relative w-full py-4">
        <MoonStars />
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white text-shadow-lg mb-6">
              Đêm Noel Huyền Bí
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto mb-12">
              Khung cảnh Giáng sinh huyền bí vào đêm Noel, với tuyết nhẹ nhàng rơi khắp nơi. 
              Ông già Noel cưỡi tuần lộc bay qua bầu trời đêm đầy sao và ánh sáng lung linh từ mặt trăng.
            </p>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(255, 215, 0, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenPortal}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-10 rounded-full text-xl shadow-2xl transition-all relative overflow-hidden group"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                  willChange: 'transform',
                }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-2 -right-2 text-3xl"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
                    willChange: 'transform',
                  }}
                >
                  🎁
                </motion.span>
                <span className="relative z-10">Nhận Quà Từ Ông Già Noel</span>
                {buttonParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                      willChange: 'transform, opacity',
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                      x: [0, particle.x],
                      y: [0, particle.y],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: particle.id * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenYearlyEvents}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-10 rounded-full text-xl shadow-2xl transition-all relative overflow-hidden group"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))',
                  willChange: 'transform',
                }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute -top-2 -right-2 text-3xl"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))',
                    willChange: 'transform',
                  }}
                >
                  📅
                </motion.span>
                <span className="relative z-10">Xem Lại 12 Tháng Đã Qua Trong Năm 2025</span>
                {Array.from({ length: 4 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-300 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      willChange: 'transform, opacity',
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                      x: [0, (Math.random() - 0.5) * 50],
                      y: [0, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(34, 197, 94, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenTree}
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 px-10 rounded-full text-xl shadow-2xl transition-all relative overflow-hidden group"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))',
                  willChange: 'transform',
                }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-2 -right-2 text-3xl"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))',
                    willChange: 'transform',
                  }}
                >
                  🎄
                </motion.span>
                <span className="relative z-10">Tạo Cây Thông Noel</span>
                {Array.from({ length: 4 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-green-300 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      willChange: 'transform, opacity',
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                      x: [0, (Math.random() - 0.5) * 50],
                      y: [0, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center relative mt-12"
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))',
                  'drop-shadow(0 0 25px rgba(34, 197, 94, 0.6))',
                  'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ willChange: 'filter' }}
            >
              <ChristmasTree />
            </motion.div>
            {treeStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute text-xl"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  willChange: 'transform, opacity',
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <main className="relative py-4 w-full">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 relative"
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 12px rgba(255, 255, 255, 0.5))',
                  'drop-shadow(0 0 20px rgba(135, 206, 250, 0.6))',
                  'drop-shadow(0 0 12px rgba(255, 255, 255, 0.5))',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ willChange: 'filter' }}
            >
              <Snowman />
            </motion.div>
            {snowmanFlakes.map((flake) => (
              <motion.div
                key={flake.id}
                className="absolute text-lg"
                style={{
                  left: `${flake.left}%`,
                  top: `${flake.top}%`,
                  willChange: 'transform, opacity',
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 0.9, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: flake.delay,
                  ease: 'easeInOut',
                }}
              >
                ❄️
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center relative"
          >
            <h3 className="text-4xl font-bold text-white text-shadow-lg mb-6">
              Chia Sẻ Yêu Thương
            </h3>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Giáng sinh là thời điểm để chúng ta cùng nhau chia sẻ niềm vui, 
              tình yêu thương và những khoảnh khắc ấm áp bên gia đình và bạn bè.
            </p>
            {loveStars.map((star) => (
              <motion.div
                key={star.id}
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
                  duration: 4,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: 'easeInOut',
                }}
              >
                ⭐
              </motion.div>
            ))}
          </motion.div>
        </div>

      <Suspense fallback={<LoadingSpinner />}>
        <Countdown />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <AboutChristmas />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Traditions />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Gallery />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Interactive />
      </Suspense>

      </main>

    </>
  )
})

export default MainContent

