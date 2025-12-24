import { useState, useRef, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AudioPlayer = memo(function AudioPlayer({ isYearlyEventsOpen = false }) {
  const songs = [
    { id: 'iDXRKHY7mJA', name: 'Last Christmas Remix' },
    { id: '95EKii01j8E', name: 'Last Christmas Chill' },
    { id: '6Cot10ipI54', name: 'Jingle Bell Rock - Glee Cast' },
    { id: 'QVNAlr07MXA', name: 'Mariah Carey - All I Want For Christmas Is You (Sped Up)' },
  ]

  const [currentSong, setCurrentSong] = useState(() => {
    const saved = localStorage.getItem('currentSongId')
    return songs.find(s => s.id === saved) || songs[0]
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('audioVolume')
    return saved ? parseInt(saved) : 50
  })
  const playerRef = useRef(null)
  const [playerReady, setPlayerReady] = useState(false)
  const [showMusicHint, setShowMusicHint] = useState(true)

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return
      
      try {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: currentSong.id,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            mute: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              console.log('YouTube player ready')
              setPlayerReady(true)
              if (event.target && event.target.setVolume) {
                event.target.setVolume(volume)
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false)
              }
            },
          },
        })
      } catch (error) {
        console.log('Init player error:', error)
      }
    }

    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        initPlayer()
      }
    } else if (window.YT && window.YT.Player) {
      initPlayer()
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy()
        } catch (error) {
          console.log('Destroy player error:', error)
        }
        playerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (playerRef.current && playerReady) {
      try {
        if (playerRef.current.setVolume && typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(volume)
        }
      } catch (error) {
        console.log('Set volume error:', error)
      }
    }
  }, [volume, playerReady])

  useEffect(() => {
    if (showMusicHint) {
      const timer = setTimeout(() => {
        setShowMusicHint(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showMusicHint])

  const handleDismissHint = () => {
    setShowMusicHint(false)
  }

  const selectSong = (song) => {
    console.log('Selecting song:', song.name)
    setCurrentSong(song)
    localStorage.setItem('currentSongId', song.id)
    if (playerRef.current && playerReady) {
      try {
        console.log('Loading video:', song.id)
        if (playerRef.current.loadVideoById && typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById(song.id)
          setTimeout(() => {
            if (playerRef.current && playerRef.current.playVideo && typeof playerRef.current.playVideo === 'function') {
              try {
                console.log('Playing video')
                playerRef.current.playVideo()
                setIsPlaying(true)
                localStorage.setItem('audioPlaying', 'true')
              } catch (error) {
                console.log('Play error:', error)
              }
            } else {
              console.log('playVideo function not available')
            }
          }, 1500)
        } else {
          console.log('loadVideoById function not available')
        }
      } catch (error) {
        console.log('Load video error:', error)
      }
    } else {
      console.log('Player not ready:', { player: !!playerRef.current, ready: playerReady })
    }
  }

  const togglePlay = () => {
    if (playerRef.current && playerReady) {
      try {
        if (isPlaying) {
          if (playerRef.current.pauseVideo && typeof playerRef.current.pauseVideo === 'function') {
            playerRef.current.pauseVideo()
            setIsPlaying(false)
            localStorage.setItem('audioPlaying', 'false')
          }
        } else {
          if (playerRef.current.playVideo && typeof playerRef.current.playVideo === 'function') {
            playerRef.current.playVideo()
            setIsPlaying(true)
            localStorage.setItem('audioPlaying', 'true')
          }
        }
      } catch (error) {
        console.log('Toggle play error:', error)
      }
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    localStorage.setItem('audioVolume', newVolume.toString())
    if (playerRef.current && playerReady) {
      try {
        if (playerRef.current.setVolume && typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(newVolume)
        }
      } catch (error) {
        console.log('Set volume error:', error)
      }
    }
  }

  return (
    <>
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div id="youtube-player" />
      </div>

      <AnimatePresence>
        {!isYearlyEventsOpen && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 z-[9999]" 
            style={{ position: 'fixed', top: '24px', right: '24px' }}
          >
            <motion.button
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShowPlaylist(!showPlaylist)
            handleDismissHint()
          }}
          className="bg-noel-red hover:bg-red-700 text-white rounded-full p-4 text-2xl shadow-2xl transition-colors relative"
          style={{ position: 'relative', zIndex: 9999 }}
          title="Mở danh sách nhạc"
        >
          🎵
          {isPlaying && (
            <motion.span
              className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        <AnimatePresence>
          {showMusicHint && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="absolute top-0 right-full mr-4 md:block hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl p-4 shadow-2xl border-2 border-white border-opacity-50 min-w-[200px] max-w-[250px]"
              style={{
                willChange: 'transform, opacity',
                zIndex: 10000,
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-3xl flex-shrink-0"
                >
                  🎄
                </motion.div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm mb-1">
                    🎵 Mở nhạc Giáng Sinh
                  </p>
                  <p className="text-white text-xs opacity-90">
                    Click vào icon để chọn nhạc và tạo không khí Noel nhé!
                  </p>
                </div>
                <button
                  onClick={handleDismissHint}
                  className="text-white hover:text-yellow-200 text-lg flex-shrink-0 transition-colors"
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>
              <motion.div
                className="absolute top-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-red-600"
                style={{ transform: 'translateY(-50%)' }}
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMusicHint && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 md:hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl p-4 shadow-2xl border-2 border-white border-opacity-50 w-[calc(100vw-3rem)] max-w-[280px]"
              style={{
                willChange: 'transform, opacity',
                zIndex: 10000,
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-3xl flex-shrink-0"
                >
                  🎄
                </motion.div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm mb-1">
                    🎵 Mở nhạc Giáng Sinh
                  </p>
                  <p className="text-white text-xs opacity-90">
                    Click vào icon để chọn nhạc và tạo không khí Noel nhé!
                  </p>
                </div>
                <button
                  onClick={handleDismissHint}
                  className="text-white hover:text-yellow-200 text-lg flex-shrink-0 transition-colors"
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-red-600"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-3 shadow-2xl border-2 border-white border-opacity-30 min-w-[200px]"
            >
              <div className="flex flex-col gap-2">
                <div className="text-white text-xs font-semibold mb-2 pb-2 border-b border-white border-opacity-20">
                  Chọn Nhạc
                </div>
                {songs.map((song) => (
                  <motion.button
                    key={song.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      selectSong(song)
                      setShowPlaylist(false)
                    }}
                    className={`text-left p-2 rounded-lg transition-all ${
                      currentSong.id === song.id
                        ? 'bg-noel-red text-white'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {currentSong.id === song.id && isPlaying ? '▶️' : '🎵'}
                      </span>
                      <span className="text-xs font-medium">{song.name}</span>
                    </div>
                  </motion.button>
                ))}
                
                <div className="mt-2 pt-2 border-t border-white border-opacity-20">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="bg-noel-red hover:bg-red-700 text-white rounded-full p-2 text-lg transition-colors"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </motion.button>
                    <span className="text-white text-xs flex-1 truncate">{currentSong.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs">🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-1.5 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`
                      }}
                    />
                    <span className="text-white text-xs w-8 text-right">
                      {volume}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default AudioPlayer
