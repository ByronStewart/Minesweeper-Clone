import { FaBomb } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getOptions } from "../../../features/current-game/currentGameSlice";
import { AppDispatch, RootState } from "../../../store";
import { secondsToMinsAndSeconds } from "../../../common/utils";

export const MinesweeperStatusBar: React.FC = () => {
  const gameProperties = useSelector(
    (state: RootState) => state.currentGame.gameProperties
  );
  const { mins, seconds } = secondsToMinsAndSeconds(gameProperties.time);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex justify-between text-2xl bg-slate-100 ">
      <div className="ml-8 py-5">
        <FaBomb className="inline-block mr-4" />
        <span>{gameProperties.numMinesRemaining}</span>
      </div>
      <div className="py-5">
        <MdTimer className="inline-block mr-4" />
        <span>{`${mins}:${seconds >= 10 ? seconds : `0${seconds}`}`}</span>
      </div>
      <button
        className="block text-xl py-5 px-3 bg-slate-200"
        onClick={() => dispatch(getOptions())}
      >
        New Game
      </button>
    </div>
  );
};
