import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Reindeer from '../Reindeer'

describe('Reindeer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Reindeer />)
    expect(container).toBeTruthy()
  })
})

