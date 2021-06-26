import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import CustomButton from '@components/CustomButton'
import { Grid } from '@components/Grid'
import { GRID_LENGTH } from '@constants/initail'
import { initValues, getColumn, move, pushNewValue } from '@utils/array'

const App: FC = () => {
  const [values, setValues] = useState<number[][]>(initValues())
  const [isOver, setIsOver] = useState<boolean>(false)

  const onEnd = () => {
    setIsOver(true)
  }

  const onStartAgain = () => {
    setValues(initValues())
    setIsOver(false)
  }

  const onSwipeDown = () => {
    const columns: number[][] = []

    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
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
    setValues(pushNewValue(newMatrix, onEnd))
  }

  const onSwipeUp = () => {
    const columns: number[][] = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
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
    setValues(pushNewValue(newMatrix, onEnd))
  }

  const onSwipeLeft = () => {
    const newMatrix = []
    for (const row of values) {
      newMatrix.push(move(row.reverse()).reverse())
    }

    setValues(pushNewValue(newMatrix, onEnd))
  }

  const onSwipeRight = () => {
    const newMatrix = []
    for (const row of values) {
      newMatrix.push(move(row))
    }

    setValues(pushNewValue(newMatrix, onEnd))
  }

  return (
    <GestureRecognizer
      style={styles.screen}
      onSwipeDown={onSwipeDown}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      onSwipeUp={onSwipeUp}
    >
      {isOver ? (
        <CustomButton onPress={onStartAgain}>Start Again</CustomButton>
      ) : (
        <Grid values={values} />
      )}
    </GestureRecognizer>
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
