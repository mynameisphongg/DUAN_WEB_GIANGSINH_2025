import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

const Traditions = memo(function Traditions() {
  const santas = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 1,
      delay: Math.random() * 2,
    })), []
  )

  const traditions = [
    {
      title: 'Trang Trí Cây Thông',
      description: 'Cả gia đình cùng nhau trang trí cây thông Noel với đèn, quả cầu, và ngôi sao trên đỉnh.',
      icon: '🎄',
    },
    {
      title: 'Treo Tất Giáng Sinh',
      description: 'Trẻ em treo tất bên lò sưởi để ông già Noel bỏ quà vào trong đêm Giáng Sinh.',
      icon: '🧦',
    },
    {
      title: 'Hát Bài Hát Giáng Sinh',
      description: 'Mọi người cùng hát những bài hát truyền thống như "Jingle Bells", "Silent Night".',
      icon: '🎵',
    },
    {
      title: 'Bữa Tối Gia Đình',
      description: 'Gia đình quây quần bên bữa tối ấm cúng với gà tây, bánh pudding và các món ngon.',
      icon: '🍗',
    },
    {
      title: 'Trao Đổi Quà Tặng',
      description: 'Mọi người trao đổi quà tặng để thể hiện tình yêu thương và sự quan tâm.',
      icon: '🎁',
    },
    {
      title: 'Đọc Câu Chuyện Giáng Sinh',
      description: 'Đọc những câu chuyện về Giáng Sinh, về ông già Noel và những điều kỳ diệu.',
      icon: '📖',
    },
  ]

  return (
    <section className="relative py-12 overflow-hidden w-full" style={{
      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,100,0,0.3) 50%, rgba(0,0,0,0.2) 100%)',
    }}>
      {santas.map((santa) => (
        <motion.div
          key={`santa-${santa.id}`}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${santa.left}%`,
            top: `${santa.top}%`,
            willChange: 'transform',
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: santa.duration,
            repeat: Infinity,
            delay: santa.delay,
            ease: 'easeInOut',
          }}
        >
          🎅
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
              textShadow: '0 0 20px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.6)',
            }}
          >
            🦌 Truyền Thống Giáng Sinh 🦌
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Những truyền thống đẹp đẽ được truyền từ thế hệ này sang thế hệ khác, 
            tạo nên những kỷ niệm đáng nhớ.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {traditions.map((tradition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-gradient-to-br from-red-600 bg-opacity-30 via-yellow-500 bg-opacity-20 to-green-600 bg-opacity-30 backdrop-blur-md rounded-2xl p-8 border-2 border-white border-opacity-40 shadow-2xl overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <motion.div
                className="text-7xl mb-6 text-center relative z-10"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.12,
                  ease: 'easeInOut',
                }}
                style={{ willChange: 'transform' }}
              >
                {tradition.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center relative z-10">
                {tradition.title}
              </h3>
              <p className="text-gray-200 leading-relaxed text-center relative z-10">
                {tradition.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Traditions

