import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/register/register";
import LoginPage from "./pages/login/login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <p>svs</p> : <Navigate to="/register" />}
        />

        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route exact path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
