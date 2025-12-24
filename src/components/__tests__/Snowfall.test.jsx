import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Snowfall from '../Snowfall'

describe('Snowfall', () => {
  it('renders without crashing', () => {
    const { container } = render(<Snowfall />)
    expect(container).toBeTruthy()
  })
})

