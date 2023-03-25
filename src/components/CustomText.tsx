import React, { FC } from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'
import { FREDOKA_FONT } from '@constants/initail'
import { TEXT_DARK } from '@constants/colors'

export const CustomText: FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: TEXT_DARK,
    fontFamily: FREDOKA_FONT,
  },
})

export default CustomText
