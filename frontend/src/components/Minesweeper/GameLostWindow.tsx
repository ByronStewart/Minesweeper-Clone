import { useMinesweeper } from "../../hooks/useMinesweeper"
import { BiTime } from "react-icons/bi"
import { formatMinsAndSeconds, secondsToMinsAndSeconds } from "../../utils/lib"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { resetGame } from "../../features/game/currentGameSlice"

interface Props {}

export const GameLostWindow: React.FC<Props> = () => {
  const time = useSelector(
    (state: RootState) => state.currentGame.gameProperties.time
  )
  const { mins: currentMins, seconds: currentSeconds } =
    secondsToMinsAndSeconds(time)

  const dispatch = useDispatch()
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
          dispatch(resetGame())
        }}
      >
        Try again
      </button>
    </div>
  )
}
