import { useMinesweeper } from "../../hooks/useMinesweeper"
import { BiTime } from "react-icons/bi"
import { formatMinsAndSeconds, secondsToMinsAndSeconds } from "../../utils/lib"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { resetGame } from "../../features/game/currentGameSlice"

interface Props {}

export const GameWonWindow: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const { time, bestTime } = useSelector((state: RootState) => {
    const difficulty = state.currentGame.options.difficulty
    return {
      time: state.currentGame.gameProperties.time,
      bestTime: Math.max(...state.gameHistory[difficulty]),
    }
  })
  const { mins: currentMins, seconds: currentSeconds } =
    secondsToMinsAndSeconds(time)
  let bestMins = undefined
  let bestSeconds = undefined
  if (bestTime) {
    const { mins, seconds } = secondsToMinsAndSeconds(bestTime)
    bestMins = mins
    bestSeconds = seconds
  }
  return (
    <div>
      <p>Time</p>
      <div>
        <div>
          <BiTime />
        </div>
        <div>{formatMinsAndSeconds(currentMins, currentSeconds)}</div>
      </div>
      {bestMins && bestSeconds && (
        <div>
          <div>
            <BiTime />
          </div>
          <div>{formatMinsAndSeconds(bestMins, bestSeconds)}</div>
        </div>
      )}
      <button
        onClick={() => {
          dispatch(resetGame())
        }}
      >
        Play again
      </button>
      <Link to="/login">Login to save scores</Link>
    </div>
  )
}
