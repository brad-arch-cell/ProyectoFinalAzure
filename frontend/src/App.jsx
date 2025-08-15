import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MapPage from "./pages/MapPage";
import Activities from "./pages/Activities";
import CreateActivity from "./pages/CreateActivity";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyTournaments from "./pages/MyTournaments";
import AthletesAvailable from "./pages/Athletes";
import NavbarComponent from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 🟢 Rutas protegidas */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/create-activity" element={
          <PrivateRoute>
            <CreateActivity />
          </PrivateRoute>
        } />
        <Route path="/my-tournaments" element={
          <PrivateRoute>
            <MyTournaments />
          </PrivateRoute>
        } />
        <Route path="/athletes" element={
          <PrivateRoute>
            <AthletesAvailable />
          </PrivateRoute>
        } />
      </Routes>
      </>
  );
}

export default App;
