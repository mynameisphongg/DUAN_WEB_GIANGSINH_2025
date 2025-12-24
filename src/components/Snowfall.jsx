import { memo } from 'react'
import ReactSnowfall from 'react-snowfall'

const Snowfall = memo(function Snowfall() {
  return (
    <ReactSnowfall
      snowflakeCount={30}
      speed={[0.5, 1.2]}
      wind={[-0.2, 0.2]}
      radius={[0.5, 2]}
      changeFrequency={300}
      color="rgba(255, 255, 255, 0.6)"
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        willChange: 'transform',
        contain: 'layout style paint',
        transform: 'translateZ(0)',
      }}
    />
  )
})

export default Snowfall

