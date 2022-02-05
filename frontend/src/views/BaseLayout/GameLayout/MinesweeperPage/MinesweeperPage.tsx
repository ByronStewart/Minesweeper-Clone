import React, { useEffect, useRef } from "react";
import { sampleSize, flatten } from "lodash";

const numRows = 20;
const numCols = 15;
const fillstyle = "grey";
const strokestyle = "#000";
const size = 30;
const numMines = 30;

type Props = {};

enum visibilityState {
  FLAGGED,
  REVEALED,
  HIDDEN,
}

class Tile {
  x: number;
  y: number;
  i: number;
  j: number;
  cx: number;
  cy: number;
  size: number;
  visibility = visibilityState.HIDDEN;
  numAdjacentMines = 0;
  flagged = false;
  constructor(x: number, y: number, i: number, j: number, size: number) {
    this.size = size;
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.cx = x + size / 2;
    this.cy = y + size / 2;
  }
  draw(ctx: CanvasRenderingContext2D) {
    switch (this.visibility) {
      case visibilityState.FLAGGED:
        ctx.strokeStyle = strokestyle;
        ctx.fillStyle = "gold";
        ctx.strokeRect(this.x, this.y, this.x + size, this.y + size);
        ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        ctx.fillStyle = "#000";
        ctx.fillText("F", this.cx, this.cy);
        break;

      case visibilityState.HIDDEN:
        ctx.strokeStyle = strokestyle;
        ctx.fillStyle = fillstyle;
        ctx.strokeRect(this.x, this.y, this.x + size, this.y + size);
        ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        break;

      case visibilityState.REVEALED:
        ctx.strokeStyle = strokestyle;
        switch (this.numAdjacentMines) {
          case -1:
            ctx.fillStyle = "red";
            break;
          case 0:
            ctx.fillStyle = "blanchedalmond";
            break;
          case 1:
            ctx.fillStyle = "blue";
            break;
          case 2:
            ctx.fillStyle = "green";
            break;
          case 3:
            ctx.fillStyle = "pink";
            break;
          case 4:
            ctx.fillStyle = "cyan";
            break;
          case 5:
            ctx.fillStyle = "fuchsia";
            break;
          case 6:
            ctx.fillStyle = "aquamarine";
            break;
          case 7:
            ctx.fillStyle = "beige";
            break;
          case 8:
            ctx.fillStyle = "yellow";
            break;
          default:
            ctx.fillStyle = fillstyle;
            break;
        }
        ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        ctx.strokeRect(this.x, this.y, this.x + size, this.y + size);
        if (this.numAdjacentMines !== 0) {
          ctx.fillStyle = "#000";
          ctx.fillText(this.numAdjacentMines.toString(), this.cx, this.cy);
        }
        break;

      default:
        break;
    }
  }
  reveal() {
    this.visibility = visibilityState.REVEALED;
    return this.numAdjacentMines;
  }
  flag() {
    switch (this.visibility) {
      case visibilityState.REVEALED:
        return false;

      case visibilityState.FLAGGED:
        this.visibility = visibilityState.HIDDEN;
        return true;

      case visibilityState.HIDDEN:
        this.visibility = visibilityState.FLAGGED;
        return true;

      default:
        return false;
    }
  }
}

class Minesweeperboard {
  tiles: Tile[][] = [];
  minesRemaining: number;
  unseenTilesRemaining: number;
  constructor(
    numRows: number,
    numCols: number,
    size: number,
    numMines: number
  ) {
    this.minesRemaining = numMines;
    this.unseenTilesRemaining = numRows * numCols - numMines;
    console.log(this.unseenTilesRemaining);
    // Empty grid
    let i = 0;
    let j = 0;
    for (let x = 0; x < numRows * size; x += size) {
      this.tiles.push([]);
      for (let y = 0; y < numCols * size; y += size) {
        this.tiles[i].push(new Tile(x, y, i, j, size));
        j++;
      }
      i++;
      j = 0;
    }
    // fill grid with mines
    const mines = sampleSize(flatten(this.tiles), numMines);
    for (const tile of mines) {
      tile.numAdjacentMines = -1;
      for (const neighbor of this.getNeighbours(tile.i, tile.j)) {
        if (neighbor.numAdjacentMines !== -1) {
          neighbor.numAdjacentMines++;
        }
      }
    }
  }
  getNeighbours(i: number, j: number) {
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
    for (const [di, dj] of options) {
      const ni = i + di;
      const nj = j + dj;
      if (ni < 0 || ni >= numRows || nj < 0 || nj >= numCols) {
        continue;
      }
      neighbours.push(this.tiles[ni][nj]);
    }
    return neighbours;
  }
  /**
   * Reveal tiles with DFS
   */
  revealTiles(i: number, j: number) {
    const currentTile = this.tiles[i][j];

    // hit a mine
    if (currentTile.numAdjacentMines === -1) {
      currentTile.reveal();
      return this.gameOver();
    }

    // already seen
    if (currentTile.visibility === visibilityState.REVEALED) {
      return;
    }

    let q = [currentTile];
    let seen = new Set<string>();
    while (q.length !== 0) {
      const tile = q.pop() as Tile;
      const coord = `(${tile.i}, ${tile.j})`;
      if (seen.has(coord)) {
        continue;
      }
      seen.add(coord);
      const minesAdj = tile.reveal();
      if (minesAdj === 0) {
        const neighbors = this.getNeighbours(tile.i, tile.j);
        for (const n of neighbors) {
          if (n.visibility !== visibilityState.REVEALED) {
            q.push(n);
          }
        }
      }
    }
    this.unseenTilesRemaining -= seen.size;
    console.log(this.unseenTilesRemaining);
    if (this.unseenTilesRemaining === 0) {
      this.gameWon();
    }
  }
  gameOver() {
    alert("game over");
  }
  gameWon() {
    alert("congratulations you have won");
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        this.tiles[i][j].draw(ctx);
      }
    }
    requestAnimationFrame(() => this.draw(ctx));
  }
}

function handleReveal(e: MouseEvent, board: Minesweeperboard) {
  // ensure it is a left click
  if (e.button !== 0) {
    return;
  }
  const i = Math.floor(e.offsetX / size);
  const j = Math.floor(e.offsetY / size);
  board.revealTiles(i, j);
}
function handleFlag(e: MouseEvent, board: Minesweeperboard) {
  const i = Math.floor(e.offsetX / size);
  const j = Math.floor(e.offsetY / size);
  board.tiles[i][j].flag();
}

const MinesweeperPage = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animation: number | undefined = undefined;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.font = "15px Arial";
        const board = new Minesweeperboard(numRows, numCols, size, numMines);
        canvas.addEventListener("mouseup", (e) => handleReveal(e, board));
        canvas.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          handleFlag(e, board);
        });
        board.draw(ctx);
        animation = requestAnimationFrame(() => board.draw(ctx));
      }
    }
    return () => {
      if (animation) {
        cancelAnimationFrame(animation);
      }
    };
  }, []);
  return (
    <div>
      <div>The minesweeper page</div>
      <canvas
        ref={canvasRef}
        width={numRows * size}
        height={numCols * size}
        style={{ backgroundColor: "white" }}
      ></canvas>
    </div>
  );
};

export default MinesweeperPage;
