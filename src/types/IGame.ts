export type GridType = number[][]

export type MoveType = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface IGame {
  grid: GridType
  isOver: boolean
  lastMove: MoveType
}

export interface ICell {
  x: number
  y: number
  prevX: number
  prevY: number
  value: number
}
