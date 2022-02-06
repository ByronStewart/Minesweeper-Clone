import { flatten, sampleSize } from "lodash";

const fillstyle = "grey";
const strokestyle = "#000";

enum visibilityState {
  FLAGGED,
  REVEALED,
  HIDDEN,
}

export enum gameStates {
  RUNNING = "running",
  FINISHEDSUCCESS = "finishedsuccess",
  FINISHEDFAILURE = "finishedfailure",
  PENDING = "pending",
}

export enum revealTypes {
  FLAG,
  REVEAL,
}

interface callbackDetails {
  timer?: number;
  gameState?: gameStates;
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
  draw(ctx: CanvasRenderingContext2D, gamestate: gameStates) {
    switch (this.visibility) {
      case visibilityState.FLAGGED:
        ctx.strokeStyle = strokestyle;
        ctx.fillStyle = "gold";
        ctx.strokeRect(this.x, this.y, this.x + this.size, this.y + this.size);
        ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        ctx.fillStyle = "#000";
        ctx.fillText("F", this.cx, this.cy);
        break;

      case visibilityState.HIDDEN:
        ctx.strokeStyle = strokestyle;
        ctx.fillStyle = fillstyle;
        ctx.strokeRect(this.x, this.y, this.x + this.size, this.y + this.size);
        ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        ctx.fillStyle = "#000";
        ctx.font = "8px Arial";
        ctx.fillText(`x${this.x},y${this.y}`, this.x + 5, this.y + 10);
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
        ctx.strokeRect(this.x, this.y, this.x + this.size, this.y + this.size);
        //if (this.numAdjacentMines !== 0) {
        ctx.fillStyle = "#000";
        ctx.fillText(this.numAdjacentMines.toString(), this.cx, this.cy);
        //}
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

export class Minesweeperboard {
  tiles: Tile[][] = [];
  minesRemaining: number;
  unseenTilesRemaining: number;
  timer = 0;
  gameState = gameStates.PENDING;
  callback: (details: callbackDetails) => void;
  private timerInterval: number | undefined = undefined;
  private ctx: CanvasRenderingContext2D;
  private numRows: number;
  private numCols: number;
  private tileSize: number;
  private numMines: number;
  private animationFrameId: number | undefined = undefined;

  constructor(
    numRows: number,
    numCols: number,
    size: number,
    numMines: number,
    ctx: CanvasRenderingContext2D,
    callback: (details: callbackDetails) => void
  ) {
    this.minesRemaining = numMines;
    this.unseenTilesRemaining = numRows * numCols - numMines;
    this.ctx = ctx;
    this.numMines = numMines;
    this.numCols = numCols;
    this.numRows = numRows;
    this.tileSize = size;
    this.callback = callback;
    // set up a blank game
    this.setUp();
  }

  setUp() {
    // set the gamestate to reflect the current game state
    this.gameState = gameStates.PENDING;
    this.unseenTilesRemaining = this.numCols * this.numRows - this.numMines;
    // Create an empty grid of minesweeper tiles
    let i = 0;
    let j = 0;
    this.tiles = [];
    for (let y = 0; y < this.numRows * this.tileSize; y += this.tileSize) {
      this.tiles.push([]);
      for (let x = 0; x < this.numCols * this.tileSize; x += this.tileSize) {
        this.tiles[i].push(new Tile(x, y, i, j, this.tileSize));
        j++;
      }
      i++;
      j = 0;
    }
    // fill grid with mines
    const mines = sampleSize(flatten(this.tiles), this.numMines);
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
      if (ni < 0 || ni >= this.numRows || nj < 0 || nj >= this.numCols) {
        continue;
      }
      neighbours.push(this.tiles[ni][nj]);
    }
    return neighbours;
  }

  revealTiles(i: number, j: number, revealType: revealTypes) {
    console.log(this.gameState);
    switch (this.gameState) {
      case gameStates.PENDING:
        // set the gamestate to running and set the timer interval
        this.gameState = gameStates.RUNNING;

        this.callback({ timer: this.timer });
        this.timerInterval = window.setInterval(() => {
          ++this.timer;
          this.callback({ timer: this.timer });
        }, 1000);
        break;
      // if the game is running continue
      case gameStates.RUNNING:
        break;
      // if game is in a gameover state do nothing
      default:
        return;
    }

    // get the current tile
    const currentTile = this.tiles[i][j];

    switch (revealType) {
      case revealTypes.FLAG:
        currentTile.flag();
        break;

      case revealTypes.REVEAL:
        switch (currentTile.visibility) {
          case visibilityState.REVEALED:
            // if already revealed do nothing
            return;
          case visibilityState.FLAGGED:
            // if flagged return it to hidden state
            currentTile.visibility = visibilityState.HIDDEN;
            return;

          case visibilityState.HIDDEN:
            // usual behaviour
            // check if the player has revealed a mine and return gameover
            if (currentTile.numAdjacentMines === -1) {
              currentTile.reveal();
              console.log(currentTile);
              return this.gameOver();
            }

            // DFS to reveal all tiles that can be safely revealed:
            // eg. if the tile is a 0 we can reveal all tiles around it
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
            // update the unseen tiles count to determine the gameover state
            this.unseenTilesRemaining -= seen.size;

            // check to see if the game is won after revealing
            // if it is then call gameWon
            if (this.unseenTilesRemaining === 0) {
              this.gameWon();
            }
            break;
        }
    }
  }

  gameOver() {
    this.gameState = gameStates.FINISHEDFAILURE;
    window.clearInterval(this.timerInterval);
    this.callback({ timer: this.timer, gameState: this.gameState });
  }

  gameWon() {
    this.gameState = gameStates.FINISHEDSUCCESS;
    window.clearInterval(this.timerInterval);
    this.callback({ timer: this.timer, gameState: this.gameState });
  }

  draw = () => {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        this.tiles[i][j].draw(this.ctx, this.gameState);
      }
    }
    this.animationFrameId = requestAnimationFrame(this.draw);
  };

  cleanup() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
    window.clearInterval(this.timerInterval);
  }
}
