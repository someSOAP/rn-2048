import React, { FC } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native'

interface ICustomButtonProps {
  onPress: () => void
  children: string
  textColor?: string
  style?: StyleProp<ViewStyle>
}

const CustomButton: FC<ICustomButtonProps> = ({
  onPress,
  children,
  textColor = 'white',
  style,
}) => {
  const touchableStyle = Object.assign({}, styles.btn, style)

  return (
    <TouchableOpacity style={touchableStyle} onPress={onPress}>
      <Text style={{ ...styles.btnText, color: textColor }}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0770bc',
  },
  btnText: {
    color: 'white',
  },
})

export default CustomButton
