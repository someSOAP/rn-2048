import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './store'

const rootSelector = (state: RootState) => state

export const gameSelector = createSelector(
  rootSelector,
  (state) => state.gameSlice
)

export const gameGridSelector = createSelector(
  gameSelector,
  (game) => game.grid
)

export const gameIsOverSelector = createSelector(
  gameSelector,
  (game) => game.isOver
)
