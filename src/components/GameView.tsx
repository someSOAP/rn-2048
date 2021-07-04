import React, { FC, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import {
  updateGrid,
  setIsOver,
  gameGridSelector,
  gameIsOverSelector,
} from '@/store'
import CustomButton from '@components/CustomButton'
import { Grid } from '@components/Grid'
import {
  GESTURE_CONFIGS,
  ANIMATION_TIMING,
  ENABLE_ANIM,
} from '@constants/initail'
import {
  initValues,
  pushNewValue,
  moveColDown,
  moveColUp,
  moveRowLeft,
  moveRowRight,
  getActualGrid,
  canMoveStraight,
  canMoveReverse,
  transposeGrid,
  checkGameEnd,
  detranspose,
} from '@utils/array'
import { GridType } from '@/types'

const GameView: FC = () => {
  const dispatch = useDispatch()

  const prevState = useRef<{ state: GridType | null }>({ state: null })

  const values = useSelector(gameGridSelector)
  const isOver = useSelector(gameIsOverSelector)

  const setValues = (values: GridType) => dispatch(updateGrid(values))

  useEffect(() => {
    setValues(initValues())
  }, [])

  const onEnd = () => {
    dispatch(setIsOver(true))
  }

  const onStartAgain = () => {
    setValues(initValues())
    dispatch(setIsOver(false))
  }

  const onMoveDone = (newValue: GridType) => {
    prevState.current.state = values
    setValues(newValue)

    const afterAnimValue = pushNewValue(getActualGrid(newValue))

    if (checkGameEnd(afterAnimValue)) {
      onEnd()
      return void 0
    }

    if (ENABLE_ANIM) {
      setTimeout(() => {
        setValues(afterAnimValue)
      }, ANIMATION_TIMING)
    } else {
      setValues(afterAnimValue)
    }
  }

  const onSwipeDown = () => {
    let columns = transposeGrid(values)

    if (!canMoveReverse(columns)) {
      return void 0
    }

    columns = columns.map((column, colIndex) => {
      return moveColDown(column, colIndex)
    })

    const newMatrix = detranspose(columns)

    onMoveDone(newMatrix)
  }

  const onSwipeUp = () => {
    let columns = transposeGrid(values)

    if (!canMoveStraight(columns)) {
      return void 0
    }

    columns = columns.map((column, colIndex) => {
      return moveColUp(column, colIndex)
    })

    const newMatrix = detranspose(columns)
    onMoveDone(newMatrix)
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
    onMoveDone(newMatrix)
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
    onMoveDone(newMatrix)
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
