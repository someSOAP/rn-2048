import React, { FC, useEffect, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
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
  ENABLE_ANIM,
} from '@constants/initail'
import {
  initValues,
  getColumn,
  pushNewValue,
  moveColDown,
  moveColUp,
  moveRowLeft,
  moveRowRight,
  getActualGrid,
  canMoveStraight,
  canMoveReverse,
} from '@utils/array'
import { GridType, MoveType } from '@/types'

const GameView: FC = () => {
  const dispatch = useDispatch()

  const prevState = useRef<{ state: GridType | null }>({ state: null })

  const values = useSelector(gameGridSelector)
  const isOver = useSelector(gameIsOverSelector)
  const lastMove = useSelector(gameLastMoveSelector)

  const setValues = (values: GridType) => dispatch(updateGrid(values))

  useEffect(() => {
    setValues(initValues())
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
    setLastMove(move)
    // dispatch(callAnimationAndMove(newValue))
    prevState.current.state = values
    setValues(newValue)
    if (ENABLE_ANIM) {
      setTimeout(() => {
        setValues(pushNewValue(getActualGrid(newValue), onEnd))
      }, ANIMATION_TIMING)
    } else {
      setValues(pushNewValue(getActualGrid(newValue), onEnd))
    }
  }

  const onSwipeDown = () => {
    const columns: GridType = []
    for (let colIndex = 0; colIndex < GRID_LENGTH; colIndex++) {
      columns[colIndex] = getColumn(values, colIndex)
      const column = columns[colIndex]

      columns[colIndex] = moveColDown(column, colIndex)
    }

    if (!canMoveReverse(columns)) {
      return void 0
    }

    const newMatrix: GridType = []
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

      columns[colIndex] = moveColUp(column, colIndex)
    }

    if (!canMoveStraight(columns)) {
      return void 0
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
    if (!canMoveStraight(values)) {
      return void 0
    }

    const newMatrix = []

    for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
      const row = values[rowIndex]
      newMatrix.push(moveRowLeft(row, rowIndex))
    }
    onMoveDone(newMatrix, 'LEFT')
  }

  const onSwipeRight = () => {
    if (!canMoveReverse(values)) {
      return void 0
    }

    const newMatrix = []

    for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
      const row = values[rowIndex]
      newMatrix.push(moveRowRight(row, rowIndex))
    }
    onMoveDone(newMatrix, 'RIGHT')
  }

  return (
    <View style={styles.screen}>
      {isOver ? (
        <CustomButton onPress={onStartAgain}>Start Again</CustomButton>
      ) : (
        <>
          <CustomButton onPress={onSwipeUp}>UP</CustomButton>
          <CustomButton onPress={onSwipeDown}>DOWN</CustomButton>
          <CustomButton onPress={onSwipeLeft}>LEFT</CustomButton>
          <CustomButton onPress={onSwipeRight}>RIGHT</CustomButton>
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
          <CustomButton
            onPress={() => {
              if (prevState.current.state) {
                setValues(prevState.current.state)
                prevState.current.state = null
              }
            }}
          >
            UNDO
          </CustomButton>
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
