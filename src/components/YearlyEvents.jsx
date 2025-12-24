import { useState, useMemo, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const YearlyEvents = memo(function YearlyEvents() {
  const [currentMonth, setCurrentMonth] = useState(0)

  const monthlyEvents = useMemo(() => [
    {
      month: 1,
      name: 'Tháng Giêng',
      title: 'Khởi Đầu Năm Mới',
      events: [
        { date: '1/1', title: 'Năm Mới', description: 'Bắt đầu năm mới với hy vọng và ước mơ mới' },
        { date: '7/1', title: 'Giáng Sinh Chính Thống', description: 'Lễ Giáng Sinh theo lịch Chính Thống giáo' },
        { date: '14/1', title: 'Năm Mới Nguyên Đán', description: 'Tết Nguyên Đán - Lễ hội lớn nhất trong năm' },
      ],
      message: 'Tháng đầu tiên của năm, khởi đầu với những lời chúc tốt đẹp và niềm hy vọng mới.',
      color: 'from-blue-500 to-cyan-500',
      emoji: '🎊'
    },
    {
      month: 2,
      name: 'Tháng Hai',
      title: 'Mùa Yêu Thương',
      events: [
        { date: '14/2', title: 'Valentine', description: 'Ngày lễ tình yêu - Chia sẻ yêu thương như tinh thần Noel' },
        { date: 'Cuối tháng', title: 'Chuẩn bị Mùa Chay', description: 'Bắt đầu chuẩn bị tâm hồn cho mùa lễ lớn' },
      ],
      message: 'Tháng của tình yêu, nơi chúng ta học cách yêu thương như Chúa đã yêu thương chúng ta.',
      color: 'from-pink-500 to-red-500',
      emoji: '💝'
    },
    {
      month: 3,
      name: 'Tháng Ba',
      title: 'Mùa Xuân Nở Hoa',
      events: [
        { date: '20/3', title: 'Xuân Phân', description: 'Ngày đầu tiên của mùa xuân - Sự sống mới' },
        { date: '25/3', title: 'Lễ Truyền Tin', description: 'Thiên thần báo tin cho Đức Maria về Chúa Giêsu' },
      ],
      message: 'Mùa xuân đến, mang theo sự sống mới và niềm hy vọng như sự giáng sinh của Chúa.',
      color: 'from-green-500 to-emerald-500',
      emoji: '🌸'
    },
    {
      month: 4,
      name: 'Tháng Tư',
      title: 'Mùa Phục Sinh',
      events: [
        { date: 'Thay đổi', title: 'Lễ Phục Sinh', description: 'Lễ lớn nhất trong năm - Chúa sống lại' },
        { date: 'Sau Phục Sinh', title: 'Mùa Phục Sinh', description: '50 ngày vui mừng về sự phục sinh' },
      ],
      message: 'Mùa Phục Sinh nhắc nhở chúng ta về tình yêu vĩ đại và sự hy sinh của Chúa.',
      color: 'from-yellow-500 to-orange-500',
      emoji: '🐰'
    },
    {
      month: 5,
      name: 'Tháng Năm',
      title: 'Mùa Hoa Hồng',
      events: [
        { date: '1/5', title: 'Lễ Lao Động', description: 'Ngày tôn vinh lao động và sự cống hiến' },
        { date: 'Tháng 5', title: 'Tháng Đức Mẹ', description: 'Dâng hoa kính Đức Mẹ Maria' },
      ],
      message: 'Tháng của Mẹ, nơi chúng ta tôn vinh tình mẫu tử thiêng liêng.',
      color: 'from-rose-500 to-pink-500',
      emoji: '🌹'
    },
    {
      month: 6,
      name: 'Tháng Sáu',
      title: 'Mùa Hè Rực Rỡ',
      events: [
        { date: '24/6', title: 'Lễ Thánh Gioan', description: 'Ngày dài nhất trong năm - Ánh sáng chiến thắng bóng tối' },
        { date: '29/6', title: 'Lễ Thánh Phêrô và Phaolô', description: 'Hai cột trụ của Giáo Hội' },
      ],
      message: 'Mùa hè rực rỡ, ánh sáng của Chúa chiếu soi mọi nơi.',
      color: 'from-yellow-400 to-orange-500',
      emoji: '☀️'
    },
    {
      month: 7,
      name: 'Tháng Bảy',
      title: 'Giữa Năm',
      events: [
        { date: '4/7', title: 'Độc Lập', description: 'Ngày tự do và độc lập' },
        { date: '16/7', title: 'Lễ Đức Mẹ Núi Carmel', description: 'Tôn vinh Đức Mẹ' },
      ],
      message: 'Giữa năm, nhìn lại nửa năm đã qua với lòng biết ơn.',
      color: 'from-blue-400 to-cyan-500',
      emoji: '🌊'
    },
    {
      month: 8,
      name: 'Tháng Tám',
      title: 'Mùa Thu Sắp Đến',
      events: [
        { date: '15/8', title: 'Lễ Đức Mẹ Lên Trời', description: 'Đức Mẹ được đưa về trời' },
        { date: 'Cuối tháng', title: 'Chuẩn bị Mùa Thu', description: 'Thời điểm bắt đầu suy ngẫm' },
      ],
      message: 'Mùa thu sắp đến, mang theo sự bình yên và suy ngẫm.',
      color: 'from-amber-500 to-yellow-600',
      emoji: '🍂'
    },
    {
      month: 9,
      name: 'Tháng Chín',
      title: 'Mùa Thu Vàng',
      events: [
        { date: '23/9', title: 'Thu Phân', description: 'Ngày đầu tiên của mùa thu' },
        { date: '29/9', title: 'Lễ Tổng Lãnh Thiên Thần', description: 'Các thiên thần bảo vệ chúng ta' },
      ],
      message: 'Mùa thu vàng, thời điểm đẹp nhất để suy ngẫm và biết ơn.',
      color: 'from-orange-500 to-red-600',
      emoji: '🍁'
    },
    {
      month: 10,
      name: 'Tháng Mười',
      title: 'Chuẩn Bị Mùa Đông',
      events: [
        { date: '31/10', title: 'Halloween', description: 'Đêm trước Lễ Các Thánh' },
        { date: 'Cuối tháng', title: 'Bắt đầu Mùa Đông', description: 'Chuẩn bị cho mùa lễ lớn' },
      ],
      message: 'Tháng mười, bắt đầu cảm nhận không khí mùa đông và sự ấm áp của gia đình.',
      color: 'from-purple-500 to-indigo-600',
      emoji: '🎃'
    },
    {
      month: 11,
      name: 'Tháng Mười Một',
      title: 'Mùa Tạ Ơn',
      events: [
        { date: '1/11', title: 'Lễ Các Thánh', description: 'Tôn vinh tất cả các thánh' },
        { date: '2/11', title: 'Lễ Các Linh Hồn', description: 'Cầu nguyện cho những người đã khuất' },
        { date: 'Cuối tháng', title: 'Lễ Tạ Ơn', description: 'Cảm ơn Chúa về mọi điều tốt đẹp' },
      ],
      message: 'Tháng của lòng biết ơn, nhắc nhở chúng ta về những phước lành đã nhận được.',
      color: 'from-amber-600 to-orange-600',
      emoji: '🦃'
    },
    {
      month: 12,
      name: 'Tháng Mười Hai',
      title: 'Mùa Giáng Sinh',
      events: [
        { date: '8/12', title: 'Lễ Đức Mẹ Vô Nhiễm', description: 'Đức Mẹ được bảo vệ khỏi tội nguyên tổ' },
        { date: '24/12', title: 'Đêm Giáng Sinh', description: 'Đêm thiêng liêng nhất trong năm' },
        { date: '25/12', title: 'Lễ Giáng Sinh', description: 'Chúa Giêsu giáng sinh - Ngày vui mừng nhất' },
        { date: '31/12', title: 'Giao Thừa', description: 'Kết thúc năm cũ, chào đón năm mới' },
      ],
      message: 'Tháng đẹp nhất trong năm, nơi tình yêu và niềm vui lan tỏa khắp nơi.',
      color: 'from-red-600 via-green-600 to-red-600',
      emoji: '🎄'
    },
  ], [])

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev + 1) % monthlyEvents.length)
  }

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev - 1 + monthlyEvents.length) % monthlyEvents.length)
  }

  const goToMonth = (index) => {
    setCurrentMonth(index)
  }

  const currentData = monthlyEvents[currentMonth]

  return (
    <section className="relative py-16 overflow-hidden w-full" style={{
      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)',
    }}>
      <div className="w-full px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 215, 0, 0.6)',
          }}>
            📅 Hành Trình Năm Qua
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Khám phá các sự kiện quan trọng trong năm liên quan đến Giáng Sinh và tình yêu thương
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMonth}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={`bg-gradient-to-br ${currentData.color} rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white border-opacity-30 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-6xl mb-4"
                      >
                        {currentData.emoji}
                      </motion.div>
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        {currentData.name}
                      </h3>
                      <p className="text-xl md:text-2xl text-white opacity-90">
                        {currentData.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-8xl md:text-9xl font-bold text-white opacity-20">
                        {String(currentData.month).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {currentData.events.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-white bg-opacity-30 rounded-lg px-4 py-2 flex-shrink-0">
                            <span className="text-white font-bold text-lg">{event.date}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-xl mb-2">{event.title}</h4>
                            <p className="text-white text-sm opacity-90 leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-30"
                  >
                    <p className="text-white text-lg md:text-xl leading-relaxed italic text-center">
                      "{currentData.message}"
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevMonth}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-md rounded-full p-4 text-white text-2xl transition-all z-20"
              style={{ willChange: 'transform' }}
            >
              ‹
            </button>
            <button
              onClick={nextMonth}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-md rounded-full p-4 text-white text-2xl transition-all z-20"
              style={{ willChange: 'transform' }}
            >
              ›
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {monthlyEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => goToMonth(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentMonth
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                }`}
                style={{ willChange: 'transform' }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-white border-opacity-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10" />
            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-6xl mb-6"
                style={{ willChange: 'transform' }}
              >
                ✨
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Lời Chúc Cuối Năm
              </h3>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-4">
                Trong suốt 12 tháng qua, chúng ta đã cùng nhau trải qua nhiều khoảnh khắc đáng nhớ.
              </p>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-4">
                Từ những ngày đầu năm đầy hy vọng, qua mùa xuân nở hoa, mùa hè rực rỡ, mùa thu vàng,
                đến mùa đông ấm áp với Giáng Sinh thiêng liêng.
              </p>
              <p className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-6">
                Chúc bạn và gia đình một năm mới tràn đầy hạnh phúc, sức khỏe, và tình yêu thương!
              </p>
              <p className="text-white text-lg md:text-xl italic">
                "Mỗi tháng là một món quà, mỗi ngày là một phước lành. Hãy trân trọng từng khoảnh khắc!"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default YearlyEvents

