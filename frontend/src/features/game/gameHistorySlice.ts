import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Difficulty } from "./interfaces"

type IHistoryState = Record<Difficulty, number[]>

const initialState: IHistoryState = {
  advanced: [],
  intermediate: [],
  beginner: [],
}
type GamePayload = {
  difficulty: Difficulty
  time: number
}

export const gameHistorySlice = createSlice({
  initialState,
  name: "gameHistory",
  reducers: {
    addGame: (state, action: PayloadAction<GamePayload>) => {
      switch (action.payload.difficulty) {
        case "advanced":
          state.advanced.push(action.payload.time)
          break
        case "intermediate":
          state.intermediate.push(action.payload.time)
          break
        case "beginner":
          state.beginner.push(action.payload.time)
          break
      }
    },
  },
})

export const { addGame } = gameHistorySlice.actions
export default gameHistorySlice.reducer
