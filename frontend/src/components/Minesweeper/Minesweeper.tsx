import React, { useEffect, useRef } from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import {
  incrementTime,
  loseGame,
  resetGame,
  startGame,
  winGame,
} from "../../features/game/currentGameSlice"
import { RevealStates } from "../../features/game/interfaces"
import { TileComponent } from "./TileComponent"

type Props = {}

const Minesweeper: React.FC<Props> = ({}) => {
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
            cleanupGameEnd()
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
      cleanupGameEnd()
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
    }
  }, [gameState])

  return (
    <div
      className="grid m-6"
      style={{
        gridTemplateColumns: `repeat(${gameState.options.numCols}, 40px)`,
        gridTemplateRows: `repeat(${gameState.options.numRows}, 40px)`,
      }}
    >
      {gameState.board.map((row, y) =>
        row.map((cell, x) => (
          <TileComponent
            handleGameStart={handleGameStart}
            handleGameOver={checkAndHandleGameOver}
            cell={cell}
          />
        ))
      )}
    </div>
  )
}
export default Minesweeper
