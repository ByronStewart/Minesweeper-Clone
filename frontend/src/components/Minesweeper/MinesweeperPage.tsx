import { GameLostWindow } from "./StatusWindows/GameLostWindow";
import { GameWonWindow } from "./StatusWindows/GameWonWindow";

import { DifficultySelectorWindow } from "./StatusWindows/DifficultySelectorWindow";
import { Modal } from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  resetGame,
  startGame,
  toggleFlagOnLeftClick,
} from "../../features/current-game/currentGameSlice";
import MinesweeperBoard from "./MinesweeperBoard";
import { MinesweeperStatusBar } from "./StatusWindows/MinesweeperStatusBar";
import { FaFlag } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

type Props = {};

const MinesweeperPage: React.FC<Props> = () => {
  const { gameState: gameStatus, gameProperties } = useSelector(
    (state: RootState) => state.currentGame
  );
  const dispatch = useDispatch();

  return (
    <>
      {gameStatus === "awaiting options" && (
        <Modal onClose={() => dispatch(startGame())}>
          <DifficultySelectorWindow />
        </Modal>
      )}
      {gameStatus === "finishedsuccess" && (
        <Modal onClose={() => dispatch(resetGame())}>
          <GameWonWindow />
        </Modal>
      )}
      {gameStatus === "finishedfailure" && (
        <Modal>
          <GameLostWindow />
        </Modal>
      )}

      <div className="h-full w-full flex flex-col">
        <MinesweeperStatusBar />
        <div className="flex-grow bg-gray-700 self-center w-full flex justify-center items-center">
          <MinesweeperBoard />
        </div>
        <button
          onClick={() => dispatch(toggleFlagOnLeftClick())}
          className="w-full xl:hidden bg-gray-300 text-2xl py-5 block mx-auto"
        >
          {gameProperties.flagOnLeftClick ? (
            <>
              <FaFlag className="inline-block mr-2" />
              <span>Flag</span>
            </>
          ) : (
            <>
              <FiEye className="inline-block mr-2" />
              <span>Reveal</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default MinesweeperPage;
