import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { gameStates } from "../../services/Minesweeper/game"
import { ADVANCED, BEGINNER, INTERMEDIATE } from "./constants"
import { Difficulty, IGameState, IMinesweeperOptions } from "./interfaces"

const initialState: IGameState = {
  gameProperties: {
    time: 0,
    numMinesRemaining: getInitialMinesRemainingFromOptions(BEGINNER),
  },
  gameState: "awaiting options",
  options: BEGINNER,
}

function getInitialMinesRemainingFromOptions(options: IMinesweeperOptions) {
  return options.numMines
}

export const currentGameSlice = createSlice({
  name: "currentGame",
  initialState,
  reducers: {
    setDifficultyEasy: (state) => {
      state.options = BEGINNER
      state.gameState = "pending"
    },
    setDifficultyMedium: (state) => {
      state.options = INTERMEDIATE
      state.gameState = "pending"
    },
    setDifficultyHard: (state) => {
      state.options = ADVANCED
      state.gameState = "pending"
    },
    updateTime: (state, action: PayloadAction<number>) => {
      if (state.gameState == "running") {
        state.gameProperties.time = action.payload
      }
    },
    updateMinesRemaining: (state, action: PayloadAction<number>) => {
      if (state.gameState == "running") {
        state.gameProperties.numMinesRemaining = action.payload
      }
    },
    resetGame: (state) => {
      state.gameProperties.time = 0
      state.gameProperties.numMinesRemaining =
        getInitialMinesRemainingFromOptions(state.options)
      state.gameState = "pending"
    },
    startGame: (state) => {
      state.gameProperties = {
        time: 0,
        numMinesRemaining: getInitialMinesRemainingFromOptions(state.options),
      }
      state.gameState = "running"
    },
    loseGame: (state) => {
      state.gameState = "finishedfailure"
    },
    winGame: (state) => {
      state.gameState = "finishedsuccess"
    },
  },
})

export const {
  loseGame,
  resetGame,
  setDifficultyEasy,
  setDifficultyHard,
  setDifficultyMedium,
  startGame,
  updateMinesRemaining,
  updateTime,
  winGame,
} = currentGameSlice.actions
export default currentGameSlice.reducer
