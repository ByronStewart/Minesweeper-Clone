import { RevealStates, Tile } from "../../../features/current-game/interfaces"
import { getNeighbours } from "../../../features/current-game/utils"

export const findTilesToReveal = (cell: Tile, board: Tile[][]): Tile[] => {
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

export function getTextColorAndSize(
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
