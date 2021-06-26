import React, { FC } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { vw } from '@constants/window'
import { COLORS_MAP } from '@constants/colors'

interface ICellProps {
  value: number
}

const mapColor = (value: number): ViewStyle => {
  const backgroundColor =
    value < 2048
      ? COLORS_MAP.get(value) ?? 'rgba(238, 228, 218, 0.35)'
      : 'green'

  return { backgroundColor }
}

export const Cell: FC<ICellProps> = ({ value }) => {
  const style = Object.assign({}, styles.cell, mapColor(value))

  return (
    <View style={style}>
      <Text style={styles.cellText}>{value || ''}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: 8,
    width: 20 * vw,
    height: 20 * vw,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: vw,
  },
  cellText: {
    fontSize: 8 * vw,
  },
})

export default Cell
