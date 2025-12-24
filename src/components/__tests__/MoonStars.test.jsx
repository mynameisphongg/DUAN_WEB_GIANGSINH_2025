import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import MoonStars from '../MoonStars'

describe('MoonStars', () => {
  it('renders without crashing', () => {
    const { container } = render(<MoonStars />)
    expect(container).toBeTruthy()
  })
})

