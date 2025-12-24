import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Letter from '../Letter'

describe('Letter', () => {
  it('does not render when not visible', () => {
    const { container } = render(<Letter isVisible={false} onClose={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders letter when visible', () => {
    render(<Letter isVisible={true} onClose={vi.fn()} />)
    const letter = screen.getByText(/Nhấn để mở thư/i)
    expect(letter).toBeInTheDocument()
  })

  it('opens letter content when clicked', () => {
    render(<Letter isVisible={true} onClose={vi.fn()} />)
    const letterIcon = screen.getByText('✉️')
    fireEvent.click(letterIcon)
    const letterContent = screen.getByText(/Lời Chúc Giáng Sinh/i)
    expect(letterContent).toBeInTheDocument()
  })
})

