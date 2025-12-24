import { memo, useRef, useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const enableBodyScroll = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

function createCircleTexture(size = 128) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)')
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.7)')
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  texture.flipY = false
  return texture
}

function ParticleTree({ isOpen, onClose }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const particlesRef = useRef(null)
  const topBurstRef = useRef(null)
  const groundParticlesRef = useRef(null)
  const lightsRef = useRef([])
  const animationFrameRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [treeProgress, setTreeProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef(null)

  const count = 4000
  const height = 7
  const baseRadius = 2.8

  const { positions, colors, targetPositions, startPositions, circleTexture, topBurstPositions, topBurstColors, groundPositions, groundColors, lightPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const targetPositions = new Float32Array(count * 3)
    const startPositions = new Float32Array(count * 3)

    const white = new THREE.Color(0xffffff)
    const purple = new THREE.Color(0xa855f7)
    const lightPurple = new THREE.Color(0xc084fc)

    for (let i = 0; i < count; i++) {
      const t = Math.random()
      const y = t * height
      const radius = (1 - t * 0.9) * baseRadius * (0.7 + Math.random() * 0.3)
      const angle = Math.random() * Math.PI * 2

      const targetX = Math.cos(angle) * radius
      const targetY = y - height / 2
      const targetZ = Math.sin(angle) * radius

      targetPositions[i * 3] = targetX
      targetPositions[i * 3 + 1] = targetY
      targetPositions[i * 3 + 2] = targetZ

      const startX = (Math.random() - 0.5) * 10
      const startY = -height / 2 - 5
      const startZ = (Math.random() - 0.5) * 10

      startPositions[i * 3] = startX
      startPositions[i * 3 + 1] = startY
      startPositions[i * 3 + 2] = startZ

      positions[i * 3] = startX
      positions[i * 3 + 1] = startY
      positions[i * 3 + 2] = startZ

      let color = new THREE.Color()
      if (t < 0.7) {
        const mix = t / 0.7
        color.lerpColors(purple, lightPurple, mix)
      } else {
        const mix = (t - 0.7) / 0.3
        color.lerpColors(lightPurple, white, mix)
      }

      const randomOffset = (Math.random() - 0.5) * 0.2
      color.offsetHSL(0, 0, randomOffset)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const topBurstCount = 300
    const topBurstPositions = new Float32Array(topBurstCount * 3)
    const topBurstColors = new Float32Array(topBurstCount * 3)
    for (let i = 0; i < topBurstCount; i++) {
      const radius = Math.random() * 0.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      topBurstPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      topBurstPositions[i * 3 + 1] = height / 2 + radius * Math.cos(phi)
      topBurstPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
      
      const whiteColor = new THREE.Color(0xffffff)
      topBurstColors[i * 3] = whiteColor.r
      topBurstColors[i * 3 + 1] = whiteColor.g
      topBurstColors[i * 3 + 2] = whiteColor.b
    }

    const groundCount = 2000
    const groundPositions = new Float32Array(groundCount * 3)
    const groundColors = new Float32Array(groundCount * 3)
    for (let i = 0; i < groundCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 4.5
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = -height / 2 - 0.5 + Math.random() * 0.5
      
      groundPositions[i * 3] = x
      groundPositions[i * 3 + 1] = y
      groundPositions[i * 3 + 2] = z
      
      let color = new THREE.Color()
      if (Math.random() > 0.5) {
        color.copy(purple)
      } else {
        color.copy(lightPurple)
      }
      
      groundColors[i * 3] = color.r
      groundColors[i * 3 + 1] = color.g
      groundColors[i * 3 + 2] = color.b
    }

    const lightCount = 30
    const lightPositions = []
    for (let i = 0; i < lightCount; i++) {
      const t = Math.random()
      const y = t * height
      const radius = (1 - t * 0.9) * baseRadius * (0.6 + Math.random() * 0.4)
      const angle = Math.random() * Math.PI * 2
      
      lightPositions.push({
        x: Math.cos(angle) * radius,
        y: y - height / 2,
        z: Math.sin(angle) * radius,
        delay: Math.random() * 2,
      })
    }

    const texture = createCircleTexture(128)
    return { positions, colors, targetPositions, startPositions, circleTexture: texture, topBurstPositions, topBurstColors, groundPositions, groundColors, lightPositions }
  }, [count, height, baseRadius])

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      map: circleTexture,
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    const topBurstGeometry = new THREE.BufferGeometry()
    topBurstGeometry.setAttribute('position', new THREE.BufferAttribute(topBurstPositions, 3))
    topBurstGeometry.setAttribute('color', new THREE.BufferAttribute(topBurstColors, 3))
    const topBurstMaterial = new THREE.PointsMaterial({
      map: circleTexture,
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const topBurst = new THREE.Points(topBurstGeometry, topBurstMaterial)
    scene.add(topBurst)
    topBurstRef.current = topBurst

    const groundGeometry = new THREE.BufferGeometry()
    groundGeometry.setAttribute('position', new THREE.BufferAttribute(groundPositions, 3))
    groundGeometry.setAttribute('color', new THREE.BufferAttribute(groundColors, 3))
    const groundMaterial = new THREE.PointsMaterial({
      map: circleTexture,
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const groundParticles = new THREE.Points(groundGeometry, groundMaterial)
    scene.add(groundParticles)
    groundParticlesRef.current = groundParticles

    const lights = []
    if (isComplete) {
      lightPositions.forEach((pos, i) => {
        const light = new THREE.PointLight(0xffff00, 1)
        light.position.set(pos.x, pos.y, pos.z)
        scene.add(light)
        lights.push({ light, delay: pos.delay })
      })
    }
    lightsRef.current = lights

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xffffff, 1.5)
    pointLight1.position.set(0, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xa855f7, 1)
    pointLight2.position.set(0, -5, 5)
    scene.add(pointLight2)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 600
    const starsPositions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 30
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 30
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3))
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    let lastTime = 0
    const batchSize = 100
    let currentBatch = 0

    const animate = (currentTime) => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime / 1000
      }

      const elapsed = (currentTime / 1000) - startTimeRef.current
      const time = currentTime / 1000

      const positions = particles.geometry.attributes.position
      const deltaTime = currentTime - lastTime

      if (deltaTime >= 16) {
        const startIdx = currentBatch * batchSize
        const endIdx = Math.min(startIdx + batchSize, count)

        for (let i = startIdx; i < endIdx; i++) {
          const delay = i * 0.00015
          const particleProgress = Math.max(0, Math.min(1, (elapsed - delay) * treeProgress * 4))
          const easedProgress = 1 - Math.pow(1 - particleProgress, 1.5)

          if (particleProgress > 0) {
            positions.array[i * 3] = startPositions[i * 3] + (targetPositions[i * 3] - startPositions[i * 3]) * easedProgress
            positions.array[i * 3 + 1] = startPositions[i * 3 + 1] + (targetPositions[i * 3 + 1] - startPositions[i * 3 + 1]) * easedProgress
            positions.array[i * 3 + 2] = startPositions[i * 3 + 2] + (targetPositions[i * 3 + 2] - startPositions[i * 3 + 2]) * easedProgress
          }
        }

        currentBatch = (currentBatch + 1) % Math.ceil(count / batchSize)
        positions.needsUpdate = true
        lastTime = currentTime
      }

      particles.rotation.y += 0.0004
      particles.rotation.x = Math.sin(elapsed * 0.05) * 0.02
      stars.rotation.y += 0.0003

      material.opacity = 0.95 + Math.sin(time * 3) * 0.05
      topBurstMaterial.opacity = 1 + Math.sin(time * 4) * 0.2

      topBurst.rotation.y += 0.002
      topBurst.rotation.x += 0.001

      pointLight2.intensity = 1 + Math.sin(time * 2) * 0.3

      if (isComplete && lightsRef.current.length > 0) {
        lightsRef.current.forEach(({ light, delay }) => {
          light.intensity = 0.8 + Math.sin((time + delay) * 3) * 0.6
        })
      }

      renderer.render(scene, camera)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      lightsRef.current.forEach(({ light }) => {
        scene.remove(light)
        light.dispose()
      })
      if (renderer) {
        renderer.dispose()
      }
      if (geometry) {
        geometry.dispose()
      }
      if (material) {
        material.dispose()
      }
      if (topBurstGeometry) {
        topBurstGeometry.dispose()
      }
      if (topBurstMaterial) {
        topBurstMaterial.dispose()
      }
      if (groundGeometry) {
        groundGeometry.dispose()
      }
      if (groundMaterial) {
        groundMaterial.dispose()
      }
      if (circleTexture) {
        circleTexture.dispose()
      }
      if (starsGeometry) {
        starsGeometry.dispose()
      }
      if (starsMaterial) {
        starsMaterial.dispose()
      }
    }
  }, [isOpen, positions, colors, targetPositions, startPositions, circleTexture, count, treeProgress, topBurstPositions, topBurstColors, groundPositions, groundColors, lightPositions, isComplete])

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll()
      setIsGenerating(true)
      setTreeProgress(0)
      setIsComplete(false)
      startTimeRef.current = null
      
      const interval = setInterval(() => {
        setTreeProgress((prev) => {
          if (prev >= 1) {
            clearInterval(interval)
            setIsGenerating(false)
            setIsComplete(true)
            return 1
          }
          return prev + 0.012
        })
      }, 15)

      return () => clearInterval(interval)
    } else {
      enableBodyScroll()
      setTreeProgress(0)
      setIsGenerating(false)
      setIsComplete(false)
      startTimeRef.current = null
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 z-[100] overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />

        {isComplete && (
          <>
            {Array.from({ length: 40 }).map((_, i) => {
              const startX = Math.random() * window.innerWidth
              const startY = -20
              const endY = window.innerHeight + 20
              const duration = 3 + Math.random() * 2
              const delay = Math.random() * 2
              
              return (
                <motion.div
                  key={`snowflake-${i}`}
                  initial={{ 
                    x: startX,
                    y: startY,
                    opacity: 0.8,
                    scale: 0.5 + Math.random() * 0.5
                  }}
                  animate={{
                    x: startX + (Math.random() - 0.5) * 100,
                    y: endY,
                    opacity: [0.8, 1, 0.8, 0],
                    rotate: 360
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute z-20 pointer-events-none text-2xl"
                >
                  ❄️
                </motion.div>
              )
            })}

            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.2, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut'
                }}
                className="absolute z-20 pointer-events-none text-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
                }}
              >
                ⭐
              </motion.div>
            ))}
          </>
        )}

        <div className="absolute top-12 left-8 z-10 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold px-4"
            style={{
              color: '#ff0000',
              textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4)',
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))',
            }}
          >
            Giáng Sinh An Lành
          </motion.h1>
        </div>

        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-3">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTreeProgress(0)
              setIsGenerating(true)
              setIsComplete(false)
              startTimeRef.current = null
              const interval = setInterval(() => {
                setTreeProgress((prev) => {
                  if (prev >= 1) {
                    clearInterval(interval)
                    setIsGenerating(false)
                    setIsComplete(true)
                    return 1
                  }
                  return prev + 0.012
                })
              }, 15)
            }}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded-full text-base shadow-2xl transition-all flex items-center gap-2 backdrop-blur-sm whitespace-nowrap"
            style={{
              boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4), 0 0 20px rgba(147, 51, 234, 0.3)',
            }}
          >
            <span className="text-lg">🎄</span>
            <span>{isGenerating ? 'Đang tạo...' : 'Tạo Cây Thông Noel'}</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTreeProgress(0)
              setIsGenerating(false)
              setIsComplete(false)
              startTimeRef.current = null
            }}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-2.5 px-6 rounded-full text-base shadow-2xl transition-all flex items-center gap-2 backdrop-blur-sm whitespace-nowrap"
            style={{
              boxShadow: '0 8px 32px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.3)',
            }}
          >
            <span className="text-lg">🗑️</span>
            <span>Xóa</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2.5 px-6 rounded-full text-base shadow-2xl transition-all flex items-center gap-2 backdrop-blur-sm whitespace-nowrap"
            style={{
              boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.3)',
            }}
          >
            <span className="text-lg">✅</span>
            <span>Hoàn Thành</span>
          </motion.button>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-white hover:text-red-400 transition-colors z-20 bg-black bg-opacity-40 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          ✕
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(ParticleTree)
