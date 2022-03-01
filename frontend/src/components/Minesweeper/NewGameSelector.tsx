import { useMinesweeper } from "../../hooks/useMinesweeper"

interface Props {
  handleClose: VoidFunction
}

export const NewGameSelector: React.FC<Props> = ({ handleClose }) => {
  const ms = useMinesweeper()
  return (
    <div>
      <div>
        <button
          onClick={() => {
            ms.gameStateDispatch({
              type: "setDifficulty",
              payload: "beginner",
            })
            handleClose()
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
            ms.gameStateDispatch({
              type: "setDifficulty",
              payload: "intermediate",
            })
            handleClose()
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
            ms.gameStateDispatch({
              type: "setDifficulty",
              payload: "advanced",
            })
            handleClose()
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
