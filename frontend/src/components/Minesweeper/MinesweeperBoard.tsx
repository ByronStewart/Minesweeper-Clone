import React, { useEffect, useRef } from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import {
  incrementTime,
  loseGame,
  resetGame,
  startGame,
  winGame,
} from "../../features/current-game/currentGameSlice"
import { RevealStates } from "../../features/current-game/interfaces"
import { TileComponent } from "./Tile/TileComponent"

type Props = {
  flagOnTouch: boolean
}

const MinesweeperBoard: React.FC<Props> = ({ flagOnTouch }) => {
  const gameState = useSelector((state: RootState) => state.currentGame)
  const dispatch = useDispatch<AppDispatch>()

  const timer = useRef<NodeJS.Timer | undefined>(undefined)

  const checkAndHandleGameOver = () => {
    let numRevealedTiles = 0
    for (const row of gameState.board) {
      for (const tile of row) {
        if (tile.revealState == RevealStates.REVEALED) {
          // check for revealed mine
          if (tile.minesAdjacent === -1) {
            // game is over
            // clear the game timer
            dispatch(loseGame())
            return
          }
          // add to the revealed count if is revealed
          numRevealedTiles++
        }
      }
    }
    // check if all the tiles that need to be revealed are revealed
    const numTilesNeededToReveal =
      gameState.options.numCols * gameState.options.numRows -
      gameState.options.numMines
    if (numRevealedTiles == numTilesNeededToReveal) {
      // successfully cleared all the mines

      dispatch(winGame())
    }
  }
  const cleanupGameEnd = () => {
    if (timer.current) {
      clearInterval(timer.current)
    }
  }

  const handleGameStart = () => {
    dispatch(startGame())
    timer.current = setInterval(() => {
      dispatch(incrementTime())
    }, 1000)
  }

  // clean up
  useEffect(() => {
    return () => {
      cleanupGameEnd()
      dispatch(resetGame())
    }
  }, [])

  // check for game over on state change
  useEffect(() => {
    if (gameState.gameState === "running") {
      checkAndHandleGameOver()
    } else {
      cleanupGameEnd()
    }
  }, [gameState])

  let gridsize: string
  switch (gameState.options.difficulty) {
    case "beginner":
      gridsize = "40px"
      break
    case "intermediate":
      gridsize = "30px"
      break
    case "advanced":
      gridsize = "30px"
      break
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gameState.options.numCols}, ${gridsize})`,
        gridTemplateRows: `repeat(${gameState.options.numRows}, ${gridsize})`,
      }}
    >
      {gameState.board.map((row) =>
        row.map((cell) => (
          <TileComponent
            flagOnTouch={flagOnTouch}
            key={`${cell.x},${cell.y}`}
            handleGameStart={handleGameStart}
            cell={cell}
          />
        ))
      )}
    </div>
  )
}
export default MinesweeperBoard
