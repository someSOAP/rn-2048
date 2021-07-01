import React, { FC, useEffect, useRef } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { ICell } from '@/types'
import { getMoveOffset, mapColor } from '@utils/cell'

const ValueCell: FC<ICell> = (cell) => {
  const { value } = cell

  const animVertical = useRef(new Animated.Value(0)).current
  const animHorizontal = useRef(new Animated.Value(0)).current

  const { offset, dir } = getMoveOffset(cell)

  const startVertical = () => {
    Animated.timing(animVertical, {
      toValue: 100,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }

  const startHorizontal = () => {
    Animated.timing(animHorizontal, {
      toValue: 100,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }

  const style = Object.assign({}, styles.cell, mapColor(value), {
    transform: [
      {
        translateX: animHorizontal.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset],
        }),
      },
      {
        translateY: animVertical.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset],
        }),
      },
    ],
  })

  useEffect(() => {
    if (!offset) return void 0

    if (dir === 'UP' || dir === 'DOWN') {
      startVertical()
    } else {
      startHorizontal()
    }
  })

  return (
    <Animated.View style={style}>
      <Text style={styles.cellText}>{value || ''}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: 8,
    width: CELL_DIMENSION,
    height: CELL_DIMENSION,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 8 * vw,
  },
})

export default ValueCell
