import { useDispatch, useSelector } from "react-redux"
import { useSwipeable } from "react-swipeable"
import {
  flagTile,
  highlightTile,
  incrementTime,
  removeHighlightTile,
  revealTile,
  startGame,
} from "../../../features/game/currentGameSlice"
import { RevealStates, Tile } from "../../../features/game/interfaces"
import { getNeighbours } from "../../../features/game/utils"
import { useToggle } from "../../../hooks/useToggle"
import { AppDispatch, RootState } from "../../../store"
import { SwipeOptionsModal } from "../SwipeOptionsModal"
import { FaBomb, FaFlag } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from "react"

const findTilesToReveal = (cell: Tile, board: Tile[][]): Tile[] => {
  if (cell.minesAdjacent !== 0) {
    return [cell]
  }
  // dfs all available tiles to reveal
  const queue: Tile[] = [cell]
  const tilesFound: Tile[] = []
  const seen = new Set<string>()
  while (queue.length !== 0) {
    const cell = queue.pop()!
    const coord = `${cell.x},${cell.y}`
    if (seen.has(coord)) {
      continue
    }
    seen.add(coord)
    tilesFound.push(cell)
    if (cell.minesAdjacent === 0) {
      const neighbors = getNeighbours(cell.x, cell.y, board)
      for (const n of neighbors) {
        if (n.revealState == RevealStates.HIDDEN) {
          queue.push(n)
        }
      }
    }
  }
  return tilesFound
}

function getTextColorAndSize(
  minesAdjacent: number,
  difficulty: "beginner" | "intermediate" | "advanced"
) {
  let ans = ""
  switch (minesAdjacent) {
    case 1:
      ans += "text-blue-700"
      break
    case 2:
      ans += "text-green-700"
      break
    case 3:
      ans += "text-red-700"
      break
    case 4:
      ans += "text-purple-700"
      break
    case 5:
      ans += "text-pink-700"
      break
    case 6:
      ans += "text-orange-700"
      break
    case 7:
      ans += "text-slate-700"
      break
    case 8:
      ans += "text-zinc-700"
      break
    default:
      break
  }
  switch (difficulty) {
    case "beginner":
      ans += " text-2xl"
      break
    case "intermediate":
      ans += " text-xl"
      break
    case "advanced":
      ans += " text-xl"
  }

  return ans
}

interface Props {
  cell: Tile
  handleGameStart: VoidFunction
  flagOnTouch: boolean
}
export const TileComponent: React.FC<Props> = ({
  cell,
  handleGameStart,
  flagOnTouch,
}) => {
  const { gameState, board, options } = useSelector(
    (state: RootState) => state.currentGame
  )
  const dispatch = useDispatch<AppDispatch>()

  const isGameInPlayableState = () => {
    if (gameState == "pending" || gameState == "running") {
      if (gameState == "pending") {
        handleGameStart()
      }
      return true
    }
    return false
  }

  const handleFlag = () => {
    if (isGameInPlayableState()) {
      switch (cell.revealState) {
        case RevealStates.REVEALED:
          // do nothing
          return
        case RevealStates.FLAGGED:
          // unflag
          dispatch(flagTile({ x: cell.x, y: cell.y, toFlag: false }))
          break
        case RevealStates.HIDDEN:
          // flag
          dispatch(flagTile({ x: cell.x, y: cell.y, toFlag: true }))
          break
      }
    }
  }

  const handleReveal = () => {
    if (isGameInPlayableState()) {
      switch (cell.revealState) {
        case RevealStates.REVEALED:
          // do nothing
          return
        case RevealStates.FLAGGED:
          // unflag
          dispatch(flagTile({ x: cell.x, y: cell.y, toFlag: false }))
          break
        case RevealStates.HIDDEN:
          // reveal
          dispatch(revealTile(findTilesToReveal(cell, board)))
          break
      }
    }
  }
  const props: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = {
    onClick: () => {
      if (flagOnTouch) {
        handleFlag()
      } else {
        handleReveal()
      }
    },
    onContextMenu: (e) => {
      e.preventDefault()
      handleFlag()
    },
  }
  const extraBorderLeft = cell.x === 0 ? "border-l" : ""
  const extraBorderTop = cell.y === 0 ? "border-t" : ""

  const border = "border-b border-r " + extraBorderLeft + " " + extraBorderTop

  const hiddenBgColor =
    (cell.x % 2 === 0 && cell.y % 2 === 0) ||
    (cell.x % 2 === 1 && cell.y % 2 === 1)
      ? "bg-blue-400"
      : "bg-blue-500"

  const flagBgColor =
    (cell.x % 2 === 0 && cell.y % 2 === 0) ||
    (cell.x % 2 === 1 && cell.y % 2 === 1)
      ? "bg-rose-500"
      : "bg-rose-600"

  const revealedBgColor =
    (cell.x % 2 === 0 && cell.y % 2 === 0) ||
    (cell.x % 2 === 1 && cell.y % 2 === 1)
      ? "bg-gray-100"
      : "bg-gray-200"
  //const revealedBgColor = "bg-blue-100"
  const commonClasses =
    "relative cursor-pointer text-center flex justify-center items-center font-semibold border-black text-center font-custom leading-10 select-none" +
    " " +
    border +
    " " +
    getTextColorAndSize(cell.minesAdjacent, options.difficulty)

  if (gameState == "finishedfailure") {
    switch (cell.revealState) {
      case RevealStates.FLAGGED:
        return (
          <div
            {...props}
            className={commonClasses + " " + flagBgColor + " " + "text-black"}
          >
            {cell.minesAdjacent === -1 ? <FaFlag /> : <ImCross />}
          </div>
        )
      case RevealStates.HIDDEN:
        return (
          <div
            {...props}
            className={commonClasses + " " + hiddenBgColor + " " + "text-black"}
          >
            {cell.minesAdjacent === -1 ? <FaBomb /> : ""}
          </div>
        )
      case RevealStates.REVEALED:
        const color = cell.minesAdjacent === -1 ? flagBgColor : revealedBgColor
        return (
          <div {...props} className={commonClasses + " " + color}>
            {cell.minesAdjacent === -1 ? (
              <FaBomb />
            ) : cell.minesAdjacent === 0 ? (
              ""
            ) : (
              cell.minesAdjacent
            )}
          </div>
        )
    }
  }

  switch (cell.revealState) {
    case RevealStates.FLAGGED:
      return (
        <div
          {...props}
          className={commonClasses + " " + flagBgColor + " text-black"}
        >
          <FaFlag />
        </div>
      )
    case RevealStates.HIDDEN:
      return (
        <div {...props} className={commonClasses + " " + hiddenBgColor}></div>
      )
    case RevealStates.REVEALED:
      return (
        <div {...props} className={commonClasses + " " + revealedBgColor}>
          {cell.minesAdjacent === -1 ? (
            <FaBomb />
          ) : cell.minesAdjacent === 0 ? (
            ""
          ) : (
            cell.minesAdjacent
          )}
        </div>
      )
  }
}
