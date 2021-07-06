import React, { FC, useEffect, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch, batch } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import { AsyncStorage } from 'react-native'

import {
  updateGrid,
  setIsOver,
  gameGridSelector,
  gameIsOverSelector,
  gameScoreSelector,
  gameBestScoreSelector,
  gameVisibleModalSelector,
  setBestScore,
  setVisibleModal,
} from '@/store'
import { updateScore } from '@/store/actions'
import CustomButton from '@components/CustomButton'
import { Grid } from '@components/Grid'
import { Modal } from '@components/Modal'
import { Score } from '@components/Score'
import {
  GESTURE_CONFIGS,
  ANIMATION_TIMING,
  ENABLE_ANIM,
  BEST_SCORE_KEY,
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
  const score = useSelector(gameScoreSelector)
  const bestScore = useSelector(gameBestScoreSelector)
  const visibleModal = useSelector(gameVisibleModalSelector)

  const setValues = (values: GridType) => dispatch(updateGrid(values))
  const toggleModal = () => dispatch(setVisibleModal(!visibleModal))

  useEffect(() => {
    setValues(initValues())

    AsyncStorage.getItem(BEST_SCORE_KEY).then((bestScoreStr) => {
      if (bestScoreStr) {
        dispatch(setBestScore(parseInt(bestScoreStr)))
      }
    })
  }, [])

  const onEnd = () => {
    dispatch(setIsOver(true))
  }

  const onStartAgain = () => {
    setValues(initValues())
    dispatch(setIsOver(false))
  }

  const onMoveDone = (newValue: GridType, plusScore: number) => {
    prevState.current.state = values
    batch(() => {
      setValues(newValue)
      dispatch(updateScore(plusScore))
    })

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

    let plusScore = 0
    const scoreCounter = (score: number) => {
      plusScore += score
    }

    columns = columns.map((column, colIndex) => {
      return moveColDown(column, colIndex, scoreCounter)
    })

    const newMatrix = detranspose(columns)

    onMoveDone(newMatrix, plusScore)
  }

  const onSwipeUp = () => {
    let columns = transposeGrid(values)

    if (!canMoveStraight(columns)) {
      return void 0
    }

    let plusScore = 0
    const scoreCounter = (score: number) => {
      plusScore += score
    }

    columns = columns.map((column, colIndex) => {
      return moveColUp(column, colIndex, scoreCounter)
    })

    const newMatrix = detranspose(columns)
    onMoveDone(newMatrix, plusScore)
  }

  const onSwipeLeft = () => {
    if (!canMoveStraight(values)) {
      return void 0
    }

    const newMatrix = []

    let plusScore = 0
    const scoreCounter = (score: number) => {
      plusScore += score
    }

    for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
      const row = values[rowIndex]
      newMatrix.push(moveRowLeft(row, rowIndex, scoreCounter))
    }
    onMoveDone(newMatrix, plusScore)
  }

  const onSwipeRight = () => {
    if (!canMoveReverse(values)) {
      return void 0
    }

    const newMatrix = []

    let plusScore = 0
    const scoreCounter = (score: number) => {
      plusScore += score
    }

    for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
      const row = values[rowIndex]
      newMatrix.push(moveRowRight(row, rowIndex, scoreCounter))
    }
    onMoveDone(newMatrix, plusScore)
  }

  return (
    <View style={styles.screen}>
      <CustomButton onPress={toggleModal}>SHOW MODAL</CustomButton>
      <Modal
        isVisible={visibleModal || isOver}
        onPlay={toggleModal}
        onReset={onStartAgain}
      />
      <View style={styles.scorePanel}>
        <Score score={score} />
        <Score score={bestScore} />
      </View>
      <GestureRecognizer
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeUp={onSwipeUp}
        config={GESTURE_CONFIGS}
      >
        <Grid values={values} />
      </GestureRecognizer>
    </View>
  )
}

const styles = StyleSheet.create({
  scorePanel: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
  screen: {
    backgroundColor: 'rgb(250, 248, 239)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default GameView
