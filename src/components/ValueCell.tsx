import React, { FC, useEffect, useRef } from 'react'
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { ICell } from '@/types'
import { getMoveOffset, mapColor } from '@utils/cell'

const moveVertical = (offset: number, animVal: Animated.Value): any => {
  return {
    transform: [
      {
        translateY: animVal.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION + 2 * vw * offset],
        }),
      },
    ],
  }
}

const ValueCell: FC<ICell> = (cell) => {
  const { value } = cell

  const offsetRef = useRef<number>(0)
  const animVertical = useRef(new Animated.Value(0)).current
  const animHorizontal = useRef(new Animated.Value(0)).current

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
        translateX: animVertical.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION + 2 * vw],
        }),
      },
      {
        translateY: animHorizontal.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION + 2 * vw],
        }),
      },
    ],
  })

  useEffect(() => {
    const moveOffset = getMoveOffset(cell)

    if (!moveOffset) return void 0

    const { dir, offset } = moveOffset

    offsetRef.current = offset

    if (dir === 'UP' || dir === 'DOWN') {
      setTimeout(startVertical, 1000)
    } else {
      setTimeout(startHorizontal, 1000)
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
