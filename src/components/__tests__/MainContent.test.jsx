import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MainContent from '../MainContent'

describe('MainContent', () => {
  it('renders the main heading', () => {
    render(<MainContent />)
    const heading = screen.getByText(/Đêm Noel Huyền Bí/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<MainContent />)
    const description = screen.getByText(/Khung cảnh Giáng sinh huyền bí/i)
    expect(description).toBeInTheDocument()
  })

  it('renders the action button', () => {
    render(<MainContent />)
    const button = screen.getByText(/Khám Phá/i)
    expect(button).toBeInTheDocument()
  })

  it('renders the share love section', () => {
    render(<MainContent />)
    const shareSection = screen.getByText(/Chia Sẻ Yêu Thương/i)
    expect(shareSection).toBeInTheDocument()
  })
})

