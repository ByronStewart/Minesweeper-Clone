import { useMinesweeper } from "../../hooks/useMinesweeper"
import { BiTime } from "react-icons/bi"
import { formatMinsAndSeconds, secondsToMinsAndSeconds } from "../../utils/lib"
import { Link } from "react-router-dom"

interface Props {
  handleClose: VoidFunction
}

export const GameLostWindow: React.FC<Props> = ({ handleClose }) => {
  const ms = useMinesweeper()
  const { mins: currentMins, seconds: currentSeconds } =
    secondsToMinsAndSeconds(ms.currentGameState.time)

  return (
    <div>
      <p>Time</p>
      <div>
        <div>
          <BiTime />
        </div>
        <div>{formatMinsAndSeconds(currentMins, currentSeconds)}</div>
      </div>
      <button
        onClick={() => {
          ms.gameStateDispatch({ type: "resetGame" })
          handleClose()
        }}
      >
        Try again
      </button>
    </div>
  )
}
