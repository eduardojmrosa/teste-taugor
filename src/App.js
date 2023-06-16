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
import { getStorage } from "firebase/storage";
import { AuthProvider } from "./Auth";
import { PrivateRoute } from "./routes/PrivateRoute";

export const firebaseApp = initializeApp({
 //Firebase credentials
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

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
