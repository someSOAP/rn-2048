import { AsyncStorage } from 'react-native'
import { batch } from 'react-redux'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import {
  ANIMATION_TIMING,
  BEST_SCORE_KEY,
  ENABLE_ANIM,
} from '@constants/initail'
import {
  canMoveReverse,
  canMoveStraight,
  checkGameEnd,
  detranspose,
  getActualGrid,
  moveColDown,
  moveColUp,
  moveRowLeft,
  moveRowRight,
  pushNewValue,
  transposeGrid,
} from '@utils/array'
import { GridType, RootState } from '@/types'
import {
  gameScoreSelector,
  gameBestScoreSelector,
  gameGridSelector,
} from './selectors'
import { setScore, setBestScore, setIsOver, updateGrid } from './gameSlice'

type AppAction = ThunkAction<void, RootState, unknown, Action>

export const updateScore =
  (plusScore: number): AppAction =>
  (dispatch, getState) => {
    const state = getState()
    const currentScore = gameScoreSelector(state)
    const bestScore = gameBestScoreSelector(state)
    const newScore = currentScore + plusScore

    batch(() => {
      dispatch(setScore(newScore))
      if (newScore > bestScore) {
        AsyncStorage.setItem(BEST_SCORE_KEY, String(newScore))
        dispatch(setBestScore(newScore))
      }
    })
  }

export const finnishMove =
  (newValue: GridType, plusScore: number): AppAction =>
  (dispatch) => {
    batch(() => {
      dispatch(updateGrid(newValue))
      dispatch(updateScore(plusScore))
    })

    const afterAnimValue = pushNewValue(getActualGrid(newValue))

    if (checkGameEnd(afterAnimValue)) {
      dispatch(setIsOver(true))
      return void 0
    }

    if (ENABLE_ANIM) {
      setTimeout(() => {
        dispatch(updateGrid(afterAnimValue))
      }, ANIMATION_TIMING)
    } else {
      dispatch(updateGrid(afterAnimValue))
    }
  }

export const moveDown = (): AppAction => (dispatch, getState) => {
  const values = gameGridSelector(getState())

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

  dispatch(finnishMove(newMatrix, plusScore))
}

export const moveUp = (): AppAction => (dispatch, getState) => {
  const values = gameGridSelector(getState())

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
  dispatch(finnishMove(newMatrix, plusScore))
}

export const moveLeft = (): AppAction => (dispatch, getState) => {
  const values = gameGridSelector(getState())

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

  dispatch(finnishMove(newMatrix, plusScore))
}

export const moveRight = (): AppAction => (dispatch, getState) => {
  const values = gameGridSelector(getState())

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

  dispatch(finnishMove(newMatrix, plusScore))
}
