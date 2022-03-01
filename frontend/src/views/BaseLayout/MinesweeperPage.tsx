import { useEffect, useMemo, useState } from "react"
import { GameLostWindow } from "../../components/Minesweeper/GameLostWindow"
import { GameWonWindow } from "../../components/Minesweeper/GameWonWindow"
import Minesweeper, {
  difficultyTypes,
} from "../../components/Minesweeper/Minesweeper"
import { NewGameSelector } from "../../components/Minesweeper/NewGameSelector"
import { Modal } from "../../components/Modal"
import { useAuth } from "../../hooks/useAuth"
import { ProvideMinesweeper, useMinesweeper } from "../../hooks/useMinesweeper"
import { useToggle } from "../../hooks/useToggle"
import {
  GETMinesweeperScoreDTO,
  minesweeperAPIDifficultyTypes,
  POSTMinesweeperScoreDTO,
} from "../../interfaces/MinesweeperScoreDTO"
import { MINESWEEPER_SCORE_ROUTE } from "../../utils/constants"

interface IHistory {
  player: string
  timer: number
  difficulty: difficultyTypes
}
const difficultyNumberToString = (n: minesweeperAPIDifficultyTypes) => {
  switch (n) {
    case minesweeperAPIDifficultyTypes.BEGINNER:
      return difficultyTypes.BEGINNER
    case minesweeperAPIDifficultyTypes.INTERMEDIATE:
      return difficultyTypes.INTERMEDIATE
    case minesweeperAPIDifficultyTypes.ADVANCED:
      return difficultyTypes.ADVANCED
  }
}

const difficultyStringToNumber = (
  s: difficultyTypes
): minesweeperAPIDifficultyTypes => {
  switch (s) {
    case difficultyTypes.ADVANCED:
      return minesweeperAPIDifficultyTypes.ADVANCED
    case difficultyTypes.INTERMEDIATE:
      return minesweeperAPIDifficultyTypes.INTERMEDIATE
    case difficultyTypes.BEGINNER:
      return minesweeperAPIDifficultyTypes.BEGINNER
  }
}

type Props = {}

enum ModalStates {
  CLOSED,
  NEWGAMEMODAL,
  GAMEWONMODAL,
  GAMELOSTMODAL,
}

const MinesweeperPage: React.FC<Props> = () => {
  const [modalState, setModalState] = useState<ModalStates>(ModalStates.CLOSED)
  // const [history, setHistory] = useState<IHistory[]>([])
  // const handleWin = async (timer: number, difficulty: difficultyTypes) => {
  //   // post the win if logged in
  //   if (auth.user) {
  //     // post the new score to the api
  //     const body: POSTMinesweeperScoreDTO = {
  //       score: {
  //         difficulty: difficultyStringToNumber(difficulty),
  //         time: timer,
  //       },
  //     }
  //     const response = await fetch(MINESWEEPER_SCORE_ROUTE, {
  //       method: "POST",
  //       headers: {
  //         authorization: `Bearer ${auth.accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     })
  //     if (response.ok) {
  //       const data: GETMinesweeperScoreDTO = await response.json()
  //       return setHistory((history) => [
  //         ...history,
  //         {
  //           player: data.owner,
  //           timer: data.time,
  //           difficulty: difficultyNumberToString(data.difficulty),
  //         },
  //       ])
  //     }
  //   }
  //   setHistory((history) => [
  //     ...history,
  //     {
  //       player: "you",
  //       timer,
  //       difficulty,
  //     },
  //   ])
  // }
  // const filteredHistory = useMemo(
  //   () => history.filter((x) => x.difficulty === difficulty),
  //   [history, difficulty]
  // )

  // useEffect(() => {
  //   fetch(MINESWEEPER_SCORE_ROUTE)
  //     .then((res) => res.json())
  //     .then((json: GETMinesweeperScoreDTO[]) => {
  //       const history = json.map((x) => ({
  //         player: x.owner,
  //         timer: x.time,
  //         difficulty: difficultyNumberToString(x.difficulty),
  //       }))
  //       setHistory(history)
  //     })
  // }, [])
  const ms = useMinesweeper()

  return (
    <div>
      {modalState == ModalStates.NEWGAMEMODAL && (
        <Modal
          onOpen={() => console.log("hi")}
          onClose={() => setModalState(ModalStates.CLOSED)}
        >
          <NewGameSelector
            handleClose={() => setModalState(ModalStates.CLOSED)}
          />
        </Modal>
      )}
      {modalState == ModalStates.GAMEWONMODAL && (
        <Modal
          onOpen={() => console.log("hi")}
          onClose={() => setModalState(ModalStates.CLOSED)}
        >
          <GameWonWindow
            handleClose={() => setModalState(ModalStates.CLOSED)}
          />
        </Modal>
      )}
      {modalState == ModalStates.GAMELOSTMODAL && (
        <Modal
          onOpen={() => console.log("hi")}
          onClose={() => setModalState(ModalStates.CLOSED)}
        >
          <GameLostWindow
            handleClose={() => setModalState(ModalStates.CLOSED)}
          />
        </Modal>
      )}
      <button
        className="btn"
        onClick={() => setModalState(ModalStates.GAMEWONMODAL)}
      >
        game won
      </button>
      <button
        className="btn"
        onClick={() => setModalState(ModalStates.NEWGAMEMODAL)}
      >
        new game
      </button>
      <button
        className="btn"
        onClick={() => setModalState(ModalStates.GAMELOSTMODAL)}
      >
        game lost
      </button>

      {/* <div className="flex">
        <Minesweeper
          onGameWon={handleWin}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        /> 
      </div> */}
    </div>
  )
}

export default MinesweeperPage
