export enum minesweeperAPIDifficultyTypes {
  BEGINNER = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
}

export interface POSTMinesweeperScoreDTO {
  score: {
    time: number;
    difficulty: minesweeperAPIDifficultyTypes;
  };
}

export interface GETMinesweeperScoreDTO {
  time: number;
  difficulty: minesweeperAPIDifficultyTypes;
  owner: string;
  id: number;
  created_at: Date;
}
