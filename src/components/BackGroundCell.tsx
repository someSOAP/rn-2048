import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { mixins } from '@utils/mixins'
import { CELL_DIMENSION } from '@constants/initail'
import { vw } from '@constants/window'
import { CELL_COLOR } from '@constants/colors'

export const BackGroundCell: FC = () => {
  return <View style={styles.backgroundCell} />
}

const styles = StyleSheet.create({
  backgroundCell: {
    ...mixins.border,
    width: CELL_DIMENSION,
    height: CELL_DIMENSION,
    margin: vw,
    backgroundColor: CELL_COLOR,
  },
})

export default BackGroundCell
