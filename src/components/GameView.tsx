import React, { FC, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import { isEqual } from 'lodash'
import {
  updateGrid,
  setIsOver,
  gameGridSelector,
  gameIsOverSelector,
  gameLastMoveSelector,
  updateLastMove,
} from '@/store'
import CustomButton from '@components/CustomButton'
import { Grid } from '@components/Grid'
import {
  GRID_LENGTH,
  GESTURE_CONFIGS,
  ANIMATION_TIMING,
} from '@constants/initail'
import { initValues, getColumn, pushNewValue, makeMove } from '@utils/array'
import { GridType, MoveType } from 'types'

const GameView: FC = () => {
  const dispatch = useDispatch()

  const values = useSelector(gameGridSelector)
  const isOver = useSelector(gameIsOverSelector)
  const lastMove = useSelector(gameLastMoveSelector)

  const setValues = (values: GridType) => dispatch(updateGrid(values))

  useEffect(() => {
    dispatch(setValues(initValues()))
  }, [])

  const setLastMove = (move: MoveType) => {
    dispatch(updateLastMove(move))
  }

  const onEnd = () => {
    dispatch(setIsOver(true))
  }

  const onStartAgain = () => {
    setValues(initValues())
    dispatch(setIsOver(false))
  }

  const onMoveDone = (newValue: GridType, move: MoveType) => {
    if (!isEqual(values, newValue)) {
      setLastMove(move)
      setTimeout(() => {
        setValues(pushNewValue(newValue, onEnd))
      }, ANIMATION_TIMING)
    }
  }

  const onSwipeDown = () => {
    const columns: GridType = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
      const column = columns[colIndex]

      columns[colIndex] = makeMove(column.reverse()).reverse()
    }

    const newMatrix: number[][] = []
    for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
      newMatrix[rowIndex] = []
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        newMatrix[rowIndex][colIndex] = columns[colIndex][rowIndex]
      }
    }
    onMoveDone(newMatrix, 'DOWN')
  }

  const onSwipeUp = () => {
    const columns: GridType = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
      const column = columns[colIndex]

      columns[colIndex] = makeMove(column)
    }

    const newMatrix: GridType = []
    for (let rowIndex = 0; rowIndex < GRID_LENGTH; rowIndex++) {
      newMatrix[rowIndex] = []
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        newMatrix[rowIndex][colIndex] = columns[colIndex][rowIndex]
      }
    }

    onMoveDone(newMatrix, 'UP')
  }

  const onSwipeLeft = () => {
    const newMatrix = []
    for (const row of values) {
      newMatrix.push(makeMove(row))
    }

    onMoveDone(newMatrix, 'LEFT')
  }

  const onSwipeRight = () => {
    const newMatrix = []
    for (const row of values) {
      const reversedRow = [...row].reverse()

      newMatrix.push(makeMove(reversedRow).reverse())
    }

    onMoveDone(newMatrix, 'RIGHT')
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

export default GameView
