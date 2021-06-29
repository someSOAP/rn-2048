import { ICell, ICellMove, MoveType } from '@/types'
import { ViewStyle } from 'react-native'
import { COLORS_MAP } from '@constants/colors'

export const mapColor = (value: number): ViewStyle => {
  const backgroundColor = COLORS_MAP.get(value) ?? 'green'

  return { backgroundColor }
}

export const getMoveOffset = (cell: ICell): ICellMove | null => {
  const { x, y, prevX, prevY } = cell
  if (x === prevX && y === prevY) return null

  let dir: MoveType

  let offset

  if (x === prevX) {
    dir = y < prevY ? 'UP' : 'DOWN'
    offset = y - prevY
  } else {
    dir = x < prevX ? 'LEFT' : 'RIGHT'
    offset = x - prevX
  }

  return {
    dir,
    offset,
  }
}
