import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProvideAuth, RequireAuth } from "./hooks/useAuth";
import AboutPage from "./views/BaseLayout/AboutPage/AboutPage";
import BaseLayout from "./views/BaseLayout/BaseLayout";
import IndexPage from "./views/BaseLayout/IndexPage/IndexPage";
import LoginPage from "./views/BaseLayout/Login/LoginPage";
import RegisterPage from "./views/BaseLayout/Register/RegisterPage";
import { ProtectedPage } from "./views/ProtectedPage";

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<IndexPage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
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
