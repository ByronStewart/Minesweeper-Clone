import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  GETMinesweeperScoreDTO,
  minesweeperAPIDifficultyTypes,
  POSTMinesweeperScoreDTO,
} from "../../interfaces/MinesweeperScoreDTO"
import { MINESWEEPER_SCORE_ROUTE } from "../../utils/constants"
import { Difficulty } from "../current-game/interfaces"
import { api } from "../../services/api/api"

type IHistoryState = Record<Difficulty, GamePayload[]>

const initialState: IHistoryState = {
  advanced: [],
  intermediate: [],
  beginner: [],
}

type GamePayload = {
  difficulty: Difficulty
  time: number
  owner: string
  id: number
  created_at: number
}

export const fetchGameHistory = createAsyncThunk(
  "gameHistory/fetchGameHistory",
  async () => {
    const { data } = await api.get<GETMinesweeperScoreDTO[]>(
      MINESWEEPER_SCORE_ROUTE
    )
    return data
  }
)

export const postGameScore = createAsyncThunk(
  "gameHistory/postGameHistory",
  async (game: Omit<GamePayload, "id">, { dispatch }) => {
    const score: POSTMinesweeperScoreDTO = {
      score: { difficulty: 1, time: game.time },
    }
    const { data } = await api.post<GETMinesweeperScoreDTO>(
      MINESWEEPER_SCORE_ROUTE,
      score
    )
    dispatch(addGame(makeGamePayloadFromDTO(data)))
  }
)

const makeGamePayloadFromDTO = (dto: GETMinesweeperScoreDTO): GamePayload => {
  switch (dto.difficulty) {
    case minesweeperAPIDifficultyTypes.BEGINNER:
      return { ...dto, difficulty: "beginner" }
    case minesweeperAPIDifficultyTypes.INTERMEDIATE:
      return { ...dto, difficulty: "intermediate" }
    case minesweeperAPIDifficultyTypes.ADVANCED:
      return { ...dto, difficulty: "advanced" }
  }
}

export const gameHistorySlice = createSlice({
  initialState,
  name: "gameHistory",
  reducers: {
    addGame: (state, action: PayloadAction<GamePayload>) => {
      switch (action.payload.difficulty) {
        case "advanced":
          state.advanced.push(action.payload)
          break
        case "intermediate":
          state.intermediate.push(action.payload)
          break
        case "beginner":
          state.beginner.push(action.payload)
          break
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchGameHistory.fulfilled,
      (state, action: PayloadAction<GETMinesweeperScoreDTO[]>) => {
        state.advanced = []
        state.beginner = []
        state.intermediate = []
        for (const score of action.payload) {
          const game = makeGamePayloadFromDTO(score)
          state[game.difficulty].push(game)
        }
      }
    )
  },
})

export const { addGame } = gameHistorySlice.actions
export default gameHistorySlice.reducer
