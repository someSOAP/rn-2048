import { mergeRow } from '../array'
import { ICell } from '@/types'

describe('mergeRow', () => {
  it('merges two values', () => {
    const expectedValues: ICell[] = [
      {
        value: 2,
        x: 0,
        y: 1,
        merged: false,
        next: { value: 4, merged: true, x: 0, y: 0 },
      },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { value: 0, merged: true, x: 0, y: 0 },
      },
    ]

    const result = mergeRow([
      { value: 2, x: 0, y: 1, merged: false },
      { value: 2, x: 1, y: 1, merged: false },
      { value: 0, x: 2, y: 1, merged: false },
      { value: 0, x: 3, y: 1, merged: false },
    ])

    expect(result).toEqual(expectedValues)
  })

  it('merges two of tree values', () => {
    const expectedValues: ICell[] = [
      {
        value: 4,
        x: 0,
        y: 1,
        merged: false,
        next: { value: 4, merged: false, x: 0, y: 0 },
      },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { value: 4, merged: true, x: 1, y: 1 },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { value: 0, merged: true, x: 1, y: 1 },
      },
    ]

    const result = mergeRow([
      { value: 4, x: 0, y: 1, merged: false },
      { value: 2, x: 1, y: 1, merged: false },
      { value: 2, x: 2, y: 1, merged: false },
      { value: 0, x: 3, y: 1, merged: false },
    ])

    expect(result).toEqual(expectedValues)
  })
})
