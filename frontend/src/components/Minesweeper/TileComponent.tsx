import { useDispatch, useSelector } from "react-redux"
import { useSwipeable } from "react-swipeable"
import {
  flagTile,
  highlightTile,
  incrementTime,
  removeHighlightTile,
  revealTile,
  startGame,
} from "../../features/game/currentGameSlice"
import { RevealStates, Tile } from "../../features/game/interfaces"
import { getNeighbours } from "../../features/game/utils"
import { useToggle } from "../../hooks/useToggle"
import { AppDispatch, RootState } from "../../store"
import { SwipeOptionsModal } from "./SwipeOptionsModal"

interface Props {
  cell: Tile
  handleGameStart: VoidFunction
  handleGameOver: VoidFunction
}

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

export const TileComponent: React.FC<Props> = ({
  cell,
  handleGameStart,
  handleGameOver,
}) => {
  const { gameState, board } = useSelector(
    (state: RootState) => state.currentGame
  )
  const dispatch = useDispatch<AppDispatch>()
  const [
    isOptionsMenuOpen,
    toggleOptionsMenu,
    closeOptionsMenu,
    openOptionsMenu,
  ] = useToggle(false)
  const handlers = useSwipeable({
    onSwiped: (e) => {
      // handle cleanup
      dispatch(removeHighlightTile({ x: cell.x, y: cell.y }))
      closeOptionsMenu()
    },
    onSwipeStart: (e) => {
      // handle setup
      // open the menu to see the options
      dispatch(highlightTile({ x: cell.x, y: cell.y }))
      openOptionsMenu()
    },
    onSwipedLeft: (e) => {
      // reveal the cell
      handleReveal()
      dispatch(removeHighlightTile({ x: cell.x, y: cell.y }))
      closeOptionsMenu()
    },
    onSwipedRight: (e) => {
      // flag the cell
      handleFlag()
      dispatch(removeHighlightTile({ x: cell.x, y: cell.y }))
      closeOptionsMenu()
    },
    onSwipedUp: (e) => {
      // do nothing
      dispatch(removeHighlightTile({ x: cell.x, y: cell.y }))
      closeOptionsMenu()
    },
    onSwipedDown: (e) => {
      // reveal the cell
      dispatch(removeHighlightTile({ x: cell.x, y: cell.y }))
      closeOptionsMenu()
    },
    onTap: () => {
      // reveal the tile
      handleReveal()
      closeOptionsMenu()
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
    delta: 40,
  })
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
      handleGameOver()
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
      handleGameOver()
    }
  }

  return (
    <div
      {...handlers}
      className={`relative cursor-pointer border border-black text-center ${
        cell.isHighlighted ? "border-red-500" : ""
      }`}
    >
      {" "}
      {isOptionsMenuOpen ? (
        <SwipeOptionsModal />
      ) : (
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            handleFlag()
          }}
        >
          {cell.revealState == RevealStates.REVEALED
            ? ""
            : cell.revealState === RevealStates.FLAGGED
            ? "🎈"
            : ""}
          {cell.minesAdjacent}
        </div>
      )}
    </div>
  )
}
