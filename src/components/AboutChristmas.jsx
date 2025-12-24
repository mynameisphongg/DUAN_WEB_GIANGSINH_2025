import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

const AboutChristmas = memo(function AboutChristmas() {
  const sparkles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 1,
      delay: Math.random() * 1.5,
    })), []
  )

  const features = [
    {
      icon: '🎄',
      title: 'Cây Thông Noel',
      description: 'Biểu tượng của sự sống và hy vọng, cây thông được trang trí rực rỡ với đèn và đồ trang trí.',
    },
    {
      icon: '🎅',
      title: 'Ông Già Noel',
      description: 'Nhân vật huyền thoại mang quà và niềm vui đến cho trẻ em trên khắp thế giới.',
    },
    {
      icon: '❄️',
      title: 'Tuyết Rơi',
      description: 'Những bông tuyết trắng tinh khôi tạo nên không khí lãng mạn và ấm áp.',
    },
    {
      icon: '🎁',
      title: 'Quà Tặng',
      description: 'Trao tặng quà là cách thể hiện tình yêu thương và sự quan tâm đến người thân.',
    },
    {
      icon: '🕯️',
      title: 'Nến Thắp Sáng',
      description: 'Ánh sáng của nến tượng trưng cho hy vọng và sự ấm áp trong đêm đông.',
    },
    {
      icon: '🎵',
      title: 'Bài Hát Giáng Sinh',
      description: 'Những giai điệu quen thuộc tạo nên không khí vui tươi và đầy cảm xúc.',
    },
  ]

  return (
    <section className="relative py-12 overflow-hidden w-full" style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(139,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)',
    }}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute text-lg"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
        >
          ✨
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
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 215, 0, 0.6)',
            }}
          >
            🎄 Về Giáng Sinh 🎄
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Giáng Sinh là lễ hội tôn giáo và văn hóa quan trọng, kỷ niệm sự ra đời của Chúa Giêsu, 
            và cũng là thời điểm để mọi người cùng nhau chia sẻ tình yêu thương.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-gradient-to-br from-red-500 bg-opacity-20 via-green-500 bg-opacity-20 to-blue-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-8 border-2 border-white border-opacity-30 shadow-2xl overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <motion.div
                className="text-6xl mb-4 relative z-10"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: 'easeInOut',
                }}
                style={{ willChange: 'transform' }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-gray-200 leading-relaxed relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default AboutChristmas

