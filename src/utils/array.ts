import { GRID_LENGTH } from '@constants/initail'

export const getColumn = (arr: number[][], n: number): number[] =>
  arr.map((x) => x[n])

export const move = (initialColumn: number[]): number[] => {
  const column = [...initialColumn]

  for (let cellIndex = GRID_LENGTH - 2; cellIndex >= 0; cellIndex--) {
    const currentValue = column[cellIndex]

    for (let i = cellIndex; i < GRID_LENGTH; i++) {
      const nextCellIndex = i + 1
      const nextValue = column[nextCellIndex]
      if (nextCellIndex === GRID_LENGTH) {
        break
      }
      if (!nextValue || nextValue === currentValue) {
        column[nextCellIndex] = currentValue + nextValue
        column[i] = 0
      }
    }
  }

  return column
}
