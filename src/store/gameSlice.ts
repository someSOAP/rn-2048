import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridType, IGame } from '@/types'

const initialState: IGame = {
  isLoaded: false,
  visibleModal: false,
  grid: [],
  isOver: true,
  score: 0,
  bestScore: 0,
}

export const gameSlice = createSlice({
  name: 'gridSlice',
  initialState,
  reducers: {
    setGameIsLoaded(state, { payload }: PayloadAction<boolean>) {
      state.isLoaded = payload
    },
    setGameState(state, { payload }: PayloadAction<IGame>) {
      return payload
    },
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
    setVisibleModal(state, { payload }: PayloadAction<boolean>) {
      state.visibleModal = payload
    },
  },
})

export const {
  setGameIsLoaded,
  setGameState,
  updateGrid,
  setIsOver,
  setScore,
  setBestScore,
  setVisibleModal,
} = gameSlice.actions

export default gameSlice.reducer
