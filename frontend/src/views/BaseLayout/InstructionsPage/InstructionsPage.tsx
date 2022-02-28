import { useReducer, useState } from "react"
import { IconContext } from "react-icons"
import { GoChevronLeft, GoChevronRight } from "react-icons/go"
import { useSwipeable } from "react-swipeable"
import { debounce } from "lodash"

type OnboardingState = {
  page: number
}
type Direction = "back" | "forward"

type OnboardingAction = {
  dir: Direction
}

const reducer = (
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState => {
  console.log(state, action)
  switch (action.dir) {
    case "back":
      if (state.page == 0) {
        return state
      }
      return {
        page: state.page - 1,
      }
    case "forward":
      if (state.page == 2) {
        return state
      }
      return {
        page: state.page + 1,
      }
  }
}

export const InstructionsPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { page: 1 })
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (e) => {
      dispatch({ dir: "forward" })
    },
    onSwipedRight: () => {
      dispatch({ dir: "back" })
    },
    preventDefaultTouchmoveEvent: true,
  })
  return (
    <div {...swipeHandlers} className="flex justify-between h-full flex-col">
      <h2 className="text-3xl ml-7 mt-10">
        Modern <br></br>Minesweeper
      </h2>
      {/* Instruction pane */}
      <div className={`mx-10 text-lg ${state.page !== 0 ? "hidden" : ""}`}>
        <p>Swipe left to flag</p>
        <p>Swipe right to clear</p>
        <p>Swipe down to reveal</p>
        <p>Swipe up to cancel</p>
      </div>
      <div className={`mx-10 text-lg ${state.page !== 1 ? "hidden" : ""}`}>
        <p>
          When you reveal a tile the tile will say how many mines are adjacent
          to it.
        </p>
      </div>
      <div className={`mx-10 text-lg ${state.page !== 2 ? "hidden" : ""}`}>
        <p>You will if you reveal all the tiles without revealing a mine</p>
        <br />
        <p>If you reveal a mine...</p>
        <p>Boom... game over...</p>
      </div>
      <div className="flex justify-between items-center">
        {/* Menu Bar */}
        <IconContext.Provider
          value={{
            size: "2.5em",
          }}
        >
          {state.page > 0 ? (
            <div onClick={() => dispatch({ dir: "back" })} className="p-5">
              <GoChevronLeft color={"#000"} />
            </div>
          ) : (
            <div className="p-5">
              <GoChevronLeft color="#999" />
            </div>
          )}

          <div className="flex justify-start gap-3 items-center p-5 pl-8">
            <div
              className={`${
                state.page == 0
                  ? "bg-blue-500 border-blue-900"
                  : "bg-gray-500 border-gray-900"
              } w-5 h-5 rounded-full border `}
            ></div>
            <div
              className={`${
                state.page == 1
                  ? "bg-blue-500 border-blue-900"
                  : "bg-gray-500 border-gray-900"
              } w-5 h-5 rounded-full border `}
            ></div>
            <div
              className={`${
                state.page == 2
                  ? "bg-blue-500 border-blue-900"
                  : "bg-gray-500 border-gray-900"
              } w-5 h-5 rounded-full border `}
            ></div>
          </div>

          {state.page < 2 ? (
            <div onClick={() => dispatch({ dir: "forward" })} className="p-5">
              <GoChevronRight />
            </div>
          ) : (
            <div className="p-5">
              <GoChevronRight color="#999" />
            </div>
          )}
        </IconContext.Provider>
      </div>
    </div>
  )
}
