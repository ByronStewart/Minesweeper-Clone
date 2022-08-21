import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProvideAuth } from "./auth/useAuth";
import BaseLayout from "./components/layouts/BaseLayout";
import MinesweeperPage from "./components/Minesweeper/MinesweeperPage";
import { HallOfFamePage } from "./components/HallOfFame/HallOfFamePage";
import IndexPage from "./components/Index/IndexPage";
import { InstructionsPage } from "./components/Instructions/InstructionsPage";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import { MinesweeperLayout } from "./components/layouts/GameLayout";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<IndexPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route element={<MinesweeperLayout />}>
              <Route path="/game" element={<MinesweeperPage />}></Route>
            </Route>
            <Route path="/halloffame" element={<HallOfFamePage />}></Route>
            <Route path="/instructions" element={<InstructionsPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
