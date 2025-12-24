import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ChristmasTree from '../ChristmasTree'

describe('ChristmasTree', () => {
  it('renders without crashing', () => {
    const { container } = render(<ChristmasTree />)
    expect(container).toBeTruthy()
  })
})

