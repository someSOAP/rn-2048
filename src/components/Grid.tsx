import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Cell } from './Cell'
import { vw } from '@constants/window'
import { GridType, ICell } from '@/types'

interface IGridProps {
  values: GridType
}

const generateRow = (values: ICell[], rowNum: number) => {
  return (
    <View style={styles.row} key={rowNum}>
      {values.map((cell, index) => {
        return <Cell {...cell} key={index} />
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
