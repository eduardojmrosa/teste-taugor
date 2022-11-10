import "./css/TopAppBar.scss";
import "./css/Login.scss";
import "./css/Home.scss";
import "./css/CreateNewTicket.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateAccount } from "./components/CreateAccount";
import { Login } from "./components/Login";
import { Home } from "./view/Home";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { AuthProvider } from "./Auth";
import { PrivateRoute } from "./routes/PrivateRoute";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCexjTKI1v_4ASkmGBNrQ3hdlXPJmc8KTs",
  authDomain: "velvety-striker-313719.firebaseapp.com",
  projectId: "velvety-striker-313719",
  storageBucket: "velvety-striker-313719.appspot.com",
  messagingSenderId: "887606094911",
  appId: "1:887606094911:web:1cb3a16a2dd810d42f1c8a",
  measurementId: "G-THCM377XVB",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              //descomentar pra voltar a proteção a home page
              //<PrivateRoute>
              <Home></Home>
              // </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/account-create"
            element={<CreateAccount></CreateAccount>}
          ></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
