import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Snowman from '../Snowman'

describe('Snowman', () => {
  it('renders without crashing', () => {
    const { container } = render(<Snowman />)
    expect(container).toBeTruthy()
  })
})

