import { sample, cloneDeep, sampleSize } from 'lodash'
import { GRID_LENGTH } from '@constants/initail'
import { GridType, ICell } from '@/types'

export const newCell = (y: number, x: number): ICell => {
  return {
    merged: true,
    x,
    y,
    value: 0,
  }
}

const newRandomCell = (y: number, x: number): ICell => {
  const cell = newCell(y, x)
  cell.value = sample([2, 4]) as number
  cell.merged = true
  return cell
}

export const initValues = (): GridType => {
  const matrix: GridType = []
  const freeCells: [number, number][] = []

  for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
    matrix[rowIndex] = []
    for (let cellIndex = 0; cellIndex < GRID_LENGTH; cellIndex++) {
      matrix[rowIndex][cellIndex] = newCell(rowIndex, cellIndex)
      freeCells.push([rowIndex, cellIndex])
    }
  }

  sampleSize(freeCells, 3).forEach(([y, x]) => {
    matrix[y][x] = newRandomCell(y, x)
  })

  return matrix
}

export const getColumn = (arr: GridType, n: number): ICell[] =>
  arr.map((x) => x[n])

export const pushNewValue = (
  matrix: GridType,
  onError: () => void
): GridType => {
  const emptyCoords: [number, number][] = []

  for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
    const row = matrix[rowIndex]

    for (let cellIndex = 0; cellIndex < GRID_LENGTH; cellIndex++) {
      const cellValue = row[cellIndex].value
      if (!cellValue) {
        emptyCoords.push([rowIndex, cellIndex])
      }
    }
  }

  const newMatrix = cloneDeep(matrix)
  if (emptyCoords.length) {
    const [y, x] = sample(emptyCoords) as [number, number]

    newMatrix[y][x] = newRandomCell(y, x)
  } else {
    onError()
  }
  return newMatrix
}

const mergeRow = (initialRow: ICell[], iteration = 0): ICell[] => {
  const array = initialRow.reduce((resultArr, item) => {
    if (item.value) {
      resultArr.push({ ...item })
    }
    return resultArr
  }, [] as ICell[])

  if (array.length === 0) {
    return array
  }

  if (array.length === 1) {
    array[0].next = {
      merged: false,
      value: array[0].value,
      x: iteration,
      y: iteration,
    }
    return [array[0]]
  }

  if (array[0].value === array[1].value) {
    array[0].next = {
      merged: true,
      value: array[0].value + array[1].value,
      x: iteration,
      y: iteration,
    }

    array[1].next = {
      merged: true,
      value: 0,
      x: iteration,
      y: iteration,
    }

    return [array[0], array[1], ...mergeRow(array.slice(2), iteration + 1)]
  }

  array[0].next = {
    merged: false,
    value: array[0].value,
    x: iteration,
    y: iteration,
  }

  array[1].next = {
    merged: false,
    value: array[1].value,
    x: iteration + 1,
    y: iteration + 1,
  }

  return [array[0], array[1], ...mergeRow(array.slice(2), iteration + 1)]
}

export const moveRowLeft = (initialRow: ICell[], rowIndex: number): ICell[] => {
  const copy = [...initialRow]
  const array = mergeRow(initialRow)

  for (const cell of array) {
    cell.y = rowIndex
    const { x } = cell
    copy[x] = cell
  }

  return copy
}

export const moveColUp = (initialCol: ICell[], colIndex: number): ICell[] => {
  const copy = [...initialCol]
  const array = mergeRow(initialCol)

  for (const cell of array) {
    if (cell.next) {
      cell.next.x = colIndex
    }
    const { y } = cell
    copy[y] = cell
  }

  return copy
}

export const moveRowRight = (
  initialRow: ICell[],
  rowIndex: number
): ICell[] => {
  const copy = [...initialRow]
  const array = mergeRow(copy.reverse())

  for (const cell of array) {
    cell.y = rowIndex
    const { x } = cell
    copy[x] = cell
  }

  return copy.reverse()
}

export const moveColDown = (initialCol: ICell[], colIndex: number): ICell[] => {
  const copy = [...initialCol]
  const array = mergeRow(copy.reverse())

  for (const cell of array) {
    if (cell.next) {
      cell.next.x = colIndex
      cell.next.y = copy.length - 1 - cell.next.y
    }
    const y = copy.length - 1 - cell.y
    copy[y] = cell
  }

  return copy.reverse()
}
