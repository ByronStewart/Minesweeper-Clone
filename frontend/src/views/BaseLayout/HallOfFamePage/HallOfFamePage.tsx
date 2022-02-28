import { useEffect, useState } from "react"
import { HighScore } from "../../../components/Tabs/HighScore"
import { Tab } from "../../../components/Tabs/Tab"

type Difficulty = "advanced" | "intermediate" | "beginner"

type HighScore = {
  time: number
  username: string
  id: number
}

const mockhighscores: Record<Difficulty, Array<HighScore>> = {
  advanced: [
    {
      time: 305,
      username: "test",
      id: 1,
    },
    {
      time: 305,
      username: "test",
      id: 2,
    },
    {
      time: 305,
      username: "test",
      id: 3,
    },
    {
      time: 305,
      username: "test",
      id: 4,
    },
    {
      time: 305,
      username: "test",
      id: 5,
    },
    {
      time: 305,
      username: "test",
      id: 6,
    },
    {
      time: 305,
      username: "test",
      id: 7,
    },
    {
      time: 305,
      username: "test",
      id: 8,
    },
    {
      time: 305,
      username: "test",
      id: 9,
    },
    {
      time: 305,
      username: "test",
      id: 10,
    },
  ],
  beginner: [
    {
      time: 40,
      username: "billy",
      id: 11,
    },
    {
      time: 40,
      username: "billy",
      id: 12,
    },
    {
      time: 40,
      username: "billy",
      id: 13,
    },
    {
      time: 40,
      username: "billy",
      id: 14,
    },
    {
      time: 40,
      username: "billy",
      id: 15,
    },
    {
      time: 40,
      username: "billy",
      id: 16,
    },
    {
      time: 40,
      username: "billy",
      id: 17,
    },
    {
      time: 40,
      username: "billy",
      id: 18,
    },
    {
      time: 40,
      username: "billy",
      id: 19,
    },
    {
      time: 40,
      username: "billy",
      id: 20,
    },
  ],
  intermediate: [
    {
      time: 55,
      username: "coolio",
      id: 21,
    },
    {
      time: 55,
      username: "coolio",
      id: 22,
    },
    {
      time: 55,
      username: "coolio",
      id: 23,
    },
    {
      time: 55,
      username: "coolio",
      id: 24,
    },
    {
      time: 55,
      username: "coolio",
      id: 25,
    },
    {
      time: 55,
      username: "coolio",
      id: 26,
    },
    {
      time: 55,
      username: "coolio",
      id: 27,
    },
    {
      time: 55,
      username: "coolio",
      id: 28,
    },
    {
      time: 55,
      username: "coolio",
      id: 29,
    },
    {
      time: 55,
      username: "coolio",
      id: 30,
    },
  ],
}

export const HallOfFamePage: React.FC = () => {
  const [highScores, setHighScores] =
    useState<Record<Difficulty, Array<HighScore>>>()

  const [tabIndex, setTabIndex] = useState<Difficulty>("beginner")

  useEffect(() => {
    setHighScores(() => mockhighscores)
  }, [])
  return (
    <div>
      <h3 className="text-xl mt-6 text-center mx-auto mb-4">
        The hall of fame
      </h3>
      <div>
        {highScores &&
          highScores[tabIndex].map((score) => (
            <HighScore
              time={score.time}
              username={score.username}
              key={score.id}
            ></HighScore>
          ))}
      </div>
      <div className="fixed bottom-0 w-full z-10 bg-gray-300">
        <ul className="flex justify-evenly">
          <Tab
            active={tabIndex === "beginner"}
            onClick={() => setTabIndex("beginner")}
          >
            Beginner
          </Tab>
          <Tab
            active={tabIndex === "intermediate"}
            onClick={() => setTabIndex("intermediate")}
          >
            Intermediate
          </Tab>
          <Tab
            active={tabIndex === "advanced"}
            onClick={() => setTabIndex("advanced")}
          >
            Advanced
          </Tab>
        </ul>
      </div>
    </div>
  )
}
