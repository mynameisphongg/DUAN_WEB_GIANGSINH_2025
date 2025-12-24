import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the footer message', () => {
    render(<Footer />)
    const message = screen.getByText(/Chúc bạn và gia đình một Giáng Sinh/i)
    expect(message).toBeInTheDocument()
  })

  it('renders the copyright text', () => {
    render(<Footer />)
    const copyright = screen.getByText(/© 2024 Noel Landing Page/i)
    expect(copyright).toBeInTheDocument()
  })
})

