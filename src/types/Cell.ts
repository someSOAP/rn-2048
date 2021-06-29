import { MoveType } from '@/types/IGame'

export interface ICell {
  value: number
  prevValue: number

  x: number
  y: number

  prevX: number
  prevY: number
}

export interface ICellMove {
  dir: MoveType
  offset: number
}
