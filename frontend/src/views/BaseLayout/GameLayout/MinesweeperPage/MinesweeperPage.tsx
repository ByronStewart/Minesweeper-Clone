import { useEffect, useMemo, useState } from "react";
import { json } from "stream/consumers";
import Minesweeper, {
  difficultyTypes,
} from "../../../../components/Minesweeper/Minesweeper";
import { useAuth } from "../../../../hooks/useAuth";
import {
  GETMinesweeperScoreDTO,
  minesweeperAPIDifficultyTypes,
  POSTMinesweeperScoreDTO,
} from "../../../../interfaces/MinesweeperScoreDTO";
import {
  BASE_API_URL,
  MINESWEEPER_SCORE_ROUTE,
} from "../../../../utils/constants";

interface IHistory {
  player: string;
  timer: number;
  difficulty: difficultyTypes;
}
const difficultyNumberToString = (n: minesweeperAPIDifficultyTypes) => {
  switch (n) {
    case minesweeperAPIDifficultyTypes.BEGINNER:
      return difficultyTypes.BEGINNER;
    case minesweeperAPIDifficultyTypes.INTERMEDIATE:
      return difficultyTypes.INTERMEDIATE;
    case minesweeperAPIDifficultyTypes.ADVANCED:
      return difficultyTypes.ADVANCED;
  }
};

const difficultyStringToNumber = (
  s: difficultyTypes
): minesweeperAPIDifficultyTypes => {
  switch (s) {
    case difficultyTypes.ADVANCED:
      return minesweeperAPIDifficultyTypes.ADVANCED;
    case difficultyTypes.INTERMEDIATE:
      return minesweeperAPIDifficultyTypes.INTERMEDIATE;
    case difficultyTypes.BEGINNER:
      return minesweeperAPIDifficultyTypes.BEGINNER;
  }
};

type Props = {};

const MinesweeperPage: React.FC<Props> = () => {
  const [difficulty, setDifficulty] = useState<difficultyTypes>(
    difficultyTypes.BEGINNER
  );
  const auth = useAuth();
  const [history, setHistory] = useState<IHistory[]>([]);
  const handleWin = async (timer: number, difficulty: difficultyTypes) => {
    // post the win if logged in
    if (auth.user) {
      // post the new score to the api
      const body: POSTMinesweeperScoreDTO = {
        score: {
          difficulty: difficultyStringToNumber(difficulty),
          time: timer,
        },
      };
      debugger;
      const response = await fetch(MINESWEEPER_SCORE_ROUTE, {
        method: "POST",
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data: GETMinesweeperScoreDTO = await response.json();
        return setHistory((history) => [
          ...history,
          {
            player: data.owner,
            timer: data.time,
            difficulty: difficultyNumberToString(data.difficulty),
          },
        ]);
      }
    }
    setHistory((history) => [
      ...history,
      {
        player: "you",
        timer,
        difficulty,
      },
    ]);
  };
  const filteredHistory = useMemo(
    () => history.filter((x) => x.difficulty === difficulty),
    [history, difficulty]
  );

  useEffect(() => {
    fetch(MINESWEEPER_SCORE_ROUTE)
      .then((res) => res.json())
      .then((json: GETMinesweeperScoreDTO[]) => {
        const history = json.map((x) => ({
          player: x.owner,
          timer: x.time,
          difficulty: difficultyNumberToString(x.difficulty),
        }));
        setHistory(history);
      });
  }, []);

  return (
    <div>
      <div>The minesweeper page</div>
      <div className="flex">
        <Minesweeper
          onGameWon={handleWin}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <div>
          TODO. the game history, should be saved in client if no user but{" "}
          {filteredHistory.map(({ player, difficulty, timer }, i) => (
            <p key={i}>
              {player} won on {difficulty} in {timer} seconds
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinesweeperPage;
