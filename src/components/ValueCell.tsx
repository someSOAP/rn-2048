import React, { FC, useEffect, useRef } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION, ENABLE_ANIM } from '@constants/initail'
import { ICell } from '@/types'
import { getMoveOffset, mapColor } from '@utils/cell'
import { ANIMATION_TIMING } from '@constants/initail'

const getAnimFunction = (animValue: Animated.Value) => () => {
  Animated.timing(animValue, {
    toValue: 100,
    useNativeDriver: false,
    duration: ANIMATION_TIMING,
  }).start(() => animValue.setValue(0))
}

const ValueCell: FC<ICell> = (cell) => {
  const mergeAnim = useRef(new Animated.Value(0)).current

  const horizontalAnim = useRef(new Animated.Value(0)).current
  const verticalAnim = useRef(new Animated.Value(0)).current

  const { offset, dir } = getMoveOffset(cell)

  const { value, merged } = cell

  const style = Object.assign({}, styles.cell, mapColor(value), {
    transform: [
      {
        scale: mergeAnim.interpolate({
          inputRange: [0, 75, 100],
          outputRange: [1, 1.1, 1],
        }),
      },
      {
        translateY: verticalAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset + offset * 2 * vw],
        }),
      },
      {
        translateX: horizontalAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset + offset * 2 * vw],
        }),
      },
    ],
  })

  const animateMerge = getAnimFunction(mergeAnim)

  const animateVertical = getAnimFunction(verticalAnim)

  const animateHorizontal = getAnimFunction(horizontalAnim)

  useEffect(() => {
    if (!dir || !ENABLE_ANIM) return void 0

    switch (dir) {
      case 'DOWN':
      case 'UP':
        animateVertical()
        break
      case 'LEFT':
      case 'RIGHT':
        animateHorizontal()
        break
    }
  }, [offset, dir])

  useEffect(() => {
    if (merged) {
      animateMerge()
    }
  }, [merged])

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
