import { MoveType } from '@/types/IGame'

export interface ICell {
	value: number
	merged: boolean

	x: number
	y: number

	next?: ICell
}

export interface ICellMove {
	dir: MoveType | null
	offset: number
}
