import { gameStates, visibilityState } from "./game";
import {
  flagImg,
  oneImg,
  twoImg,
  threeImg,
  fourImg,
  fiveImg,
  sixImg,
  sevenImg,
  eightImg,
  unopenedImg,
  zeroImg,
  hitBombImg,
} from "./images";

export class Tile {
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
        ctx.drawImage(flagImg, this.x, this.y);
        // ctx.strokeStyle = strokestyle;
        // ctx.fillStyle = "gold";
        // ctx.strokeRect(this.x, this.y, this.x + this.size, this.y + this.size);
        // ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        // ctx.fillStyle = "#000";
        // ctx.fillText("F", this.cx, this.cy);
        break;

      case visibilityState.HIDDEN:
        ctx.drawImage(unopenedImg, this.x, this.y);
        // ctx.strokeStyle = strokestyle;
        // ctx.fillStyle = fillstyle;
        // ctx.strokeRect(this.x, this.y, this.x + this.size, this.y + this.size);
        // ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        // ctx.fillStyle = "#000";
        // ctx.font = "8px Arial";
        // ctx.fillText(`x${this.x},y${this.y}`, this.x + 5, this.y + 10);
        break;

      case visibilityState.REVEALED:
        switch (this.numAdjacentMines) {
          case -1:
            ctx.fillStyle = "red";
            ctx.fillRect(
              this.x,
              this.y,
              this.x + this.size,
              this.y + this.size
            );
            ctx.drawImage(hitBombImg, this.x, this.y);
            break;
          case 0:
            ctx.drawImage(zeroImg, this.x, this.y);
            //ctx.fillStyle = "blanchedalmond";
            break;
          case 1:
            ctx.drawImage(oneImg, this.x, this.y);
            //ctx.fillStyle = "blue";
            break;
          case 2:
            ctx.drawImage(twoImg, this.x, this.y);
            //ctx.fillStyle = "green";
            break;
          case 3:
            ctx.drawImage(threeImg, this.x, this.y);
            //ctx.fillStyle = "pink";
            break;
          case 4:
            ctx.drawImage(fourImg, this.x, this.y);
            //ctx.fillStyle = "cyan";
            break;
          case 5:
            ctx.drawImage(fiveImg, this.x, this.y);
            //ctx.fillStyle = "fuchsia";
            break;
          case 6:
            ctx.drawImage(sixImg, this.x, this.y);
            //ctx.fillStyle = "aquamarine";
            break;
          case 7:
            ctx.drawImage(sevenImg, this.x, this.y);
            //ctx.fillStyle = "beige";
            break;
          case 8:
            ctx.drawImage(eightImg, this.x, this.y);
            //ctx.fillStyle = "yellow";
            break;
          default:
            //ctx.fillStyle = fillstyle;
            break;
        }
        //ctx.fillRect(this.x, this.y, this.x + this.size, this.y + this.size);
        //ctx.strokeRect(this.x, this.y, this.x + this.size, this.y + this.size);
        //if (this.numAdjacentMines !== 0) {
        //ctx.fillStyle = "#000";
        //ctx.fillText(this.numAdjacentMines.toString(), this.cx, this.cy);
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
