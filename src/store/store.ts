import { configureStore } from '@reduxjs/toolkit'

import gameSlice from './gameSlice'

export const store = configureStore({
	reducer: {
		gameSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
