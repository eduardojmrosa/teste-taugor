import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <FormControl className="form" method="post">
          <TextField
            onChange={(email) => {
              setLoginEmail(email.target.value);
            }}
            className="emailInput"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            type="text"
          />
          <TextField
            required={true}
            onChange={(password) => {
              setLoginPassword(password.target.value);
            }}
            className="passwordInput"
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            name="password"
            type="password"
          />
          <Button
            onClick={(e) => {
              login(e);
            }}
            variant="contained"
          >
            Login
          </Button>
          <Link className="link" to={"/account-create"}>
            Crie uma conta
          </Link>

          <Link className="link" to={"/"}>
            Esqueci minha senha!
          </Link>
          {user?.email}
        </FormControl>
      </div>
    </div>
  );
}
