import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Cell } from './Cell'
import { vw } from '@constants/window'

interface IGridProps {
  values: number[][]
}

const generateRow = () => {
  return (
    <View style={styles.row}>
      <Cell value={0} />
      <Cell value={0} />
      <Cell value={0} />
      <Cell value={0} />
    </View>
  )
}

export const Grid: FC<IGridProps> = ({ values }) => {
  return (
    <View style={styles.grid}>
      {generateRow()}
      {generateRow()}
      {generateRow()}
      {generateRow()}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: 'rgb(187, 173, 160)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 2 * vw,
  },
  row: {
    flexDirection: 'row',
  },
})

export default Grid
