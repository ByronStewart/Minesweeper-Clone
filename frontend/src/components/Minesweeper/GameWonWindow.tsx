import { useMinesweeper } from "../../hooks/useMinesweeper"
import { BiTime } from "react-icons/bi"
import { formatMinsAndSeconds, secondsToMinsAndSeconds } from "../../utils/lib"
import { Link } from "react-router-dom"

interface Props {
  handleClose: VoidFunction
}

export const GameWonWindow: React.FC<Props> = ({ handleClose }) => {
  const ms = useMinesweeper()
  const { mins: currentMins, seconds: currentSeconds } =
    secondsToMinsAndSeconds(ms.currentGameState.time)
  const bestTime = ms.getBestTime(ms.currentGameState.options.difficulty)
  let bestMins = undefined
  let bestSeconds = undefined
  if (bestTime) {
    const { mins, seconds } = secondsToMinsAndSeconds(ms.currentGameState.time)
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
          ms.gameStateDispatch({ type: "resetGame" })
          handleClose()
        }}
      >
        Play again
      </button>
      <Link to="/login">Login to save scores</Link>
    </div>
  )
}
