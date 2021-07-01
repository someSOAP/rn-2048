import React, { FC, useEffect, useRef } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { ICell } from '@/types'
import { getMoveOffset, mapColor } from '@utils/cell'

const ValueCell: FC<ICell> = (cell) => {
  const { value } = cell

  const animUp = useRef(new Animated.Value(0)).current
  const animLeft = useRef(new Animated.Value(0)).current
  const animDown = useRef(new Animated.Value(0)).current
  const animRight = useRef(new Animated.Value(0)).current

  const { offset, dir } = getMoveOffset(cell)

  const startUp = () => {
    Animated.timing(animUp, {
      toValue: 100,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }

  const startLeft = () => {
    Animated.timing(animLeft, {
      toValue: 100,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }

  const startDown = () => {
    Animated.timing(animDown, {
      toValue: 100,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }

  const startRight = () => {
    Animated.timing(animRight, {
      toValue: 100,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }

  const style = Object.assign({}, styles.cell, mapColor(value), {
    transform: [
      {
        translateX: animLeft.interpolate({
          inputRange: [0, 100],
          outputRange: [CELL_DIMENSION * offset, 0],
        }),
      },
      {
        translateY: animDown.interpolate({
          inputRange: [0, 100],
          outputRange: [-CELL_DIMENSION * offset, 0],
        }),
      },
      {
        translateX: animRight.interpolate({
          inputRange: [0, 100],
          outputRange: [CELL_DIMENSION * offset, 0],
        }),
      },
      {
        translateY: animUp.interpolate({
          inputRange: [0, 100],
          outputRange: [CELL_DIMENSION * offset, 0],
        }),
      },
    ],
  })

  useEffect(() => {
    if (!offset) return void 0

    if (dir === 'UP') {
      startUp()
    }
    if (dir === 'DOWN') {
      startDown()
    }
    if (dir === 'LEFT') {
      startLeft()
    }
    if (dir === 'RIGHT') {
      startRight()
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
