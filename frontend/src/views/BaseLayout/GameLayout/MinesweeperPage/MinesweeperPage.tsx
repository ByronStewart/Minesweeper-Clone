import { useState } from "react";
import Minesweeper, {
  difficultyTypes,
} from "../../../../components/Minesweeper/Minesweeper";

interface IHistory {
  timer: number;
  difficulty: difficultyTypes;
}

type Props = {};

const MinesweeperPage: React.FC<Props> = () => {
  const [history, setHistory] = useState<IHistory[]>([]);
  const handleWin = (timer: number, difficulty: difficultyTypes) => {
    setHistory((history) => [
      ...history,
      {
        timer,
        difficulty,
      },
    ]);
  };
  return (
    <div>
      <div>The minesweeper page</div>
      <div className="flex">
        <Minesweeper onGameWon={handleWin} />
        <div>
          TODO. the game history, should be saved in client if no user but{" "}
          {history.map(({ difficulty, timer }, i) => (
            <p key={i}>
              You won on {difficulty} in {timer} seconds
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinesweeperPage;
