import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000;
    if (Date.now() >= exp) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
