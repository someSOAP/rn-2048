import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { vw } from '@constants/window'

interface ICellProps {
  value: number
}

export const Cell: FC<ICellProps> = ({ value }) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.cellText}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: 8,
    width: 20 * vw,
    height: 20 * vw,
    backgroundColor: 'rgba(238,228,218, 0.35)',
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
