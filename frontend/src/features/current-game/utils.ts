import { flatten, sampleSize } from "lodash";
import { IMinesweeperOptions, Tile, RevealStates } from "./interfaces";

export function generateInitialBoard(
  rows: number,
  cols: number,
  numMines: number
): Tile[][] {
  // create empty grid
  const tiles: Tile[][] = [];
  for (let y = 0; y < rows; y++) {
    tiles.push([]);
    for (let x = 0; x < cols; x++) {
      tiles[y].push({
        x,
        y,
        minesAdjacent: 0,
        revealState: RevealStates.HIDDEN,
        isHighlighted: false,
      });
    }
  }

  // fill grid with mines
  const mines = sampleSize(flatten(tiles), numMines);
  for (const tile of mines) {
    tile.minesAdjacent = -1;
    for (const neighbor of getNeighbours(tile.x, tile.y, tiles)) {
      if (neighbor.minesAdjacent !== -1) {
        neighbor.minesAdjacent++;
      }
    }
  }
  return tiles;
}

export function getNeighbours(x: number, y: number, board: Tile[][]) {
  const rows = board.length;
  const cols = board[y].length;
  const options = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [0, 1],
  ];
  let neighbours: Tile[] = [];
  for (const [dy, dx] of options) {
    const ny = y + dy;
    const nx = x + dx;
    if (ny < 0 || ny >= rows || nx < 0 || nx >= cols) {
      continue;
    }
    neighbours.push(board[ny][nx]);
  }
  return neighbours;
}

export function getInitialMinesRemainingFromOptions(
  options: IMinesweeperOptions
) {
  return options.numMines;
}
