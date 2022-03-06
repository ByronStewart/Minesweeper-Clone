import { BiTime } from "react-icons/bi"
import {
  formatMinsAndSeconds,
  secondsToMinsAndSeconds,
} from "../../../utils/lib"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store"
import { resetGame } from "../../../features/current-game/currentGameSlice"

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
    <div className="text-center">
      <p className="text-xl">Time</p>
      <div className="text-lg">
        <BiTime className="inline-block mr-2" />
        <span className="inline-block">
          {formatMinsAndSeconds(currentMins, currentSeconds)}
        </span>
      </div>
      {bestMins && bestSeconds ? (
        <div>
          <BiTime className="inline-block mr-2" />
          <span>{formatMinsAndSeconds(bestMins, bestSeconds)}</span>
        </div>
      ) : (
        ""
      )}
      <button
        className="btn-modal mt-2 mx-auto"
        onClick={() => {
          dispatch(resetGame())
        }}
      >
        Play again
      </button>
      <Link className="btn-modal bg-red-400 mt-1 mx-auto" to="/login">
        Login to save scores
      </Link>
    </div>
  )
}
