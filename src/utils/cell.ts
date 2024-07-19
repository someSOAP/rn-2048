import { ICell, ICellMove } from '@/types'
import { TextStyle, ViewStyle } from 'react-native'
import { COLORS_MAP, FINAL, TEXT_DARK, TEXT_BRIGHT } from '@constants/colors'

export const mapBackgroundColor = (value: number): ViewStyle => {
	const style: ViewStyle = {
		backgroundColor: COLORS_MAP.get(value) ?? FINAL,
	}

	return style
}

export const mapTextColor = (value: number): TextStyle => {
	const style: TextStyle = {
		color: value <= 4 ? TEXT_DARK : TEXT_BRIGHT,
	}
	return style
}

export const getMoveOffset = (cell: ICell): ICellMove => {
	const { x, y, next } = cell
	const moveOffset: ICellMove = { dir: null, offset: 0 }

	if (!next) {
		return moveOffset
	}

	if (x === next.x) {
		moveOffset.dir = next.y < y ? 'UP' : 'DOWN'
		moveOffset.offset = next.y - y
	} else {
		moveOffset.dir = next.x < x ? 'LEFT' : 'RIGHT'
		moveOffset.offset = next.x - x
	}

	return moveOffset
}
