import "./css/main.scss";
import "./css/Login.scss";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateAccount } from "./components/CreateAccount";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const auth = getAuth();
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCexjTKI1v_4ASkmGBNrQ3hdlXPJmc8KTs",
  authDomain: "velvety-striker-313719.firebaseapp.com",
  projectId: "velvety-striker-313719",
  storageBucket: "velvety-striker-313719.appspot.com",
  messagingSenderId: "887606094911",
  appId: "1:887606094911:web:1cb3a16a2dd810d42f1c8a",
  measurementId: "G-THCM377XVB",
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route
          path="/account-create"
          element={<CreateAccount></CreateAccount>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
