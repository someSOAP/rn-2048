import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Cell } from './Cell'
import { vw } from '@constants/window'
import { GridType, ICell } from '@/types'
import { GRID_COLOR } from '@constants/colors'
import BackGroundCell from '@components/BackGroundCell'

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

const generateBackground = (dimension: number) => {
  const mapArr = new Array(dimension).fill(1)
  return (
    <View style={styles.backGround}>
      {mapArr.map((_, row) => {
        console.log(`${row} row`)
        return (
          <View style={styles.row} key={row}>
            {mapArr.map((_, cell) => {
              return <BackGroundCell key={cell} />
            })}
          </View>
        )
      })}
    </View>
  )
}

export const Grid: FC<IGridProps> = ({ values }) => {
  return (
    <View style={styles.grid}>
      {generateBackground(values.length)}
      {values.map((row, index) => {
        return generateRow(row, index)
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: GRID_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 2 * vw,
  },
  row: {
    flexDirection: 'row',
  },
  backGround: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})

export default Grid
