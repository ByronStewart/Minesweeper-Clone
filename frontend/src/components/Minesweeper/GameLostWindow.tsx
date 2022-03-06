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
      <p className="text-xl">Time</p>
      <div className="text-lg">
        <BiTime className="mr-2 inline-block" />
        <span>{formatMinsAndSeconds(currentMins, currentSeconds)}</span>
      </div>
      <button
        className="btn-modal mt-2"
        onClick={() => {
          dispatch(resetGame())
        }}
      >
        Try again
      </button>
    </div>
  )
}
