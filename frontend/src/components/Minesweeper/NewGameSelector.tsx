import { useMinesweeper } from "../../hooks/useMinesweeper"
import { useDispatch } from "react-redux"
import {
  setDifficultyEasy,
  setDifficultyHard,
  setDifficultyMedium,
} from "../../features/game/currentGameSlice"

interface Props {}

export const NewGameSelector: React.FC<Props> = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <div>
        <button
          onClick={() => {
            dispatch(setDifficultyEasy())
          }}
          className="btn"
        >
          Easy
        </button>
      </div>
      <p>Recommended for beginners</p>
      <div>
        <button
          onClick={() => {
            dispatch(setDifficultyMedium())
          }}
          className="btn"
        >
          Intermediate
        </button>
      </div>
      <p>For those wanting a challenge</p>
      <div>
        <button
          onClick={() => {
            dispatch(setDifficultyHard())
          }}
          className="btn"
        >
          Expert
        </button>
      </div>
      <p>For seasoned veterans</p>
    </div>
  )
}
