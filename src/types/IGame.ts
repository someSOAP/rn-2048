import { ICell } from './Cell'

export type GridType = ICell[][]

export type MoveType = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface IMergeResult {
  score: number
  array: ICell[]
}

export type ScoreCounterType = (score: number) => void

export interface IGame {
  visibleModal: boolean
  grid: GridType
  isOver: boolean
  score: number
  bestScore: number
}
