import { getActualGrid, moveRowRight } from '../array'
import { GridType, ICell } from '@/types'

describe('getActualGrid', () => {
  it('[8 4 2 2] left', () => {
    const expected = [
      [
        { x: 0, y: 0, value: 8, merged: false },
        { x: 1, y: 0, value: 4, merged: false },
        { x: 2, y: 0, value: 4, merged: true },
        { x: 3, y: 0, value: 0, merged: true },
      ],
    ]

    const result = getActualGrid([
      [
        {
          x: 0,
          y: 0,
          value: 8,
          merged: false,
          next: { x: 0, y: 0, value: 8, merged: false },
        },
        {
          x: 1,
          y: 0,
          value: 4,
          merged: false,
          next: { x: 1, y: 0, value: 4, merged: false },
        },
        {
          x: 2,
          y: 0,
          value: 2,
          merged: false,
          next: { x: 2, y: 0, value: 4, merged: true },
        },
        {
          x: 3,
          y: 0,
          value: 2,
          merged: false,
          next: { x: 3, y: 0, value: 0, merged: true },
        },
      ],
    ])

    expect(result).toEqual(expected)
  })

  it('[8 2 4 4 ] right', () => {
    const expectedResult: GridType = [
      [
        { x: 0, y: 0, value: 0, merged: true },
        { x: 1, y: 0, value: 8, merged: false },
        { x: 2, y: 0, value: 2, merged: false },
        { x: 3, y: 0, value: 8, merged: true },
      ],
    ]

    const initialValues = [
      [
        {
          value: 8,
          x: 0,
          y: 0,
          merged: false,
          next: { merged: false, x: 1, value: 8, y: 0 },
        },
        {
          value: 2,
          x: 1,
          y: 0,
          merged: false,
          next: { merged: false, x: 2, y: 0, value: 2 },
        },
        {
          value: 4,
          x: 2,
          y: 0,
          merged: false,
          next: { merged: true, x: 3, y: 0, value: 0 },
        },
        {
          value: 4,
          x: 3,
          y: 0,
          merged: false,
          next: { merged: true, x: 3, y: 0, value: 8 },
        },
      ],
    ]

    const result = getActualGrid(initialValues)

    expect(result).toEqual(expectedResult)
  })
})
