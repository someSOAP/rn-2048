import { ICell, ICellMove } from '@/types'
import { ViewStyle } from 'react-native'
import { COLORS_MAP } from '@constants/colors'

export const mapColor = (value: number): ViewStyle => {
  const backgroundColor = COLORS_MAP.get(value) ?? 'green'

  return { backgroundColor }
}

export const getMoveOffset = (cell: ICell): ICellMove => {
  const { x, y, prevX, prevY } = cell
  const moveOffset: ICellMove = { dir: null, offset: 0 }

  if (x === prevX) {
    moveOffset.dir = y < prevY ? 'UP' : 'DOWN'
    moveOffset.offset = y - prevY
  } else {
    moveOffset.dir = x < prevX ? 'LEFT' : 'RIGHT'
    moveOffset.offset = x - prevX
  }

  return moveOffset
}
