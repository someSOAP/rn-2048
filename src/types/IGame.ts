import { ICell } from './Cell'

export type GridType = ICell[][]

export type MoveType = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface IGame {
  grid: GridType
  isOver: boolean
  score: number
  bestScore: number
}
