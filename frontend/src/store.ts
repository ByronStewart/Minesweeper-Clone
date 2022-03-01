import { configureStore } from "@reduxjs/toolkit"
import currentGameReducer from "./features/game/currentGameSlice"
import gameHistoryReducer from "./features/game/gameHistorySlice"

export const store = configureStore({
  reducer: {
    currentGame: currentGameReducer,
    gameHistory: gameHistoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
