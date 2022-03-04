export interface IGameState {
  gameProperties: GameProperties
  gameState: GameStates
  options: IMinesweeperOptions
  board: Array<Array<Tile>>
}

export interface Tile {
  x: number
  y: number
  revealState: RevealStates
  minesAdjacent: MineStatus
  isHighlighted: boolean
}
// -1 indicates that the current tile is a mine
export type MineStatus = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export enum RevealStates {
  FLAGGED,
  REVEALED,
  HIDDEN,
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
