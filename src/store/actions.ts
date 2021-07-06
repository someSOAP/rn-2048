import { batch } from 'react-redux'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import { RootState } from './store'
import { gameScoreSelector, gameBestScoreSelector } from './selectors'
import { setScore, setBestScore } from './gameSlice'
import { BEST_SCORE_KEY } from '@constants/initail'
import { AsyncStorage } from 'react-native'

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
