import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./App";
import React from "react";
import { useContext } from "react";

export const AuthContext = React.createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export const UserAuth = () => {
  return useContext(AuthContext);
};
