import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders the main title', () => {
    render(<Header />)
    const title = screen.getByText(/Chào Mừng Giáng Sinh/i)
    expect(title).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Header />)
    const subtitle = screen.getByText(/Mùa của Yêu Thương và Hạnh Phúc/i)
    expect(subtitle).toBeInTheDocument()
  })
})

