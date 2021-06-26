import React, { FC, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import CustomButton from '@components/CustomButton'
import { Grid } from '@components/Grid'
import { GRID_LENGTH, GESTURE_CONFIGS } from '@constants/initail'
import { initValues, getColumn, move, pushNewValue } from '@utils/array'

const App: FC = () => {
  const [values, setValues] = useState<number[][]>(initValues())
  const [isOver, setIsOver] = useState<boolean>(false)
  const [lastMove, setLastMove] = useState<string>('')

  const onEnd = () => {
    setIsOver(true)
  }

  const onStartAgain = () => {
    setValues(initValues())
    setIsOver(false)
  }

  const onSwipeDown = () => {
    let wasMove = false
    const columns: number[][] = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
      const column = columns[colIndex]
      const initialColumn = column

      const movedColumn = move(initialColumn)
      if (initialColumn !== movedColumn) {
        columns[colIndex] = movedColumn
        wasMove = true
      }
    }

    if (wasMove) {
      setLastMove('DOWN')
      const newMatrix: number[][] = []
      for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
        newMatrix[rowIndex] = []
        for (let colIndex = 0; colIndex < columns.length; colIndex++) {
          newMatrix[rowIndex][colIndex] = columns[colIndex][rowIndex]
        }
      }
      setValues(pushNewValue(newMatrix, onEnd))
    }
  }

  const onSwipeUp = () => {
    let wasMove = false
    const columns: number[][] = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
      const column = columns[colIndex]
      const initialColumn = column.reverse()

      const movedColumn = move(initialColumn)
      if (initialColumn !== movedColumn) {
        columns[colIndex] = movedColumn.reverse()
        wasMove = true
      }
    }

    if (wasMove) {
      setLastMove('UP')
      const newMatrix: number[][] = []
      for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
        newMatrix[rowIndex] = []
        for (let colIndex = 0; colIndex < columns.length; colIndex++) {
          newMatrix[rowIndex][colIndex] = columns[colIndex][rowIndex]
        }
      }
      setValues(pushNewValue(newMatrix, onEnd))
    }
  }

  const onSwipeLeft = () => {
    let wasMove = false
    const newMatrix = []
    for (const row of values) {
      const initialRow = row.reverse()
      const movedRow = move(initialRow)
      wasMove = movedRow !== initialRow
      newMatrix.push(movedRow.reverse())
    }

    if (wasMove) {
      setLastMove('LEFT')
      setValues(pushNewValue(newMatrix, onEnd))
    }
  }

  const onSwipeRight = () => {
    let wasMove = false
    const newMatrix = []
    for (const row of values) {
      const movedRow = move(row)
      wasMove = movedRow !== row
      newMatrix.push(movedRow)
    }

    if (wasMove) {
      setLastMove('RIGHT')
      setValues(pushNewValue(newMatrix, onEnd))
    }
  }

  return (
    <View style={styles.screen}>
      {isOver ? (
        <CustomButton onPress={onStartAgain}>Start Again</CustomButton>
      ) : (
        <>
          <Text>LastMove is {lastMove}</Text>
          <GestureRecognizer
            onSwipeDown={onSwipeDown}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            onSwipeUp={onSwipeUp}
            config={GESTURE_CONFIGS}
          >
            <Grid values={values} />
          </GestureRecognizer>
        </>
      )}
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
