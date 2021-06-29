import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridType, IGame, MoveType } from '@/types'

const initialState: IGame = {
  grid: [],
  isOver: true,
  lastMove: 'DOWN',
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
    updateLastMove(state, { payload }: PayloadAction<MoveType>) {
      state.lastMove = payload
    },
  },
})

export const { updateGrid, setIsOver, updateLastMove } = gameSlice.actions

export default gameSlice.reducer
