import React, { FC } from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'
import { FREDOKA_FONT } from '@constants/initail'

export const CustomText: FC<TextProps> = ({ children, style, ...props }) => {
  const textStyle = Object.assign({}, style, styles.text)

  return (
    <Text {...props} style={textStyle}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FREDOKA_FONT,
  },
})

export default CustomText
