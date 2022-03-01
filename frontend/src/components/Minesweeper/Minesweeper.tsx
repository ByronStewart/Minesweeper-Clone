import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  gameStates,
  Minesweeperboard,
  revealTypes,
} from "../../services/Minesweeper/game"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import {
  loseGame,
  updateMinesRemaining,
  updateTime,
  winGame,
} from "../../features/game/currentGameSlice"
const size = 32

type Props = {}

const Minesweeper: React.FC<Props> = ({}) => {
  // const canvasRef = useRef<HTMLCanvasElement>(null)
  // // make a reference to the minesweeperboard class to use in the component
  // const boardRef = useRef<Minesweeperboard | null>(null)

  // const handleReveal = useCallback(
  //   (e: MouseEvent, board: Minesweeperboard | null) => {
  //     const i = Math.floor(e.offsetY / size)
  //     const j = Math.floor(e.offsetX / size)
  //     if (board) {
  //       if (e.button === 0) {
  //         board.revealTiles(i, j, revealTypes.REVEAL)
  //         return
  //       }
  //       if (e.button === 2) {
  //         board.revealTiles(i, j, revealTypes.FLAG)
  //         return
  //       }
  //     }
  //   },
  //   []
  // )
  // useEffect(() => {
  //   function mUp(e: MouseEvent) {
  //     handleReveal(e, boardRef.current)
  //   }
  //   function ctxMenu(e: MouseEvent) {
  //     e.preventDefault()
  //   }
  //   const canvas = canvasRef.current
  //   if (canvas) {
  //     const ctx = canvasRef.current.getContext("2d")
  //     if (ctx) {
  //       // create a new minesweeper game
  //       boardRef.current = new Minesweeperboard(
  //         gameState.options.numRows,
  //         gameState.options.numCols,
  //         size,
  //         gameState.options.numMines,
  //         ctx,
  //         // callback to set the timer and game messages
  //         ({ timer, gameState: state, numMinesRemaining }) => {
  //           dispatch(updateTime(timer))
  //           dispatch(updateMinesRemaining(numMinesRemaining))
  //           switch (state) {
  //             case gameStates.FINISHEDFAILURE:
  //               dispatch(loseGame())
  //               break
  //             case gameStates.FINISHEDSUCCESS:
  //               dispatch(winGame())
  //               break
  //             default:
  //               break
  //           }
  //         }
  //       )
  //       // add event listeners
  //       canvas.addEventListener("mouseup", mUp)
  //       canvas.addEventListener("contextmenu", ctxMenu)

  //       // start the paint loop with requestanimation frame
  //       boardRef.current.draw()
  //     }
  //   }
  //   // cleanup by removing event listeners and timers inside the board class
  //   return () => {
  //     canvas?.removeEventListener("mouseup", mUp)
  //     canvas?.removeEventListener("mouseup", ctxMenu)
  //     boardRef.current?.cleanup()
  //   }
  // }, [handleReveal])
  const gameState = useSelector((state: RootState) => state.currentGame)
  const dispatch = useDispatch()

  return (
    <div>
      {/* <canvas
        ref={canvasRef}
        width={gameState.options.numCols * size}
        height={gameState.options.numRows * size}
        style={{ backgroundColor: "white" }}
      ></canvas> */}
    </div>
  )
}
export default Minesweeper
