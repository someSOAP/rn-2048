import { sample, cloneDeep, sampleSize } from 'lodash'
import { GRID_LENGTH } from '@constants/initail'
import { GridType, ICell } from '@/types'

export const newCell = (y: number, x: number): ICell => {
  return {
    prevX: x,
    prevY: y,
    x,
    y,
    value: 0,
    prevValue: 0,
  }
}

const newRandomCell = (y: number, x: number): ICell => {
  const cell = newCell(y, x)
  cell.value = sample([2, 4]) as number
  cell.prevValue = cell.value
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

const mergeRow = (initialRow: ICell[]): ICell[] => {
  let array = initialRow.reduce((resultArr, item) => {
    if (item.value) {
      resultArr.push({ ...item })
    }
    return resultArr
  }, [] as ICell[])

  if (array.length < 2) {
    return array
  }

  if (array[0].value === array[1].value) {
    array[0].prevValue = array[0].value
    array[0].value = array[0].value + array[1].value

    array[1].prevValue = array[0].value
    array[1].value = 0
  }

  array = [array[0], ...mergeRow(array.slice(1))]

  return array
}

export const moveRowLeft = (initialRow: ICell[], index: number): ICell[] => {
  const array = mergeRow(initialRow)

  for (let i = 0; i < initialRow.length; i++) {
    const cell = array[i]
    if (cell) {
      cell.prevY = cell.y
      cell.prevX = cell.x
      cell.x = i
      cell.y = index
    } else {
      array[i] = newCell(index, i)
    }
  }

  return array
}

export const moveColUp = (initialCol: ICell[], index: number): ICell[] => {
  const array = mergeRow(initialCol)

  for (let i = 0; i < initialCol.length; i++) {
    const cell = array[i]
    if (cell) {
      cell.prevY = cell.y
      cell.prevX = cell.x
      cell.x = i
      cell.y = index
    } else {
      array[i] = newCell(i, index)
    }
  }

  return array
}

export const moveRowRight = (initialRow: ICell[], index: number): ICell[] => {
  const row = [...initialRow]
  const array = mergeRow(row.reverse())

  for (let i = 0; i < initialRow.length; i++) {
    const cell = array[i]
    if (cell) {
      cell.prevY = cell.y
      cell.prevX = cell.x
      cell.x = i
      cell.y = index
    } else {
      array[i] = newCell(index, i)
    }
  }

  return array.reverse()
}

export const moveColDown = (initialCol: ICell[], index: number): ICell[] => {
  const col = [...initialCol]
  const array = mergeRow(col.reverse())

  for (let i = 0; i < initialCol.length; i++) {
    const cell = array[i]
    if (cell) {
      cell.prevY = cell.y
      cell.prevX = cell.x
      cell.x = i
      cell.y = index
    } else {
      array[i] = newCell(i, index)
    }
  }

  return array.reverse()
}
