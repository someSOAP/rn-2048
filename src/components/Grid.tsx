import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Cell } from './Cell'
import { vw } from '@constants/window'

interface IGridProps {
  values: number[][]
}

const generateRow = (values: number[], rowNum: number) => {
  return (
    <View style={styles.row} key={rowNum}>
      {values.map((val, index) => {
        return <Cell value={val} key={index} />
      })}
    </View>
  )
}

export const Grid: FC<IGridProps> = ({ values }) => {
  return (
    <View style={styles.grid}>
      {values.map((row, index) => {
        return generateRow(row, index)
      })}
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
