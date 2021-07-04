import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridType, IGame, MoveType } from '@/types'

const initialState: IGame = {
  grid: [],
  isOver: true,
  score: 0,
  bestScore: 0,
}

export const gameSlice = createSlice({
  name: 'gridSlice',
  initialState,
  reducers: {
    updateGrid(state, { payload }: PayloadAction<GridType>) {
      state.grid = payload
    },
    setIsOver(state, { payload }: PayloadAction<boolean>) {
      state.isOver = payload
    },
    updateScore(state, { payload }: PayloadAction<number>) {
      state.score = payload
      if (payload > state.bestScore) {
        state.bestScore = payload
      }
    },
  },
})

export const { updateGrid, setIsOver } = gameSlice.actions

export default gameSlice.reducer
