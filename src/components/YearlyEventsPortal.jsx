import { motion, AnimatePresence } from 'framer-motion'
import { memo, useEffect, useState, useRef, useMemo } from 'react'
import FinalYearMessage from './FinalYearMessage'

const VietnamFlag = memo(function VietnamFlag() {
  return (
    <span className="inline-block relative" style={{ width: '1.2em', height: '1.2em' }}>
      <span 
        className="absolute inset-0 rounded-sm"
        style={{
          background: 'linear-gradient(to bottom, #DA020E 0%, #DA020E 50%, #DA020E 100%)',
          boxShadow: '0 0 8px rgba(218, 2, 14, 0.6)',
        }}
      />
      <span 
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '0.5em',
          filter: 'drop-shadow(0 0 3px rgba(255, 255, 0, 0.8))',
        }}
      >
        ⭐
      </span>
    </span>
  )
})

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const enableBodyScroll = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

const YearlyEventsPortal = memo(function YearlyEventsPortal({ isOpen, onClose }) {
  const [showCalendarBox, setShowCalendarBox] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const autoPlayRef = useRef(null)

  const monthlyEvents = [
    {
      month: 1,
      name: 'Tháng Giêng',
      title: 'Khởi Đầu Năm Mới',
      icon: '🎊',
      bgElements: ['🎉', '✨', '🌟'],
      bgGradient: 'from-blue-400 via-cyan-500 to-blue-600',
      events: [
        { date: '1/1', title: 'Tết Dương Lịch', description: 'Năm mới dương lịch - Khởi đầu năm mới với hy vọng', icon: '🎆' },
        { date: 'Cuối tháng 1', title: 'Tết Nguyên Đán', description: 'Tết cổ truyền Việt Nam - Lễ hội lớn nhất trong năm, sum họp gia đình', icon: '🧧' },
        { date: '7/1', title: 'Giáng Sinh Chính Thống', description: 'Lễ Giáng Sinh theo lịch Chính Thống giáo', icon: '🎅' },
      ],
      message: 'Tháng đầu tiên của năm với Tết Nguyên Đán - thời điểm sum họp gia đình và những lời chúc tốt đẹp.',
      effectType: 'fireworks',
    },
    {
      month: 2,
      name: 'Tháng Hai',
      title: 'Mùa Yêu Thương',
      icon: '💝',
      bgElements: ['💕', '🌹', '💌'],
      bgGradient: 'from-pink-500 via-rose-600 to-red-600',
      events: [
        { date: '14/2', title: 'Valentine', description: 'Ngày lễ tình yêu - Chia sẻ yêu thương', icon: '💖' },
        { date: '27/2', title: 'Ngày Thầy thuốc Việt Nam', description: 'Tôn vinh những người thầy thuốc đã cống hiến cho sức khỏe nhân dân', icon: '⚕️' },
      ],
      message: 'Tháng của tình yêu và lòng biết ơn đến những người thầy thuốc đã chăm sóc sức khỏe cho chúng ta.',
      effectType: 'hearts',
    },
    {
      month: 3,
      name: 'Tháng Ba',
      title: 'Mùa Xuân Nở Hoa',
      icon: '🌸',
      bgElements: ['🌺', '🌷', '🌼'],
      bgGradient: 'from-green-500 via-emerald-600 to-green-700',
      events: [
        { date: '8/3', title: 'Ngày Quốc tế Phụ nữ', description: 'Tôn vinh phụ nữ Việt Nam và thế giới', icon: '🌸' },
        { date: '10/3', title: 'Giỗ Tổ Hùng Vương', description: 'Lễ hội đền Hùng - Tưởng nhớ các Vua Hùng dựng nước', icon: '⛩️' },
      ],
      message: 'Tháng của mùa xuân với Giỗ Tổ Hùng Vương - nhớ về cội nguồn dân tộc và tôn vinh phụ nữ.',
      effectType: 'flowers',
    },
    {
      month: 4,
      name: 'Tháng Tư',
      title: 'Mùa Phục Sinh',
      icon: '🐰',
      bgElements: ['🥚', '🌷', '🕊️'],
      bgGradient: 'from-yellow-500 via-orange-600 to-yellow-700',
      events: [
        { date: '30/4', title: 'Ngày Giải phóng miền Nam', description: 'Thống nhất đất nước - Ngày lịch sử trọng đại của dân tộc', icon: '🇻🇳' },
        { date: '1/5', title: 'Ngày Quốc tế Lao động', description: 'Tôn vinh người lao động Việt Nam và thế giới', icon: '🔨' },
      ],
      message: 'Tháng tư lịch sử với ngày Giải phóng miền Nam - thống nhất đất nước, hòa bình và độc lập.',
      effectType: 'eggs',
    },
    {
      month: 5,
      name: 'Tháng Năm',
      title: 'Mùa Hoa Hồng',
      icon: '🌹',
      bgElements: ['🌺', '💐', '🌷'],
      bgGradient: 'from-rose-500 via-pink-600 to-rose-700',
      events: [
        { date: '1/5', title: 'Ngày Quốc tế Lao động', description: 'Tôn vinh người lao động và sự cống hiến', icon: '👷' },
        { date: '19/5', title: 'Ngày sinh Chủ tịch Hồ Chí Minh', description: 'Kỷ niệm ngày sinh Bác Hồ - Vị lãnh tụ vĩ đại của dân tộc', icon: '🌟' },
      ],
      message: 'Tháng của Bác Hồ - người đã dẫn dắt dân tộc Việt Nam đến độc lập và tự do.',
      effectType: 'roses',
    },
    {
      month: 6,
      name: 'Tháng Sáu',
      title: 'Mùa Hè Rực Rỡ',
      icon: '☀️',
      bgElements: ['🌻', '🌞', '🏖️'],
      bgGradient: 'from-yellow-400 via-orange-500 to-yellow-600',
      events: [
        { date: '1/6', title: 'Ngày Quốc tế Thiếu nhi', description: 'Ngày dành cho trẻ em - Tương lai của đất nước', icon: '👶' },
        { date: '28/6', title: 'Ngày Gia đình Việt Nam', description: 'Tôn vinh giá trị gia đình - Tế bào của xã hội', icon: '👨‍👩‍👧‍👦' },
      ],
      message: 'Tháng của trẻ em và gia đình - nơi tình yêu thương và sự ấm áp được nuôi dưỡng.',
      effectType: 'sun',
    },
    {
      month: 7,
      name: 'Tháng Bảy',
      title: 'Giữa Năm',
      icon: '🌊',
      bgElements: ['🌴', '🏝️', '🌺'],
      bgGradient: 'from-blue-400 via-cyan-500 to-blue-600',
      events: [
        { date: '27/7', title: 'Ngày Thương binh Liệt sĩ', description: 'Tưởng nhớ và tri ân những anh hùng đã hy sinh vì Tổ quốc', icon: '🕊️' },
        { date: '1/7', title: 'Ngày Báo chí Cách mạng Việt Nam', description: 'Kỷ niệm ngày thành lập báo chí cách mạng Việt Nam', icon: '📰' },
      ],
      message: 'Tháng tri ân - nhớ về những người đã hy sinh xương máu cho độc lập, tự do của dân tộc.',
      effectType: 'waves',
    },
    {
      month: 8,
      name: 'Tháng Tám',
      title: 'Mùa Thu Sắp Đến',
      icon: '🍂',
      bgElements: ['🌾', '🌻', '🍁'],
      bgGradient: 'from-amber-500 via-yellow-600 to-amber-700',
      events: [
        { date: '19/8', title: 'Cách mạng Tháng Tám', description: 'Cuộc cách mạng vĩ đại giành độc lập cho dân tộc', icon: '🇻🇳' },
        { date: '2/9', title: 'Quốc khánh', description: 'Ngày độc lập của nước Việt Nam Dân chủ Cộng hòa', icon: '🎉' },
      ],
      message: 'Tháng lịch sử với Cách mạng Tháng Tám và Quốc khánh - những dấu mốc vĩ đại của dân tộc.',
      effectType: 'leaves',
    },
    {
      month: 9,
      name: 'Tháng Chín',
      title: 'Mùa Thu Vàng',
      icon: '🍁',
      bgElements: ['🍂', '🌰', '🎃'],
      bgGradient: 'from-orange-500 via-red-600 to-orange-700',
      events: [
        { date: '2/9', title: 'Quốc khánh', description: 'Ngày độc lập của nước Việt Nam - Ngày vui mừng của cả dân tộc', icon: '🎊' },
        { date: '10/9', title: 'Ngày thành lập Mặt trận Tổ quốc Việt Nam', description: 'Tổ chức chính trị - xã hội rộng lớn nhất của nhân dân', icon: '🤝' },
      ],
      message: 'Tháng của độc lập và tự do - Quốc khánh và sự đoàn kết dân tộc, niềm tự hào Việt Nam.',
      effectType: 'autumn',
    },
    {
      month: 10,
      name: 'Tháng Mười',
      title: 'Chuẩn Bị Mùa Đông',
      icon: '🎃',
      bgElements: ['🦇', '👻', '🍬'],
      bgGradient: 'from-purple-500 via-indigo-600 to-purple-700',
      events: [
        { date: '10/10', title: 'Ngày Giải phóng Thủ đô', description: 'Giải phóng Hà Nội - Thủ đô ngàn năm văn hiến', icon: '🏛️' },
        { date: '20/10', title: 'Ngày Phụ nữ Việt Nam', description: 'Tôn vinh phụ nữ Việt Nam - Những người mẹ, người chị đảm đang', icon: '💐' },
      ],
      message: 'Tháng tôn vinh phụ nữ Việt Nam và kỷ niệm Giải phóng Thủ đô - niềm tự hào dân tộc.',
      effectType: 'halloween',
    },
    {
      month: 11,
      name: 'Tháng Mười Một',
      title: 'Mùa Tạ Ơn',
      icon: '🦃',
      bgElements: ['🍗', '🥧', '🌽'],
      bgGradient: 'from-amber-600 via-orange-600 to-amber-800',
      events: [
        { date: '20/11', title: 'Ngày Nhà giáo Việt Nam', description: 'Tôn vinh các thầy cô giáo - Những người lái đò thầm lặng', icon: '👨‍🏫' },
        { date: '23/11', title: 'Ngày thành lập Hội Chữ thập đỏ Việt Nam', description: 'Kỷ niệm ngày thành lập tổ chức nhân đạo lớn nhất', icon: '❤️' },
      ],
      message: 'Tháng tri ân thầy cô và những người làm công tác nhân đạo - những người đã dạy dỗ và giúp đỡ mọi người.',
      effectType: 'thanksgiving',
    },
    {
      month: 12,
      name: 'Tháng Mười Hai',
      title: 'Mùa Giáng Sinh',
      icon: '🎄',
      bgElements: ['🎅', '🦌', '🎁', '❄️', '⭐'],
      bgGradient: 'from-red-600 via-green-600 to-red-800',
      events: [
        { date: '8/12', title: 'Lễ Đức Mẹ Vô Nhiễm', description: 'Đức Mẹ được bảo vệ khỏi tội nguyên tổ', icon: '👼' },
        { date: '24/12', title: 'Đêm Giáng Sinh', description: 'Đêm thiêng liêng nhất trong năm', icon: '⭐' },
        { date: '25/12', title: 'Lễ Giáng Sinh', description: 'Chúa Giêsu giáng sinh - Ngày vui mừng nhất', icon: '🎄' },
        { date: '31/12', title: 'Giao Thừa', description: 'Kết thúc năm cũ, chào đón năm mới', icon: '🎆' },
      ],
      message: 'Tháng đẹp nhất trong năm, nơi tình yêu và niềm vui lan tỏa khắp nơi.',
      effectType: 'christmas',
    },
  ]

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll()
    } else {
      enableBodyScroll()
    }
    return () => {
      enableBodyScroll()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setShowCalendarBox(false)
      setShowCalendar(false)
      setCurrentMonth(0)
      setShowFinalMessage(false)
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
      return
    }

    setShowCalendarBox(true)
    
    const timer = setTimeout(() => {
      setShowCalendarBox(false)
      setShowCalendar(true)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!showCalendar || showFinalMessage) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
      return
    }

    const startAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }

      if (currentMonth < monthlyEvents.length - 1) {
        autoPlayRef.current = setInterval(() => {
          setCurrentMonth((prev) => {
            const next = prev + 1
            if (next < monthlyEvents.length) {
              return next
            } else {
              if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
                autoPlayRef.current = null
              }
              setTimeout(() => {
                setShowFinalMessage(true)
              }, 2000)
              return prev
            }
          })
        }, 7000)
      } else if (currentMonth === monthlyEvents.length - 1) {
        const timer = setTimeout(() => {
          setShowFinalMessage(true)
        }, 7000)
        return () => clearTimeout(timer)
      }
    }

    const timeoutId = setTimeout(() => {
      startAutoPlay()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }
  }, [showCalendar, showFinalMessage, currentMonth, monthlyEvents.length])

  const nextMonth = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
    setCurrentMonth((prev) => {
      const newMonth = prev + 1
      if (newMonth < monthlyEvents.length) {
        setTimeout(() => {
          if (showCalendar && !showFinalMessage && newMonth < monthlyEvents.length - 1) {
            autoPlayRef.current = setInterval(() => {
              setCurrentMonth((prevMonth) => {
                const next = prevMonth + 1
                if (next < monthlyEvents.length) {
                  return next
                } else {
                  if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current)
                    autoPlayRef.current = null
                  }
                  setTimeout(() => {
                    setShowFinalMessage(true)
                  }, 2000)
                  return prevMonth
                }
              })
            }, 7000)
          }
        }, 100)
        return newMonth
      }
      return prev
    })
  }

  const prevMonth = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
    setCurrentMonth((prev) => {
      if (prev > 0) {
        const newMonth = prev - 1
        setTimeout(() => {
          if (showCalendar && !showFinalMessage && newMonth < monthlyEvents.length - 1) {
            autoPlayRef.current = setInterval(() => {
              setCurrentMonth((prevMonth) => {
                const next = prevMonth + 1
                if (next < monthlyEvents.length) {
                  return next
                } else {
                  if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current)
                    autoPlayRef.current = null
                  }
                  setTimeout(() => {
                    setShowFinalMessage(true)
                  }, 2000)
                  return prevMonth
                }
              })
            }, 7000)
          }
        }, 100)
        return newMonth
      }
      return prev
    })
  }

  const goToMonth = (index) => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
    setCurrentMonth(index)
    setTimeout(() => {
      if (showCalendar && !showFinalMessage && index < monthlyEvents.length - 1) {
        autoPlayRef.current = setInterval(() => {
          setCurrentMonth((prev) => {
            const next = prev + 1
            if (next < monthlyEvents.length) {
              return next
            } else {
              if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
                autoPlayRef.current = null
              }
              setTimeout(() => {
                setShowFinalMessage(true)
              }, 2000)
              return prev
            }
          })
          }, 7000)
      }
    }, 100)
  }

  const handleClose = () => {
    enableBodyScroll()
    onClose()
  }

  const currentData = monthlyEvents[currentMonth]

  const Sparkle = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        boxShadow: '0 0 10px rgba(255, 255, 0, 0.8)',
      }}
    />
  )

  const renderMonthEffect = (effectType) => {
    switch (effectType) {
      case 'fireworks':
        return (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeOut',
                }}
              >
                🎆
              </motion.div>
            ))}
          </>
        )
      case 'hearts':
        return (
          <>
            {Array.from({ length: 25 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                💕
              </motion.div>
            ))}
          </>
        )
      case 'flowers':
        return (
          <>
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.5, 1, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              >
                🌸
              </motion.div>
            ))}
          </>
        )
      case 'eggs':
        return (
          <>
            {Array.from({ length: 15 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 1,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: 'easeInOut',
                }}
              >
                🥚
              </motion.div>
            ))}
          </>
        )
      case 'roses':
        return (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.3, 0.8],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                🌹
              </motion.div>
            ))}
          </>
        )
      case 'sun':
        return (
          <>
            {Array.from({ length: 40 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                ☀️
              </motion.div>
            ))}
          </>
        )
      case 'waves':
        return (
          <>
            {Array.from({ length: 25 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, 30, 0],
                  opacity: [0.4, 0.8, 0.4],
                  x: [0, 50, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                🌊
              </motion.div>
            ))}
          </>
        )
      case 'leaves':
        return (
          <>
            {Array.from({ length: 35 }, (_, i) => {
              const startX = Math.random() * 100
              const driftAmount = (Math.random() - 0.5) * 40
              const endX = startX + driftAmount
              return (
                <motion.div
                  key={i}
                  className="absolute text-xl"
                  initial={{ 
                    y: -100, 
                    x: startX + '%', 
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    y: window.innerHeight + 200,
                    opacity: [0, 0.8, 1, 0.8, 0],
                    x: [startX + '%', endX + '%'],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: 'linear',
                  }}
                  style={{
                    left: startX + '%',
                  }}
                >
                  🍂
                </motion.div>
              )
            })}
          </>
        )
      case 'autumn':
        return (
          <>
            {Array.from({ length: 30 }, (_, i) => {
              const startX = Math.random() * 100
              const driftAmount = (Math.random() - 0.5) * 50
              const endX = startX + driftAmount
              return (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ 
                    y: -100, 
                    x: startX + '%', 
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    y: window.innerHeight + 200,
                    opacity: [0, 0.9, 1, 0.9, 0],
                    x: [startX + '%', endX + '%'],
                    rotate: [0, 720 * (Math.random() > 0.5 ? 1 : -1)],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'linear',
                  }}
                  style={{
                    left: startX + '%',
                  }}
                >
                  🍁
                </motion.div>
              )
            })}
          </>
        )
      case 'halloween':
        return (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.5, 0.8],
                  rotate: [0, 360],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                🎃
              </motion.div>
            ))}
          </>
        )
      case 'thanksgiving':
        return (
          <>
            {Array.from({ length: 15 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                🦃
              </motion.div>
            ))}
          </>
        )
      case 'christmas':
        return (
          <>
            {Array.from({ length: 200 }, (_, i) => {
              const startX = Math.random() * 100
              const driftAmount = (Math.random() - 0.5) * 30
              const endX = startX + driftAmount
              return (
                <motion.div
                  key={i}
                  className="absolute text-2xl md:text-3xl"
                  initial={{ 
                    y: -100, 
                    x: startX + '%', 
                    opacity: 0 
                  }}
                  animate={{
                    y: window.innerHeight + 200,
                    opacity: [0, 0.8, 1, 0.8, 0],
                    x: [startX + '%', endX + '%'],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: 'linear',
                  }}
                  style={{
                    left: startX + '%',
                  }}
                >
                  ❄️
                </motion.div>
              )
            })}
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              >
                ⭐
              </motion.div>
            ))}
          </>
        )
      default:
        return null
    }
  }

  if (showFinalMessage) {
    return <FinalYearMessage onClose={handleClose} />
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-[100]"
              style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
            />
          )}

          {showCalendarBox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-[100] flex items-center justify-center"
              style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: [0, 1.2, 1], rotate: [-180, 0] }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-9xl md:text-[300px] relative"
                  style={{
                    filter: 'drop-shadow(0 0 50px rgba(59, 130, 246, 0.8))',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, y: 0 }}
                    animate={{ 
                      scale: [0, 1.3, 1],
                      y: [0, -100, 0],
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: 0.5,
                      ease: 'easeOut'
                    }}
                    className="absolute inset-0 blur-2xl"
                    style={{
                      filter: 'drop-shadow(0 0 80px rgba(59, 130, 246, 1))',
                    }}
                  >
                    📅
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    📅
                  </motion.div>
                </motion.div>
                {Array.from({ length: 30 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 200}%`,
                      top: `${50 + (Math.random() - 0.5) * 200}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.8 + i * 0.05,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {showCalendar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[105]"
              style={{ 
                height: '100vh', 
                width: '100vw', 
                overflow: 'hidden',
                perspective: '2000px',
              }}
            >
              <AnimatePresence mode="wait">
                {monthlyEvents.map((monthData, index) => (
                  index === currentMonth && (
                    <motion.div
                      key={monthData.month}
                      initial={{ 
                        opacity: 0, 
                        rotateY: 90,
                        scale: 0.95,
                        transformOrigin: 'right center',
                        x: 100,
                      }}
                      animate={{ 
                        opacity: 1, 
                        rotateY: 0,
                        scale: 1,
                        transformOrigin: 'right center',
                        x: 0,
                      }}
                      exit={{ 
                        opacity: 0, 
                        rotateY: -90,
                        scale: 0.95,
                        transformOrigin: 'left center',
                        x: -100,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className={`fixed inset-0 bg-gradient-to-br ${monthData.bgGradient} flex flex-col`}
                      style={{ 
                        height: '100vh', 
                        width: '100vw', 
                        overflow: 'hidden',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {renderMonthEffect(monthData.effectType)}
                        {Array.from({ length: 40 }, (_, i) => (
                          <Sparkle key={`sparkle-${i}`} delay={i * 0.1} />
                        ))}
                      </div>

                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClose}
                        className="fixed top-6 right-6 z-[10001] bg-noel-red hover:bg-red-700 text-white rounded-full p-4 text-2xl shadow-2xl transition-colors"
                        style={{ top: '24px', right: '24px', zIndex: 10001 }}
                        title="Đóng"
                      >
                        ✕
                      </motion.button>

                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 overflow-hidden" style={{ paddingTop: '8vh', paddingBottom: '15vh' }}>
                        <div className="relative w-full max-w-6xl h-full flex flex-col justify-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="absolute left-1/2 top-20 bottom-0 w-1 bg-white bg-opacity-30 transform -translate-x-1/2 z-0"
                            style={{
                              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
                            }}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-4 relative z-10"
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.15, 1],
                                rotate: [0, 10, -10, 0],
                                filter: [
                                  'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))',
                                  'drop-shadow(0 0 60px rgba(59, 130, 246, 0.9))',
                                  'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))',
                                ],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="text-4xl md:text-6xl mb-2 inline-block"
                            >
                              {monthData.icon}
                            </motion.div>
                            <motion.h2
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="text-2xl md:text-4xl font-bold text-white mb-1"
                              style={{
                                textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(59, 130, 246, 0.7)',
                                letterSpacing: '1px',
                              }}
                            >
                              {monthData.name}
                            </motion.h2>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="text-base md:text-xl text-white font-light italic"
                              style={{
                                textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                              }}
                            >
                              {monthData.title}
                            </motion.p>
                          </motion.div>

                          <div className="relative space-y-4 mb-4 flex-1 overflow-hidden">
                            {monthData.events.map((event, eventIndex) => {
                              const isLeft = eventIndex % 2 === 0
                              return (
                                <motion.div
                                  key={eventIndex}
                                  initial={{ opacity: 0, x: isLeft ? -100 : 100, scale: 0.8 }}
                                  animate={{ opacity: 1, x: 0, scale: 1 }}
                                  transition={{ delay: 0.4 + eventIndex * 0.15, type: 'spring', stiffness: 80 }}
                                  className={`flex items-center gap-4 md:gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} relative z-10`}
                                >
                                  <div className={`flex-1 ${isLeft ? 'text-right pr-3 md:pr-6' : 'text-left pl-3 md:pl-6'}`}>
                                    <motion.div
                                      whileHover={{ scale: 1.03 }}
                                      className="inline-block w-full"
                                    >
                                      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4 border-2 border-white border-opacity-50 shadow-xl transition-all"
                                        style={{
                                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1)',
                                        }}
                                      >
                                        <div className={`flex items-center gap-2 md:gap-3 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                                          <motion.div
                                            animate={{
                                              rotate: [0, 360],
                                              scale: [1, 1.15, 1],
                                            }}
                                            transition={{
                                              duration: 8,
                                              repeat: Infinity,
                                              ease: 'linear',
                                            }}
                                            className="text-3xl md:text-5xl flex-shrink-0"
                                            style={{
                                              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))',
                                            }}
                                          >
                                            {event.icon === '🇻🇳' ? <VietnamFlag /> : event.icon}
                                          </motion.div>
                                          <div className="flex-1 min-w-0">
                                            <motion.div
                                              whileHover={{ scale: 1.05 }}
                                              className={`inline-block mb-1.5 ${isLeft ? 'ml-auto' : 'mr-auto'}`}
                                            >
                                              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-2.5 md:px-3 py-1 md:py-1.5 text-white font-bold text-xs shadow-lg">
                                                {event.date}
                                              </span>
                                            </motion.div>
                                            <h4 className="text-white font-bold text-base md:text-lg mb-1.5 break-words" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>
                                              {event.title}
                                            </h4>
                                            <p className="text-white text-xs md:text-sm opacity-95 leading-relaxed break-words" style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.4)' }}>
                                              {event.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  </div>
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + eventIndex * 0.15, type: 'spring', stiffness: 200 }}
                                    className="relative z-20 flex-shrink-0"
                                  >
                                    <div className="w-10 h-10 md:w-14 md:h-14 bg-white bg-opacity-40 backdrop-blur-md rounded-full border-3 border-white border-opacity-60 flex items-center justify-center shadow-xl"
                                      style={{
                                        boxShadow: '0 0 25px rgba(255, 255, 255, 0.5)',
                                      }}
                                    >
                                      <motion.div
                                        animate={{
                                          rotate: [0, 360],
                                        }}
                                        transition={{
                                          duration: 5,
                                          repeat: Infinity,
                                          ease: 'linear',
                                        }}
                                        className="text-lg md:text-xl"
                                      >
                                        {event.icon === '🇻🇳' ? <VietnamFlag /> : event.icon}
                                      </motion.div>
                                    </div>
                                  </motion.div>
                                  <div className={`flex-1 ${isLeft ? 'text-left pl-3 md:pl-6' : 'text-right pr-3 md:pr-6'}`}></div>
                                </motion.div>
                              )
                            })}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                            className="relative z-10 mt-3"
                          >
                            <div className="bg-gradient-to-r from-transparent via-white/20 to-transparent backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4 border-2 border-white border-opacity-40 shadow-xl relative overflow-hidden"
                              style={{
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                              }}
                            >
                              <motion.div
                                animate={{
                                  scale: [1, 1.15, 1],
                                  opacity: [0.2, 0.35, 0.2],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                                className="absolute top-2 right-2 text-2xl md:text-3xl"
                              >
                                💫
                              </motion.div>
                              <div className="flex items-center justify-center gap-2 md:gap-3">
                                <motion.div
                                  animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                  className="text-xl md:text-2xl"
                                >
                                  ✨
                                </motion.div>
                                <p className="text-white text-sm md:text-base leading-relaxed italic text-center font-light break-words" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}>
                                  "{monthData.message}"
                                </p>
                                <motion.div
                                  animate={{
                                    rotate: [0, -360],
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                  className="text-xl md:text-2xl"
                                >
                                  ✨
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 z-[5] px-4" style={{ paddingBottom: '6vh' }}>
                        <div className="flex justify-center gap-2 items-center">
                          {monthlyEvents.map((_, index) => (
                            <motion.button
                              key={index}
                              onClick={() => goToMonth(index)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className={`rounded-full transition-all ${
                                index === currentMonth
                                  ? 'bg-white w-8 h-2'
                                  : 'bg-white bg-opacity-40 hover:bg-opacity-60 w-2 h-2'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
})

export default YearlyEventsPortal
