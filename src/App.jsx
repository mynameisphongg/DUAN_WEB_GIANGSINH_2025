import { useState, useCallback, lazy, Suspense } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import Snowfall from './components/Snowfall'
import AudioPlayer from './components/AudioPlayer'
import ScrollToTop from './components/ScrollToTop'

const ChristmasPortal = lazy(() => import('./components/ChristmasPortal'))
const YearlyEventsPortal = lazy(() => import('./components/YearlyEventsPortal'))
import ParticleTree from './components/ParticleTree'

function App() {
  const [isPortalOpen, setIsPortalOpen] = useState(false)
  const [isYearlyEventsOpen, setIsYearlyEventsOpen] = useState(false)
  const [isTreeOpen, setIsTreeOpen] = useState(false)

  const handleOpenPortal = useCallback(() => {
    setIsPortalOpen(true)
  }, [])

  const handleClosePortal = useCallback(() => {
    setIsPortalOpen(false)
  }, [])

  const handleOpenYearlyEvents = useCallback(() => {
    setIsYearlyEventsOpen(true)
  }, [])

  const handleCloseYearlyEvents = useCallback(() => {
    setIsYearlyEventsOpen(false)
  }, [])

  const handleOpenTree = useCallback(() => {
    setIsTreeOpen(true)
  }, [])

  const handleCloseTree = useCallback(() => {
    setIsTreeOpen(false)
  }, [])

  return (
    <div className="bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900 relative">
      <Snowfall />
      <div className="relative z-10">
        <Header />
        <MainContent 
          onOpenPortal={handleOpenPortal} 
          onOpenYearlyEvents={handleOpenYearlyEvents}
          onOpenTree={handleOpenTree}
        />
        <Footer />
      </div>
      <AudioPlayer isYearlyEventsOpen={isYearlyEventsOpen} />
      <ScrollToTop />
      <Suspense fallback={null}>
        {isPortalOpen && <ChristmasPortal isOpen={isPortalOpen} onClose={handleClosePortal} />}
        {isYearlyEventsOpen && <YearlyEventsPortal isOpen={isYearlyEventsOpen} onClose={handleCloseYearlyEvents} />}
        {isTreeOpen && <ParticleTree isOpen={isTreeOpen} onClose={handleCloseTree} />}
      </Suspense>
    </div>
  )
}

export default App
