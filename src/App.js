import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/register/register";
import LoginPage from "./pages/login/login";
import ParkingPage from "./pages/parking/parking";
import ParkingHistoryPage from "./pages/parking-history/parking-history";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <ParkingPage /> : <Navigate to="/register" />}
        />
        <Route
          exact
          path="/parking-history"
          element={
            user ? (
              <ParkingHistoryPage userId={user.id} />
            ) : (
              <Navigate to="/register" />
            )
          }
        />

        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
