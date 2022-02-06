import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  gameStates,
  Minesweeperboard,
  revealTypes,
} from "../../../../services/Minesweeper/game";

// const numRows = 10;
// const numCols = 10;
// const size = 30;
// const numMines = 5;

type Props = {};

const MinesweeperPage: React.FC<Props> = () => {
  const [gameOptions, setGameOptions] = useState({
    numRows: 10,
    numCols: 8,
    size: 30,
    numMines: 5,
  });
  const [bestTime, setBestTime] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Minesweeperboard | null>(null);

  const handleReveal = useCallback(
    (e: MouseEvent, board: Minesweeperboard | null) => {
      const i = Math.floor(e.offsetY / gameOptions.size);
      const j = Math.floor(e.offsetX / gameOptions.size);
      if (board) {
        if (e.button === 0) {
          board.revealTiles(i, j, revealTypes.REVEAL);
          return;
        }
        if (e.button === 2) {
          board.revealTiles(i, j, revealTypes.FLAG);
          return;
        }
      }
    },
    [gameOptions]
  );

  const resetGame = () => {
    setGameOptions((opt) => ({ ...opt }));
    setGameMessage("");
  };

  useEffect(() => {
    function mUp(e: MouseEvent) {
      handleReveal(e, boardRef.current);
    }
    function ctxMenu(e: MouseEvent) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.font = "15px Arial";
        boardRef.current = new Minesweeperboard(
          gameOptions.numRows,
          gameOptions.numCols,
          gameOptions.size,
          gameOptions.numMines,
          ctx,
          ({ timer, gameState }) => {
            if (timer) {
              setBestTime(timer);
            }
            if (gameState) {
              switch (gameState) {
                case gameStates.FINISHEDFAILURE:
                  setGameMessage("YOU LOSE LOSER");
                  break;
                case gameStates.FINISHEDSUCCESS:
                  setGameMessage("YOU'RE A WINNER");
                  break;
                default:
                  setGameMessage("");
                  break;
              }
            }
          }
        );
        canvas.addEventListener("mouseup", mUp);
        canvas.addEventListener("contextmenu", ctxMenu);
        boardRef.current.draw();
      }
    }
    return () => {
      canvas?.removeEventListener("mouseup", mUp);
      canvas?.removeEventListener("mouseup", ctxMenu);
      boardRef.current?.cleanup();
    };
  }, [gameOptions, setBestTime, setGameMessage, handleReveal]);
  return (
    <div>
      <div>The minesweeper page</div>
      <button
        className="bg-slate-400 border border-slate-600 hover:bg-slate-500 px-4 py-2"
        onClick={resetGame}
      >
        reset
      </button>
      <div>
        timer <span className="font-bold text-xl">{bestTime}</span>
      </div>
      <div>
        The message from the game:{" "}
        <span className="font-bold">{gameMessage}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={gameOptions.numCols * gameOptions.size}
        height={gameOptions.numRows * gameOptions.size}
        style={{ backgroundColor: "white" }}
      ></canvas>
    </div>
  );
};

export default MinesweeperPage;
