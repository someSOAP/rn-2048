import { moveRowRight, moveRowLeft, moveColUp, moveColDown } from '../array'
import { ICell } from '@/types'

describe('moveRowLeft', () => {
  it('0 2 4 0', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: false, x: 0, y: 1, value: 2 },
      },
      {
        value: 4,
        x: 2,
        y: 1,
        merged: false,
        next: { x: 1, merged: false, y: 1, value: 4 },
      },
      { value: 0, x: 3, y: 1, merged: false },
    ]

    const leftMoved = moveRowLeft(
      [
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 4, x: 2, y: 1, merged: false },
        { value: 0, x: 3, y: 1, merged: false },
      ],
      1
    )

    console.log(leftMoved)

    expect(leftMoved).toEqual(result)
  })

  it('0 2 2 0', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: true, x: 0, y: 1, value: 4 },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { x: 0, merged: true, y: 1, value: 0 },
      },
      { value: 0, x: 3, y: 1, merged: false },
    ]

    const leftMoved = moveRowLeft(
      [
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 2, x: 2, y: 1, merged: false },
        { value: 0, x: 3, y: 1, merged: false },
      ],
      1
    )

    console.log(leftMoved)

    expect(leftMoved).toEqual(result)
  })

  it('2 0 2 4', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: true, x: 0, y: 1, value: 4 },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { x: 0, merged: true, y: 1, value: 0 },
      },
      {
        value: 4,
        x: 3,
        y: 1,
        merged: false,
        next: { x: 1, y: 1, value: 4, merged: false },
      },
    ]

    const leftMoved = moveRowLeft(
      [
        { value: 2, x: 1, y: 1, merged: false },
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 2, y: 1, merged: false },
        { value: 4, x: 3, y: 1, merged: false },
      ],
      1
    )

    console.log(leftMoved)

    expect(leftMoved).toEqual(result)
  })

  it('0 2 2 4', () => {
    const result: ICell[] = [
      { value: 0, x: 0, y: 1, merged: false },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: true, x: 0, y: 1, value: 4 },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { x: 0, merged: true, y: 1, value: 0 },
      },
      {
        value: 4,
        x: 3,
        y: 1,
        merged: false,
        next: { x: 1, y: 1, value: 4, merged: false },
      },
    ]

    const leftMoved = moveRowLeft(
      [
        { value: 0, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 2, x: 2, y: 1, merged: false },
        { value: 4, x: 3, y: 1, merged: false },
      ],
      1
    )

    console.log(leftMoved)

    expect(leftMoved).toEqual(result)
  })

  it('4 2 2 0', () => {
    const result: ICell[] = [
      {
        value: 4,
        x: 0,
        y: 1,
        merged: false,
        next: { merged: false, y: 1, x: 0, value: 4 },
      },
      {
        value: 2,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: true, y: 1, x: 1, value: 4 },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { merged: true, y: 1, x: 1, value: 0 },
      },
      { value: 0, x: 3, y: 1, merged: false },
    ]

    const leftMoved = moveRowLeft(
      [
        { value: 4, x: 0, y: 1, merged: false },
        { value: 2, x: 1, y: 1, merged: false },
        { value: 2, x: 2, y: 1, merged: false },
        { value: 0, x: 3, y: 1, merged: false },
      ],
      1
    )

    expect(leftMoved).toEqual(result)
  })

  it('8 4 2 0', () => {
    const result: ICell[] = [
      {
        value: 8,
        x: 0,
        y: 1,
        merged: false,
        next: { merged: false, y: 1, x: 0, value: 8 },
      },
      {
        value: 4,
        x: 1,
        y: 1,
        merged: false,
        next: { merged: false, y: 1, x: 1, value: 4 },
      },
      {
        value: 2,
        x: 2,
        y: 1,
        merged: false,
        next: { merged: false, y: 1, x: 2, value: 2 },
      },
      { value: 0, x: 3, y: 1, merged: false },
    ]

    const leftMoved = moveRowLeft(
      [
        { value: 8, x: 0, y: 1, merged: false },
        { value: 4, x: 1, y: 1, merged: false },
        { value: 2, x: 2, y: 1, merged: false },
        { value: 0, x: 3, y: 1, merged: false },
      ],
      1
    )

    expect(leftMoved).toEqual(result)
  })
})
