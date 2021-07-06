import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { ICell } from '@/types'
import { mixins } from '@utils/mixins'
import ValueCell from './ValueCell'

export const Cell: FC<ICell> = (cell) => {
  return (
    <View style={styles.backgroundCell}>
      {cell.value ? <ValueCell {...cell} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundCell: {
    ...mixins.border,
    width: CELL_DIMENSION,
    height: CELL_DIMENSION,
    margin: vw,
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
  },
})

export default Cell
