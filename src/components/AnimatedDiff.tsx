import React, { FC, memo, useEffect, useRef } from 'react'
import { StyleSheet, Animated } from 'react-native'
import { ANIMATION_TIMING, CELL_DIMENSION } from '@constants/initail'
import CustomText from './CustomText'

interface IAnimatedDiffProps {
  diff: number
}

const AnimatedDiffBase: FC<IAnimatedDiffProps> = ({ diff }) => {
  const diffAnim = useRef(new Animated.Value(0)).current

  const resetAnim = () => diffAnim.setValue(0)

  const animatedStyle = {
    opacity: diffAnim.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: diffAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -CELL_DIMENSION / 3],
        }),
      },
    ],
  }

  useEffect(() => {
    if (diff <= 0) {
      return void 0
    }
    Animated.timing(diffAnim, {
      toValue: 100,
      useNativeDriver: false,
      duration: ANIMATION_TIMING - 2,
    }).start(resetAnim)
  }, [diff])

  return (
    <Animated.View style={[animatedStyle, styles.diff]}>
      <CustomText style={styles.text}>+{String(diff)}</CustomText>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  diff: {
    position: 'absolute',
    zIndex: 1,
  },
})

export const AnimatedDiff = memo(AnimatedDiffBase, (prevState, nextState) => {
  return nextState.diff === 0
})

export default AnimatedDiff
