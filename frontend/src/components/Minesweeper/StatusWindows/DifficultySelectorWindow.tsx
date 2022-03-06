import { useDispatch } from "react-redux"
import {
  setDifficultyEasy,
  setDifficultyHard,
  setDifficultyMedium,
} from "../../../features/current-game/currentGameSlice"
import { AppDispatch } from "../../../store"

interface Props {}

export const DifficultySelectorWindow: React.FC<Props> = () => {
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
