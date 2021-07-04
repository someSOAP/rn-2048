import { getActualGrid } from '../array'

describe('getActualGrid', () => {
  it('[8 4 2 2]', () => {
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
})
