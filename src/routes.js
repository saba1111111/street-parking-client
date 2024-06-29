import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register/register";
import LoginPage from "./pages/login/login";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
