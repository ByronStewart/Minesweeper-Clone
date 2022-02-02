import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProvideAuth, RequireAuth } from "./hooks/useAuth";
import { BaseLayout } from "./components/layouts/BaseLayout";
import { About } from "./pages/About/About";
import { Index } from "./pages/Index";
import Login from "./pages/Login/LoginPage";
import { ProtectedPage } from "./pages/ProtectedPage";
import RegisterPage from "./pages/Register/RegisterPage";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Index />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route element={<RequireAuth />}>
              <Route path="/protected" element={<ProtectedPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
