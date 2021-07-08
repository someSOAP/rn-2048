import React, { FC, useRef } from 'react'
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TEXT_DARK } from '@constants/colors'
import { ANIMATION_TIMING, CELL_DIMENSION } from '@constants/initail'

interface IIconButtonProps {
  icon: string
  onPress: () => void
  color?: string
  style?: ViewStyle
}

export const IconButton: FC<IIconButtonProps> = ({
  color,
  icon,
  onPress,
  style,
}) => {
  const animPress = useRef(new Animated.Value(0)).current

  const buttonStyle = Object.assign({}, styles.button, style, {
    transform: [
      {
        scale: animPress.interpolate({
          inputRange: [0, 100],
          outputRange: [1, 0.9],
        }),
      },
    ],
  })

  const onPressIn = () => {
    Animated.timing(animPress, {
      toValue: 100,
      useNativeDriver: false,
      duration: ANIMATION_TIMING / 4,
    }).start()
  }

  const onPressOut = () => {
    onPress()
    animPress.stopAnimation(() => animPress.setValue(0))
  }

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={buttonStyle}>
        <Ionicons
          name={icon as any}
          color={color ?? TEXT_DARK}
          size={CELL_DIMENSION}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  button: {},
})

export default IconButton
