import { IMinesweeperOptions } from "./interfaces"

export const BEGINNER: IMinesweeperOptions = {
  numRows: 9,
  numCols: 9,
  numMines: 5,
  difficulty: "beginner",
}

export const INTERMEDIATE: IMinesweeperOptions = {
  numRows: 16,
  numCols: 16,
  numMines: 40,
  difficulty: "intermediate",
}
export const ADVANCED: IMinesweeperOptions = {
  numRows: 16,
  numCols: 30,
  numMines: 99,
  difficulty: "advanced",
}