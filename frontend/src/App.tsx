import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProvideAuth, RequireAuth } from "./hooks/useAuth"
import BaseLayout from "./views/BaseLayout/BaseLayout"
import GameLayout from "./views/BaseLayout/GameLayout/GameLayout"
import MinesweeperPage from "./views/BaseLayout/GameLayout/MinesweeperPage/MinesweeperPage"
import { HallOfFamePage } from "./views/BaseLayout/HallOfFamePage/HallOfFamePage"
import IndexPage from "./views/BaseLayout/IndexPage/IndexPage"
import { InstructionsPage } from "./views/BaseLayout/InstructionsPage/InstructionsPage"
import LoginPage from "./views/BaseLayout/Login/LoginPage"
import RegisterPage from "./views/BaseLayout/Register/RegisterPage"
import { ProtectedPage } from "./views/ProtectedPage"

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<IndexPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/game" element={<MinesweeperPage />}></Route>
            <Route path="/halloffame" element={<HallOfFamePage />}></Route>
            <Route path="/instructions" element={<InstructionsPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  )
}

export default App
