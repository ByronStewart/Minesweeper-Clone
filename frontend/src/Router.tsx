import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ProtectedPage } from "./pages/ProtectedPage";
import { RequireAuth } from "./hooks/useAuth";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="about" element={<About />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route
            path="protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
