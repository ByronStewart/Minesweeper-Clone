import { useEffect, useMemo, useState } from "react"
import { GameLostWindow } from "../../components/Minesweeper/GameLostWindow"
import { GameWonWindow } from "../../components/Minesweeper/GameWonWindow"

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
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import {
  resetGame,
  setDifficultyEasy,
  setDifficultyHard,
  setDifficultyMedium,
} from "../../features/game/currentGameSlice"
import Minesweeper from "../../components/Minesweeper/Minesweeper"

// interface IHistory {
//   player: string
//   timer: number
//   difficulty: difficultyTypes
// }
// const difficultyNumberToString = (n: minesweeperAPIDifficultyTypes) => {
//   switch (n) {
//     case minesweeperAPIDifficultyTypes.BEGINNER:
//       return difficultyTypes.BEGINNER
//     case minesweeperAPIDifficultyTypes.INTERMEDIATE:
//       return difficultyTypes.INTERMEDIATE
//     case minesweeperAPIDifficultyTypes.ADVANCED:
//       return difficultyTypes.ADVANCED
//   }
// }

// const difficultyStringToNumber = (
//   s: difficultyTypes
// ): minesweeperAPIDifficultyTypes => {
//   switch (s) {
//     case difficultyTypes.ADVANCED:
//       return minesweeperAPIDifficultyTypes.ADVANCED
//     case difficultyTypes.INTERMEDIATE:
//       return minesweeperAPIDifficultyTypes.INTERMEDIATE
//     case difficultyTypes.BEGINNER:
//       return minesweeperAPIDifficultyTypes.BEGINNER
//   }
// }

type Props = {}

const MinesweeperPage: React.FC<Props> = () => {
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
  const gameStatus = useSelector(
    (state: RootState) => state.currentGame.gameState
  )
  const dispatch = useDispatch()

  return (
    <div>
      {gameStatus == "awaiting options" && (
        <Modal onOpen={() => console.log("hi")}>
          <NewGameSelector />
        </Modal>
      )}
      {gameStatus == "finishedsuccess" && (
        <Modal
          onOpen={() => console.log("hi")}
          onClose={() => dispatch(resetGame())}
        >
          <GameWonWindow />
        </Modal>
      )}
      {gameStatus == "finishedfailure" && (
        <Modal onOpen={() => console.log("hi")}>
          <GameLostWindow />
        </Modal>
      )}
      <button
        className="btn"
        //onClick={() => setModalState(ModalStates.GAMEWONMODAL)}
      >
        game won
      </button>
      <button
        className="btn"
        //onClick={() => setModalState(ModalStates.NEWGAMEMODAL)}
      >
        new game
      </button>
      <button
        className="btn"
        //onClick={() => setModalState(ModalStates.GAMELOSTMODAL)}
      >
        game lost
      </button>
      <div>
        <Minesweeper />
      </div>
    </div>
  )
}

export default MinesweeperPage
