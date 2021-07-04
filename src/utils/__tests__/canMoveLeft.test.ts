import { canMoveLeft } from '../array'

describe('canMoveLeft', () => {
  describe('two elements', () => {
    test('[0, 2]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 0, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
      ])

      expect(result).toBe(true)
    })

    test('[2, 0]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 0, merged: false },
      ])

      expect(result).toBe(false)
    })

    test('[2, 2]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
      ])

      expect(result).toBe(true)
    })

    test('[4, 2]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 4, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
      ])

      expect(result).toBe(false)
    })

    test('2 4', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 4, merged: false },
      ])

      expect(result).toBe(false)
    })
  })

  describe('three elements', () => {
    it('[0, 0, 2]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 0, merged: false },
        { x: 0, y: 0, value: 0, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
      ])

      expect(result).toBe(true)
    })

    it('[0, 2, 0]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 0, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 0, merged: false },
      ])

      expect(result).toBe(true)
    })

    it('[2, 0, 0]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 0, merged: false },
        { x: 0, y: 0, value: 0, merged: false },
      ])

      expect(result).toBe(false)
    })

    it('[2, 2, 2]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
      ])

      expect(result).toBe(true)
    })

    it('[2, 0, 2]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 2, merged: false },
        { x: 0, y: 0, value: 0, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
      ])

      expect(result).toBe(true)
    })

    it('[4, 0, 2]', () => {
      const result = canMoveLeft([
        { x: 0, y: 0, value: 4, merged: false },
        { x: 0, y: 0, value: 0, merged: false },
        { x: 0, y: 0, value: 2, merged: false },
      ])

      expect(result).toBe(true)
    })
  })

  describe('one element', () => {
    it('0', () => {
      const result = canMoveLeft([{ x: 0, y: 0, value: 0, merged: false }])

      expect(result).toBe(false)
    })
    it('2', () => {
      const result = canMoveLeft([{ x: 0, y: 0, value: 2, merged: false }])

      expect(result).toBe(false)
    })
  })
})
