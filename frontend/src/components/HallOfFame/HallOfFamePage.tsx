import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameHistory } from "../../features/game-history/gameHistorySlice";
import { AppDispatch, RootState } from "../../store";
import { ScoreListItem } from "./ScoreListItem";
import { Tab } from "./Tab";

type Difficulty = "advanced" | "intermediate" | "beginner";

const tabs: Difficulty[] = ["beginner", "intermediate", "advanced"];

export const HallOfFamePage: React.FC = () => {
  const history = useSelector((state: RootState) => state.gameHistory);
  const dispatch = useDispatch<AppDispatch>();
  const [tabIndex, setTabIndex] = useState<Difficulty>("beginner");

  useEffect(() => {
    dispatch(fetchGameHistory());
  }, []);
  return (
    <div className="bg-white pt-4 min-h-full">
      <h3 className="font-custom underline text-3xl mt-6 text-center mx-auto mb-4">
        The hall of fame
      </h3>
      <div className="mb-16">
        {history[tabIndex].map((score, i) => (
          <ScoreListItem
            idx={i}
            time={score.time}
            username={score.owner}
            key={score.id}
          />
        ))}
      </div>
      <div className="fixed bottom-0 w-full z-10 bg-blue-300">
        <ul className="flex justify-evenly">
          {tabs.map((difficulty) => (
            <Tab
              active={tabIndex === difficulty}
              onClick={() => setTabIndex(difficulty)}
              key={difficulty}
            >
              {difficulty}
            </Tab>
          ))}
        </ul>
      </div>
    </div>
  );
};
