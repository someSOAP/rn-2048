import React, { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Grid } from '@components/Grid'
import { initialValues, GRID_LENGTH } from '@constants/initail'
import { getColumn, move } from '@utils/array'

const App: FC = () => {
  const [values, setValues] = useState<number[][]>(initialValues)

  const onSwipeDown = () => {
    const columns: number[][] = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
    }

    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const column = columns[colIndex]
      columns[colIndex] = move(column)
    }

    const newMatrix: number[][] = []
    for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
      newMatrix[rowIndex] = []
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        newMatrix[rowIndex][colIndex] = columns[colIndex][rowIndex]
      }
    }
    setValues(newMatrix)
  }

  const onSwipeUp = () => {
    const columns: number[][] = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
    }

    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const column = columns[colIndex]
      columns[colIndex] = move(column.reverse()).reverse()
    }

    const newMatrix: number[][] = []
    for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
      newMatrix[rowIndex] = []
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        newMatrix[rowIndex][colIndex] = columns[colIndex][rowIndex]
      }
    }
    setValues(newMatrix)
  }

  const onSwipeLeft = () => {
    const newMatrix = []
    for (const row of values) {
      newMatrix.push(move(row.reverse()).reverse())
    }

    setValues(newMatrix)
  }

  const onSwipeRight = () => {
    const newMatrix = []
    for (const row of values) {
      newMatrix.push(move(row))
    }

    setValues(newMatrix)
  }

  return (
    <View style={styles.screen}>
      <GestureRecognizer
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeUp={onSwipeUp}
      >
        <Grid values={values} />
      </GestureRecognizer>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgb(250, 248, 239)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
