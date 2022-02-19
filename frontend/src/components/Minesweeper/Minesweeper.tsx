import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  gameStates,
  Minesweeperboard,
  revealTypes,
} from "../../services/Minesweeper/game";

export enum difficultyTypes {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}
interface IMinesweeperOptions {
  numRows: number;
  numCols: number;
  numMines: number;
  str: difficultyTypes;
}

const BEGINNER: IMinesweeperOptions = {
  numRows: 9,
  numCols: 9,
  numMines: 5,
  str: difficultyTypes.BEGINNER,
};

const INTERMEDIATE: IMinesweeperOptions = {
  numRows: 16,
  numCols: 16,
  numMines: 40,
  str: difficultyTypes.INTERMEDIATE,
};

const ADVANCED: IMinesweeperOptions = {
  numRows: 16,
  numCols: 30,
  numMines: 99,
  str: difficultyTypes.ADVANCED,
};

const size = 32;

type Props = {
  onGameWon: (timer: number, difficulty: difficultyTypes) => void;
  difficulty: difficultyTypes;
  setDifficulty: React.Dispatch<React.SetStateAction<difficultyTypes>>;
};

const Minesweeper: React.FC<Props> = ({
  onGameWon,
  difficulty,
  setDifficulty,
}) => {
  const [gameOptions, setGameOptions] = useState<IMinesweeperOptions>(() => {
    switch (difficulty) {
      case difficultyTypes.BEGINNER:
        return BEGINNER;
      case difficultyTypes.INTERMEDIATE:
        return INTERMEDIATE;
      case difficultyTypes.ADVANCED:
        return ADVANCED;
    }
  });
  const [time, setTime] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const [numMinesRemaining, setNumMinesRemaining] = useState(
    gameOptions.numMines
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // make a reference to the minesweeperboard class to use in the component
  const boardRef = useRef<Minesweeperboard | null>(null);

  const handleReveal = useCallback(
    (e: MouseEvent, board: Minesweeperboard | null) => {
      const i = Math.floor(e.offsetY / size);
      const j = Math.floor(e.offsetX / size);
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
    []
  );

  // resets the game
  // TODO provide options and a form to select how to play
  const resetGame = (difficulty?: IMinesweeperOptions) => {
    console.log("resetting game", difficulty);
    if (difficulty) {
      setGameOptions(difficulty);
    } else {
      setGameOptions((opt) => ({ ...opt }));
    }
    setGameMessage("");
  };

  // will create a blank board on the canvas and add event listeners to play the game
  // will run on mount and resetGame
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
        // create a new minesweeper game
        boardRef.current = new Minesweeperboard(
          gameOptions.numRows,
          gameOptions.numCols,
          size,
          gameOptions.numMines,
          ctx,
          // callback to set the timer and game messages
          ({ timer, gameState, numMinesRemaining }) => {
            setTime(timer);
            setNumMinesRemaining(numMinesRemaining);
            switch (gameState) {
              case gameStates.FINISHEDFAILURE:
                setGameMessage("YOU LOSE LOSER");
                break;
              case gameStates.FINISHEDSUCCESS:
                setGameMessage("YOU'RE A WINNER");
                onGameWon(timer, gameOptions.str);
                break;
              default:
                setGameMessage("");
                break;
            }
          }
        );
        // add event listeners
        canvas.addEventListener("mouseup", mUp);
        canvas.addEventListener("contextmenu", ctxMenu);

        // start the paint loop with requestanimation frame
        boardRef.current.draw();
      }
    }
    // cleanup by removing event listeners and timers inside the board class
    return () => {
      canvas?.removeEventListener("mouseup", mUp);
      canvas?.removeEventListener("mouseup", ctxMenu);
      boardRef.current?.cleanup();
    };
  }, [gameOptions, setTime, setGameMessage, handleReveal, onGameWon]);

  function changeDifficulty(s: difficultyTypes) {
    setDifficulty(s);
    switch (s) {
      case difficultyTypes.INTERMEDIATE:
        resetGame(INTERMEDIATE);
        break;
      case difficultyTypes.BEGINNER:
        resetGame(BEGINNER);
        break;
      case difficultyTypes.ADVANCED:
        resetGame(ADVANCED);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <button
        className="bg-slate-400 border border-slate-600 hover:bg-slate-500 px-4 py-2"
        onClick={() => resetGame()}
      >
        reset
      </button>
      <div>
        timer <span className="font-bold text-xl">{time}</span> with{" "}
        {numMinesRemaining} mines remaining
      </div>
      <div>
        The message from the game:{" "}
        <span className="font-bold">{gameMessage}</span>
      </div>
      <select
        onChange={(e) => changeDifficulty(e.target.value as difficultyTypes)}
      >
        <option value={difficultyTypes.BEGINNER}>Beginner</option>
        <option value={difficultyTypes.INTERMEDIATE}>Intermediate</option>
        <option value={difficultyTypes.ADVANCED}>Advanced</option>
      </select>
      <canvas
        ref={canvasRef}
        width={gameOptions.numCols * size}
        height={gameOptions.numRows * size}
        style={{ backgroundColor: "white" }}
      ></canvas>
    </div>
  );
};

export default Minesweeper;
