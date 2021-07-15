import { ICell } from './Cell'

export type GridType = ICell[][]

export type MoveType = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface IMergeResult {
  score: number
  array: ICell[]
}

export type ScoreCounterType = (score: number) => void

export interface IGame {
  isLoaded: boolean
  isVictory: boolean
  isMoving: boolean
  visibleModal: boolean
  modalText: string
  grid: GridType
  isOver: boolean
  score: number
  bestScore: number
}
