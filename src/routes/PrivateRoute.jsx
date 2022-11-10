import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserAuth } from "../Auth.js";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const user = UserAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
