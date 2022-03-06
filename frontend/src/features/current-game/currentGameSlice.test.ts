import reducer, { initialState } from "./currentGameSlice"
import { BEGINNER } from "./constants"
import { store } from "../../store"
import { AnyAction } from "@reduxjs/toolkit"

describe("current game slice tests", () => {
  it("the initial state should have the correct number of mines in the gameboard", () => {
    let numMines = 0
    for (const row of initialState.board) {
      for (const tile of row) {
        if (tile.minesAdjacent === -1) {
          numMines++
        }
      }
    }
    expect(numMines).toEqual(BEGINNER.numMines)
  })
})
