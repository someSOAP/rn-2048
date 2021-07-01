import React, { FC, useEffect, useRef } from 'react'
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { ICell } from '@/types'
import { getMoveOffset, mapColor } from '@utils/cell'

const ValueCell: FC<ICell> = (cell) => {
  const mergeAnim = useRef(new Animated.Value(0)).current

  const { value, prevX, prevY, x, y, prevValue } = cell

  const style = Object.assign({}, styles.cell, mapColor(value), {
    transform: [
      {
        scale: mergeAnim.interpolate({
          inputRange: [0, 75, 100],
          outputRange: [1, 1.2, 1],
        }),
      },
    ],
  })

  const animate = () => {
    mergeAnim.setValue(0)
    Animated.timing(mergeAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: 250,
    }).start()
  }

  useEffect(animate, [value, prevValue])

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
