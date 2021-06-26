import { sample, cloneDeep, sampleSize } from 'lodash'
import { GRID_LENGTH } from '@constants/initail'

export const initValues = (): number[][] => {
  const matrix: number[][] = []
  const freeCells: [number, number][] = []

  for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
    matrix[rowIndex] = []
    for (let cellIndex = 0; cellIndex < GRID_LENGTH; cellIndex++) {
      matrix[rowIndex][cellIndex] = 0
      freeCells.push([rowIndex, cellIndex])
    }
  }

  sampleSize(freeCells, 3).forEach(([x, y]) => {
    matrix[x][y] = sample([2, 4]) as number
  })

  return matrix
}

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

export const pushNewValue = (
  matrix: number[][],
  onError: () => void
): number[][] => {
  const emptyCoords: [number, number][] = []

  for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
    const row = matrix[rowIndex]

    for (let cellIndex = 0; cellIndex < GRID_LENGTH; cellIndex++) {
      const cellValue = row[cellIndex]
      if (!cellValue) {
        emptyCoords.push([rowIndex, cellIndex])
      }
    }
  }

  const newMatrix = cloneDeep(matrix)
  if (emptyCoords.length) {
    const [x, y] = sample(emptyCoords) as [number, number]
    newMatrix[x][y] = sample([2, 4]) as number
  } else {
    onError()
  }
  return newMatrix
}
