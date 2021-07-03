import { ICell, ICellMove } from '@/types'
import { ViewStyle } from 'react-native'
import { COLORS_MAP } from '@constants/colors'

export const mapColor = (value: number): ViewStyle => {
  const backgroundColor = COLORS_MAP.get(value) ?? 'green'

  return { backgroundColor }
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
