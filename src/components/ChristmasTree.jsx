import { motion } from 'framer-motion'
import { useState, useEffect, memo } from 'react'

const ChristmasTree = memo(function ChristmasTree() {
  const [lights, setLights] = useState([])

  useEffect(() => {
    const lightPositions = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
    }))
    setLights(lightPositions)
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <motion.div
        animate={{
          filter: [
            'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
            'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
            'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-8xl md:text-9xl"
      >
        🎄
      </motion.div>
      
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: light.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  )
})

export default ChristmasTree

