import React, { useEffect, useRef } from "react";
import { sampleSize, flatten } from "lodash";

const numRows = 10;
const numCols = 10;
const fillstyle = "grey";
const strokestyle = "#000";
const size = 30;
const numMines = 10;

type Props = {};

class Tile {
  x: number;
  y: number;
  i: number;
  j: number;
  cx: number;
  cy: number;
  size: number;
  revealed = false;
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
    ctx.strokeStyle = strokestyle;
    ctx.fillStyle = fillstyle;
    ctx.strokeRect(this.x, this.y, this.x + size, this.y + size);
    if (this.revealed) {
      switch (this.numAdjacentMines) {
        case -1:
          ctx.fillStyle = "red";
          break;
        case 0:
          ctx.fillStyle = "grey";
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
    }
    ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);

    // text
    if (this.flagged) {
      ctx.fillStyle = "#000";
      ctx.fillText("F", this.cx, this.cy);
    } else if (this.revealed) {
      ctx.fillText(this.numAdjacentMines.toString(), this.cx, this.cy);
    }
  }
  reveal() {
    this.revealed = true;
    this.flagged = false;
    if (this.numAdjacentMines === -1) {
      return false;
    }
    return true;
  }
  flag() {
    if (this.revealed) {
      return false;
    }
    this.flagged = !this.flagged;
  }
}

class Minesweeperboard {
  tiles: Tile[][] = [];
  minesRemaining: number;
  constructor(
    numRows: number,
    numCols: number,
    size: number,
    numMines: number
  ) {
    this.minesRemaining = numMines;

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
  const i = Math.floor(e.offsetX / size);
  const j = Math.floor(e.offsetY / size);
  console.log(`(${i}, ${j})`);
  board.tiles[i][j].reveal();
}
function handleFlag(e: MouseEvent, board: Minesweeperboard) {
  const i = Math.floor(e.offsetX / size);
  const j = Math.floor(e.offsetY / size);
  console.log(`(${i}, ${j})`);
  board.tiles[i][j].flag();
}

const MinesweeperPage = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animation: number | undefined = undefined;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.font = "15px Arial";
        const board = new Minesweeperboard(numRows, numCols, size, numMines);
        canvasRef.current.addEventListener("click", (e) =>
          handleReveal(e, board)
        );
        canvasRef.current.addEventListener("contextmenu", (e) => {
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
