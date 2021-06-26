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

const mergeArray = (initialArray: number[]): number[] => {
  const arrLength = initialArray.length
  if (arrLength < 2) {
    return initialArray
  }

  let array = initialArray.filter((it) => it)

  if (!array.length) {
    return []
  }

  if (array[0] === array[1]) {
    array[0] = array[0] + array[1]
    array[1] = 0
  }

  array = [array[0], ...mergeArray(array.slice(1))]

  return array
}

export const makeMove = (initialArray: number[]): number[] => {
  const array = mergeArray(initialArray)

  while (array.length < initialArray.length) {
    array.push(0)
  }
  return array
}
