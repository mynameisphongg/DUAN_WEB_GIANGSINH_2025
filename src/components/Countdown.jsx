import { useState, useEffect, memo, useMemo } from 'react'
import { motion } from 'framer-motion'

const Countdown = memo(function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let christmas = new Date(currentYear, 11, 25)
      
      if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25)
      }

      const difference = christmas - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  const bells = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 1,
      delay: Math.random() * 2,
    })), []
  )

  const TimeBox = ({ value, label }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative bg-gradient-to-br from-red-600 bg-opacity-40 via-yellow-500 bg-opacity-30 to-green-600 bg-opacity-40 backdrop-blur-md rounded-2xl p-8 min-w-[120px] text-center border-2 border-white border-opacity-40 shadow-2xl"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        key={value}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="text-6xl md:text-7xl font-bold text-white mb-3"
        style={{
          textShadow: '0 0 12px rgba(255, 255, 255, 0.5)',
          willChange: 'opacity',
        }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="text-base md:text-lg text-yellow-300 font-bold uppercase">{label}</div>
    </motion.div>
  )

  return (
    <section className="relative py-12 overflow-hidden w-full" style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(255,140,0,0.3) 50%, rgba(0,0,0,0.2) 100%)',
    }}>
      {bells.map((bell) => (
        <motion.div
          key={`bell-${bell.id}`}
          className="absolute text-xl opacity-25"
          style={{
            left: `${bell.left}%`,
            top: `${bell.top}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            rotate: [0, 3, -3, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: bell.duration,
            repeat: Infinity,
            delay: bell.delay,
            ease: 'easeInOut',
          }}
        >
          🔔
        </motion.div>
      ))}

      <div className="w-full px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{
              textShadow: '0 0 20px rgba(255, 140, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.6)',
            }}
          >
            ⏰ Đếm Ngược Đến Giáng Sinh ⏰
          </h2>
          <p className="text-xl md:text-2xl text-gray-200">
            Còn bao nhiêu thời gian nữa đến đêm Giáng Sinh?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <TimeBox value={timeLeft.days} label="Ngày" />
          <TimeBox value={timeLeft.hours} label="Giờ" />
          <TimeBox value={timeLeft.minutes} label="Phút" />
          <TimeBox value={timeLeft.seconds} label="Giây" />
        </motion.div>
      </div>
    </section>
  )
})

export default Countdown

