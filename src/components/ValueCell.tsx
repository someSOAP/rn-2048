import React, { FC, useEffect, useRef } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { ICell } from '@/types'
import { getMoveOffset, mapColor } from '@utils/cell'
import { ANIMATION_TIMING } from '@constants/initail'

const ValueCell: FC<ICell> = (cell) => {
  const mergeAnim = useRef(new Animated.Value(0)).current
  const leftAnim = useRef(new Animated.Value(0)).current
  const rightAnim = useRef(new Animated.Value(0)).current
  const upAnim = useRef(new Animated.Value(0)).current
  const downAnim = useRef(new Animated.Value(0)).current

  const { offset, dir } = getMoveOffset(cell)

  const { value, merged } = cell

  const style = Object.assign({}, styles.cell, mapColor(value), {
    transform: [
      {
        scale: mergeAnim.interpolate({
          inputRange: [0, 75, 100],
          outputRange: [1, 1.2, 1],
        }),
      },
      {
        translateY: upAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset + offset * 2 * vw],
        }),
      },
      {
        translateY: downAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset + offset * 2 * vw],
        }),
      },
      {
        translateX: leftAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset],
        }),
      },
      {
        translateX: rightAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION * offset],
        }),
      },
    ],
  })

  const animateMerge = () => {
    mergeAnim.setValue(0)
    Animated.timing(mergeAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: ANIMATION_TIMING,
    }).start()
  }

  const animateRight = () => {
    Animated.timing(rightAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: ANIMATION_TIMING,
    }).start()
    rightAnim.setValue(0)
  }

  const animateLeft = () => {
    Animated.timing(leftAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: ANIMATION_TIMING,
    }).start()
    leftAnim.setValue(0)
  }

  const animateUp = () => {
    upAnim.setValue(0)
    Animated.timing(upAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: ANIMATION_TIMING,
    }).start()
  }

  const animateDown = () => {
    downAnim.setValue(0)
    Animated.timing(downAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: ANIMATION_TIMING,
    }).start()
  }

  useEffect(() => {
    if (!dir) return void 0

    switch (dir) {
      case 'DOWN':
        animateDown()
        break
      case 'LEFT':
        animateLeft()
        break
      case 'RIGHT':
        animateRight()
        break
      case 'UP':
        animateUp()
        break
    }
  }, [offset, dir])

  useEffect(animateMerge, [merged])

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
