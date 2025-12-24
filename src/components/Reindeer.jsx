import { motion } from 'framer-motion'
import { useEffect, useState, memo } from 'react'

const Reindeer = memo(function Reindeer({ onDeliverLetter }) {
  const [hasDeliveredLetter, setHasDeliveredLetter] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasDeliveredLetter && onDeliverLetter) {
        setShowDelivery(true)
        setTimeout(() => {
          setHasDeliveredLetter(true)
          onDeliverLetter()
        }, 4000)
      }
    }, 20000)

    return () => clearTimeout(timer)
  }, [hasDeliveredLetter, onDeliverLetter])

  return (
    <>
      {!showDelivery && (
        <motion.div
          className="fixed top-20 right-10 z-20 hidden lg:block"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{
            x: ['100vw', '-20vw'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'linear',
          }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl"
          >
            🦌🎅
          </motion.div>
        </motion.div>
      )}

      {showDelivery && (
        <motion.div
          className="fixed top-20 right-10 z-20 hidden lg:block"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{
            x: ['100vw', '50vw', '50vw', '100vw'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            times: [0, 0.3, 0.7, 1],
          }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl relative"
          >
            🦌🎅
            <motion.div
              initial={{ scale: 0, y: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1],
                y: [-40, -60, -60],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 2.5,
                delay: 2.5,
                ease: 'easeOut',
              }}
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-5xl"
            >
              ✉️
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: 2.5,
                repeat: 2,
              }}
              className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold bg-red-500 bg-opacity-80 px-3 py-1 rounded-full whitespace-nowrap"
            >
              Có thư cho bạn!
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
})

export default Reindeer

