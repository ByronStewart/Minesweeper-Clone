import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { number } from "yup/lib/locale"
import { gameStates, revealTypes } from "../../services/Minesweeper/game"
import { AppDispatch, RootState } from "../../store"
import { ADVANCED, BEGINNER, INTERMEDIATE } from "./constants"
import {
  Difficulty,
  IGameState,
  IMinesweeperOptions,
  RevealStates,
} from "./interfaces"
import {
  generateInitialBoard,
  getInitialMinesRemainingFromOptions,
} from "./utils"

export const initialState: IGameState = {
  gameProperties: {
    time: 0,
    numMinesRemaining: getInitialMinesRemainingFromOptions(BEGINNER),
  },
  gameState: "awaiting options",
  options: BEGINNER,
  board: generateInitialBoard(
    BEGINNER.numRows,
    BEGINNER.numCols,
    BEGINNER.numMines
  ),
}

// const doRevealTile = createAction()

// export const doRevealTile =
//   (x: number, y: number) =>
//   (dispatch: AppDispatch, getState: () => RootState) => {
//     const game = getState().currentGame
//     // do nothing if the game is not setup correctly
//     if (game.gameState != "running" && game.gameState !== "pending") {
//       return
//     }

//     if (game.gameState == "pending") {
//       dispatch(startGame())
//     }
//     dispatch(flagTile({ x, y }))
//   }

export const currentGameSlice = createSlice({
  name: "currentGame",
  initialState,
  reducers: {
    setDifficultyEasy: (state) => {
      state.gameProperties.time = 0
      state.gameProperties.numMinesRemaining = BEGINNER.numMines
      state.options = BEGINNER
      state.gameState = "pending"
      state.board = generateInitialBoard(
        BEGINNER.numRows,
        BEGINNER.numCols,
        BEGINNER.numMines
      )
    },
    setDifficultyMedium: (state) => {
      state.gameProperties.time = 0
      state.gameProperties.numMinesRemaining = INTERMEDIATE.numMines
      state.options = INTERMEDIATE
      state.gameState = "pending"
      state.board = generateInitialBoard(
        INTERMEDIATE.numRows,
        INTERMEDIATE.numCols,
        INTERMEDIATE.numMines
      )
    },
    setDifficultyHard: (state) => {
      state.gameProperties.time = 0
      state.gameProperties.numMinesRemaining = ADVANCED.numMines
      state.options = ADVANCED
      state.gameState = "pending"
      state.board = generateInitialBoard(
        ADVANCED.numRows,
        ADVANCED.numCols,
        ADVANCED.numMines
      )
    },
    updateTime: (state, action: PayloadAction<number>) => {
      if (state.gameState == "running") {
        state.gameProperties.time = action.payload
      }
    },
    getOptions: (state) => {
      state.gameState = "awaiting options"
    },
    removeHighlightTile: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const { x, y } = action.payload
      state.board[y][x].isHighlighted = false
    },
    highlightTile: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload
      state.board[y][x].isHighlighted = true
    },
    revealTile: (state, action: PayloadAction<{ x: number; y: number }[]>) => {
      for (const { x, y } of action.payload) {
        state.board[y][x].revealState = RevealStates.REVEALED
      }
    },
    flagTile: (
      state,
      action: PayloadAction<{ x: number; y: number; toFlag: boolean }>
    ) => {
      const { x, y, toFlag } = action.payload
      if (toFlag) {
        state.board[y][x].revealState = RevealStates.FLAGGED
        state.gameProperties.numMinesRemaining--
      } else {
        state.board[y][x].revealState = RevealStates.HIDDEN
        state.gameProperties.numMinesRemaining++
      }
    },
    incrementTime: (state) => {
      state.gameProperties.time += 1
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
      state.board = generateInitialBoard(
        state.options.numRows,
        state.options.numCols,
        state.options.numMines
      )
    },
    startGame: (state) => {
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
  revealTile,
  flagTile,
  highlightTile,
  incrementTime,
  removeHighlightTile,
  getOptions,
} = currentGameSlice.actions
export default currentGameSlice.reducer
