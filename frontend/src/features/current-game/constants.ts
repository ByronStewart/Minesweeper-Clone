import { IMinesweeperOptions } from "./interfaces";

export const BEGINNER: IMinesweeperOptions = {
  numRows: 11,
  numCols: 7,
  numMines: 8,
  difficulty: "beginner",
};

export const INTERMEDIATE: IMinesweeperOptions = {
  numRows: 16,
  numCols: 11,
  numMines: 25,
  difficulty: "intermediate",
};
export const ADVANCED: IMinesweeperOptions = {
  numRows: 16,
  numCols: 11,
  numMines: 40,
  difficulty: "advanced",
};
