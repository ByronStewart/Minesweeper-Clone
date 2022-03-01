export interface IGameState {
  gameProperties: GameProperties
  gameState: GameStates
  options: IMinesweeperOptions
}
export interface IMinesweeperOptions {
  numRows: number
  numCols: number
  numMines: number
  difficulty: Difficulty
}
export type Difficulty = "beginner" | "intermediate" | "advanced"

export type GameStates =
  | "running"
  | "finishedsuccess"
  | "finishedfailure"
  | "pending"
  | "awaiting options"

export type GameProperties = {
  time: number
  numMinesRemaining: number
}
