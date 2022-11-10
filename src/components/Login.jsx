import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";
import { auth } from "../App";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./TopAppBar.jsx";

export async function logout() {
  await signOut(auth);
}
export function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <ThemeProvider theme={theme}>
          <FormControl className="form" method="post">
            <TextField
              onChange={(email) => {
                setLoginEmail(email.target.value);
              }}
              value={loginEmail}
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
              value={loginPassword}
              className="passwordInput"
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              name="password"
              type="password"
            />
            <Button
              color="primary"
              className="loginBtn"
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
          </FormControl>
        </ThemeProvider>
      </div>
    </div>
  );
}
