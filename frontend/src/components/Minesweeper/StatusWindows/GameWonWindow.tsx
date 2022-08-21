import { BiTime } from "react-icons/bi";
import {
  formatMinsAndSeconds,
  secondsToMinsAndSeconds,
} from "../../../common/utils";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { resetGame } from "../../../features/current-game/currentGameSlice";
import { useAuth } from "../../../auth/useAuth";

interface Props {}

export const GameWonWindow: React.FC<Props> = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { time } = useSelector((state: RootState) => {
    return {
      time: state.currentGame.gameProperties.time,
    };
  });
  const { mins: currentMins, seconds: currentSeconds } =
    secondsToMinsAndSeconds(time);

  return (
    <div className="text-center">
      <p className="text-xl">Time</p>
      <div className="text-lg">
        <BiTime className="inline-block mr-2" />
        <span className="inline-block">
          {formatMinsAndSeconds(currentMins, currentSeconds)}
        </span>
      </div>

      <button
        className="btn-modal mt-2 mx-auto"
        onClick={() => {
          dispatch(resetGame());
        }}
      >
        Play again
      </button>
      {!auth.user && (
        <Link className="btn-modal bg-red-400 mt-1 mx-auto" to="/login">
          Login to save scores
        </Link>
      )}
    </div>
  );
};
