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
    setBestScore(state, { payload }: PayloadAction<number>) {
      state.bestScore = payload
    },
    setScore(state, { payload }: PayloadAction<number>) {
      state.score = payload
    },
  },
})

export const { updateGrid, setIsOver, setScore, setBestScore } =
  gameSlice.actions

export default gameSlice.reducer
