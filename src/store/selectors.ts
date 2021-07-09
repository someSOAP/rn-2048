import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './store'

const rootSelector = (state: RootState) => state

export const gameSelector = createSelector(
  rootSelector,
  (state) => state.gameSlice
)

export const gameIsLoadedSelector = createSelector(
  gameSelector,
  (game) => game.isLoaded
)

export const gameVisibleModalSelector = createSelector(
  gameSelector,
  (game) => game.visibleModal
)

export const gameGridSelector = createSelector(
  gameSelector,
  (game) => game.grid
)

export const gameIsOverSelector = createSelector(
  gameSelector,
  (game) => game.isOver
)

export const gameScoreSelector = createSelector(
  gameSelector,
  (game) => game.score
)

export const gameBestScoreSelector = createSelector(
  gameSelector,
  (game) => game.bestScore
)
