import { motion } from 'framer-motion'

function LetterContent({ onClose }) {
  const wishes = [
    "Chúc bạn và gia đình một Giáng Sinh an lành, hạnh phúc và tràn đầy yêu thương!",
    "Mong rằng mùa Giáng Sinh này sẽ mang đến cho bạn những khoảnh khắc ấm áp bên những người thân yêu.",
    "Hãy để tình yêu thương và lòng biết ơn lan tỏa trong trái tim bạn trong mùa lễ hội đặc biệt này.",
    "Chúc bạn nhận được nhiều niềm vui, tiếng cười và những kỷ niệm đẹp đẽ trong đêm Giáng Sinh.",
    "Mong rằng năm mới sẽ mang đến cho bạn sức khỏe, thành công và hạnh phúc viên mãn."
  ]

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-red-300 relative"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl hover:text-red-600 transition-colors"
      >
        ✕
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <div className="text-5xl mb-4">🎅</div>
        <h3 className="text-2xl font-bold text-red-800 mb-2">
          Lời Chúc Giáng Sinh
        </h3>
        <div className="w-20 h-1 bg-red-500 mx-auto rounded"></div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 mb-6"
      >
        {wishes.map((wish, index) => (
          <motion.p
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-gray-800 text-base leading-relaxed"
          >
            {wish}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center border-t-2 border-red-200 pt-4"
      >
        <p className="text-red-700 font-semibold text-lg">
          Chúc bạn một Giáng Sinh tuyệt vời! 🎄✨
        </p>
        <p className="text-red-600 text-sm mt-2">
          - Ông già Noel -
        </p>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-4 -right-4 text-4xl opacity-50"
      >
        ❄️
      </motion.div>
    </motion.div>
  )
}

export default LetterContent

