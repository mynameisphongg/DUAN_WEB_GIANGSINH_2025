import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import LetterContent from '../LetterContent'

describe('LetterContent', () => {
  it('renders the letter title', () => {
    render(<LetterContent onClose={vi.fn()} />)
    const title = screen.getByText(/Lời Chúc Giáng Sinh/i)
    expect(title).toBeInTheDocument()
  })

  it('renders wishes', () => {
    render(<LetterContent onClose={vi.fn()} />)
    const wish = screen.getByText(/Chúc bạn và gia đình một Giáng Sinh/i)
    expect(wish).toBeInTheDocument()
  })

  it('renders close button', () => {
    render(<LetterContent onClose={vi.fn()} />)
    const closeButton = screen.getByText('✕')
    expect(closeButton).toBeInTheDocument()
  })
})

