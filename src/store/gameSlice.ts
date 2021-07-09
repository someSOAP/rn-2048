import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridType, IGame } from '@/types'
import { INITIAL_MODAL_TEXT } from '@constants/initail'

const initialState: IGame = {
  isLoaded: false,
  visibleModal: false,
  modalText: INITIAL_MODAL_TEXT,
  grid: [],
  isOver: true,
  score: 0,
  bestScore: 0,
}

export const gameSlice = createSlice({
  name: 'gameSlice',
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
    setModalText(state, { payload }: PayloadAction<string>) {
      state.modalText = payload
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
  setModalText,
} = gameSlice.actions

export default gameSlice.reducer
