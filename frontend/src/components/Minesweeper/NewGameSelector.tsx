import { useMinesweeper } from "../../hooks/useMinesweeper"
import { useDispatch, useSelector } from "react-redux"
import {
  setDifficultyEasy,
  setDifficultyHard,
  setDifficultyMedium,
} from "../../features/game/currentGameSlice"
import { AppDispatch, RootState } from "../../store"

interface Props {}

export const NewGameSelector: React.FC<Props> = () => {
  const gameState = useSelector(
    (state: RootState) => state.currentGame.gameState
  )
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="text-sm text-center">
      <div>
        <button
          onClick={() => {
            dispatch(setDifficultyEasy())
          }}
          className="btn-modal w-full"
        >
          Easy
        </button>
        <p>Recommended for beginners</p>
      </div>
      <div className="mt-2">
        <button
          onClick={() => {
            dispatch(setDifficultyMedium())
          }}
          className="btn-modal w-full"
        >
          Intermediate
        </button>
        <p>For those wanting a challenge</p>
      </div>
      <div className="mt-2">
        <button
          onClick={() => {
            dispatch(setDifficultyHard())
          }}
          className="btn-modal w-full"
        >
          Expert
        </button>
        <p>For seasoned veterans</p>
      </div>
    </div>
  )
}
