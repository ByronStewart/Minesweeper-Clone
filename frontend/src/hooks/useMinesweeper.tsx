import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { flagTile, startGame } from "../features/game/currentGameSlice"
import { AppDispatch, RootState } from "../store"

interface IMinesweeperOptions {
  numRows: number
  numCols: number
  numMines: number
  difficulty: Difficulty
}

const BEGINNER: IMinesweeperOptions = {
  numRows: 9,
  numCols: 9,
  numMines: 5,
  difficulty: "beginner",
}

const INTERMEDIATE: IMinesweeperOptions = {
  numRows: 16,
  numCols: 16,
  numMines: 40,
  difficulty: "intermediate",
}
const initialGameState = {
  time: 0,
  numMinesRemaining: 0,
  isGameOver: true,
  options: BEGINNER,
}

const ADVANCED: IMinesweeperOptions = {
  numRows: 16,
  numCols: 30,
  numMines: 99,
  difficulty: "advanced",
}

type Difficulty = "beginner" | "intermediate" | "advanced"
type Time = number

interface IGameState {
  time: number
  numMinesRemaining: number
  isGameOver: boolean
  options: IMinesweeperOptions
}

type SetDifficultyAction = {
  type: "setDifficulty"
  payload: Difficulty
}
type updateTimeAction = {
  type: "updateTime"
  payload: number
}
type updateMinesRemainingAction = {
  type: "updateMinesRemaining"
  payload: number
}
type resetGameAction = {
  type: "resetGame"
}
type GameStateActions =
  | SetDifficultyAction
  | updateTimeAction
  | updateMinesRemainingAction
  | resetGameAction

const currentGameStateReducer = (
  state: IGameState,
  action: GameStateActions
): IGameState => {
  switch (action.type) {
    case "setDifficulty":
      switch (action.payload) {
        case "advanced":
          return {
            ...state,
            options: ADVANCED,
          }
        case "intermediate":
          return {
            ...state,
            options: INTERMEDIATE,
          }
        case "beginner":
          return {
            ...state,
            options: BEGINNER,
          }
      }
    case "updateTime":
      return {
        ...state,
        time: action.payload,
      }
    case "updateMinesRemaining":
      return {
        ...state,
        numMinesRemaining: action.payload,
      }
    case "resetGame":
      return {
        ...initialGameState,
        options: state.options,
      }
  }
}

const minesweeperContext = createContext<IMinesweeper>(undefined!)

export const useMinesweeper = () => useContext(minesweeperContext)

interface IMinesweeper {}

export const useProvideMinesweeper = (): IMinesweeper => {
  const dispatch = useDispatch<AppDispatch>()
  const game = useSelector((state: RootState) => state.currentGame)

  //   const revealTile = (x: number, y: number) => {
  //     // do nothing if the game is not setup correctly
  //     if (game.gameState != "running" && game.gameState !== "pending") {
  //       return
  //     }

  //     if (game.gameState == "pending") {
  //       dispatch(startGame())
  //     }
  //     dispatch(flagTile({ x, y }))
  //   }
  return {}
}

export const ProvideMinesweeper: React.FC = ({ children }) => {
  const minesweeper = useProvideMinesweeper()
  return (
    <minesweeperContext.Provider value={minesweeper}>
      {children}
    </minesweeperContext.Provider>
  )
}
