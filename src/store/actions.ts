import { AsyncStorage } from 'react-native'
import { batch } from 'react-redux'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import {
  ANIMATION_TIMING,
  BEST_SCORE_KEY,
  ENABLE_ANIM,
  FREDOKA_FONT,
  GAME_OVER,
  GAME_SATE_KEY,
  INITIAL_MODAL_TEXT,
  VICTORY,
} from '@constants/initail'
import {
  initGrid,
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
  checkWin,
} from '@utils/array'
import { GridType, IGame, RootState } from '@/types'
import {
  gameSelector,
  gameScoreSelector,
  gameBestScoreSelector,
  gameGridSelector,
  gameIsVictorySelector,
} from './selectors'
import {
  setScore,
  setBestScore,
  setIsOver,
  updateGrid,
  setVisibleModal,
  setModalText,
  setGameState,
  setGameIsLoaded,
  setIsVictory,
} from './gameSlice'
import { loadAsync } from 'expo-font'

type AppAction = ThunkAction<void, RootState, unknown, Action>

export const startNewGame = (): AppAction => (dispatch) => {
  batch(() => {
    dispatch(setScore(0))
    dispatch(setVisibleModal(false))
    dispatch(updateGrid(initGrid()))
    dispatch(setIsOver(false))
    dispatch(setIsVictory(false))
    dispatch(setModalText(INITIAL_MODAL_TEXT))
  })
}

export const loadGame = (): AppAction => async (dispatch) => {
  const restart = () => {
    batch(() => {
      dispatch(setGameIsLoaded(true))
      dispatch(startNewGame())
    })
  }

  await loadAsync({
    [FREDOKA_FONT]: require('../../assets/FredokaOne-Regular.ttf'),
  })

  AsyncStorage.getItem(GAME_SATE_KEY)
    .then((stateStr) => {
      if (!stateStr) {
        restart()
        return void 0
      }
      try {
        const lastState: IGame = JSON.parse(stateStr)
        const cleanState: IGame = {
          ...lastState,
          grid: getActualGrid(lastState.grid),
        }

        batch(() => {
          dispatch(setGameState(cleanState))
          dispatch(setGameIsLoaded(true))
        })
      } catch (err) {
        restart()
      }
    })
    .catch(() => {
      AsyncStorage.getItem(BEST_SCORE_KEY).then((bestScoreStr) => {
        if (bestScoreStr) {
          batch(() => {
            dispatch(setGameIsLoaded(true))
            dispatch(setBestScore(parseInt(bestScoreStr)))
          })
        }
      })
      restart()
    })
}

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

export const finishMove =
  (newValue: GridType, plusScore: number): AppAction =>
  (dispatch, getState) => {
    const state = getState()
    const isVictory = gameIsVictorySelector(state)

    batch(() => {
      dispatch(updateGrid(newValue))
      dispatch(updateScore(plusScore))
    })

    const afterAnimValue = pushNewValue(getActualGrid(newValue))

    if (checkGameEnd(afterAnimValue)) {
      batch(() => {
        dispatch(setModalText(GAME_OVER))
        dispatch(setIsOver(true))
      })
      return void 0
    }

    if (ENABLE_ANIM) {
      setTimeout(() => {
        dispatch(updateGrid(afterAnimValue))
        if (!isVictory && checkWin(afterAnimValue)) {
          dispatch(setIsVictory(true))
          dispatch(setVisibleModal(true))
          dispatch(setModalText(VICTORY))
        }
      }, ANIMATION_TIMING)
    } else {
      dispatch(updateGrid(afterAnimValue))
    }

    AsyncStorage.setItem(GAME_SATE_KEY, JSON.stringify(gameSelector(state)))
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

  dispatch(finishMove(newMatrix, plusScore))
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
  dispatch(finishMove(newMatrix, plusScore))
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

  dispatch(finishMove(newMatrix, plusScore))
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

  dispatch(finishMove(newMatrix, plusScore))
}
