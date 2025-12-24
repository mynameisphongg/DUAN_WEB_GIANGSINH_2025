import { motion } from 'framer-motion'
import { memo } from 'react'

const Snowman = memo(function Snowman() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="inline-block"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-7xl md:text-9xl"
      >
        ⛄
      </motion.div>
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-4xl mt-2"
      >
        🧹
      </motion.div>
    </motion.div>
  )
})

export default Snowman

