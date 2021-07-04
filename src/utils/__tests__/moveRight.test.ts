import { moveRowRight } from '../array'
import { ICell } from '@/types'

describe('moveRowRight', () => {
  it('moves one cell without merge', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: false, y: 1, x: 3, value: 2 },
      },
      { value: 0, x: 2, y: 1, merged: false },
      { value: 0, x: 3, y: 1, merged: false },
    ]

    const rightMoved = moveRowRight(
      [
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 0, x: 2, y: 1, merged: false },
        { value: 0, x: 3, y: 1, merged: false },
      ],
      1
    )

    expect(rightMoved).toEqual(result)
  })

  it('moves two cells without merge', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { value: 2, x: 2, y: 1, merged: false },
      },
      {
        value: 4,
        x: 2,
        y: 1,
        merged: false,
        next: { value: 4, x: 3, y: 1, merged: false },
      },
      { value: 0, x: 3, y: 1, merged: false },
    ]

    const rightMoved = moveRowRight(
      [
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 4, x: 2, y: 1, merged: false },
        { value: 0, x: 3, y: 1, merged: false },
      ],
      1
    )

    expect(rightMoved).toEqual(result)
  })

  it('moves two cells with merge', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: true, y: 1, x: 3, value: 0 },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { merged: true, y: 1, x: 3, value: 4 },
      },
      { value: 0, x: 3, y: 1, merged: false },
    ]

    const rightMoved = moveRowRight(
      [
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 2, x: 2, y: 1, merged: false },
        { value: 0, x: 3, y: 1, merged: false },
      ],
      1
    )

    expect(rightMoved).toEqual(result)
  })

  it('moves tree cells with merging of two cells', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { value: 0, x: 2, y: 1, merged: true },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { value: 4, x: 2, y: 1, merged: true },
      },
      {
        value: 4,
        x: 3,
        y: 1,
        merged: false,
        next: { merged: false, value: 4, y: 1, x: 3 },
      },
    ]

    const rightMoved = moveRowRight(
      [
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 2, x: 2, y: 1, merged: false },
        { value: 4, x: 3, y: 1, merged: false },
      ],
      1
    )

    expect(rightMoved).toEqual(result)
  })

  it('8 2 4 4', () => {
    const result: ICell[] = [
      {
        value: 8,
        x: 0,
        y: 1,
        merged: false,
        next: { merged: false, x: 1, value: 8, y: 1 },
      },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: false, x: 2, y: 1, value: 2 },
      },
      {
        value: 4,
        x: 2,
        y: 1,
        merged: false,
        next: { merged: true, x: 3, y: 1, value: 0 },
      },
      {
        value: 4,
        x: 3,
        y: 1,
        merged: false,
        next: { merged: true, x: 3, y: 1, value: 8 },
      },
    ]

    const rightMoved = moveRowRight(
      [
        { value: 8, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 4, x: 2, y: 1, merged: false },
        { value: 4, x: 3, y: 1, merged: false },
      ],
      1
    )

    expect(rightMoved).toEqual(result)
  })
})
