import { describe, it, expect } from 'vitest'
import { cn } from './src/lib/utils'

describe('cn utility', () => {
  it('should merge tailwind classes correctly', () => {
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('text-red-500', true && 'text-blue-500', false && 'text-green-500')
    expect(result).toBe('text-blue-500')
  })

  it('should return empty string for no classes', () => {
    const result = cn()
    expect(result).toBe('')
  })
})
