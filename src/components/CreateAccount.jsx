import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../App";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "./TopAppBar.jsx";

export function CreateAccount() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  async function register() {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <ThemeProvider theme={theme}>
          <FormControl className="form">
            <TextField
              onChange={(email) => {
                setRegisterEmail(email.target.value);
              }}
              value={registerEmail}
              className="emailInput"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              type="text"
            />
            <TextField
              onChange={(password) => {
                setRegisterPassword(password.target.value);
              }}
              value={registerPassword}
              className="passwordInput"
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              name="password"
              type="password"
            />
            <Button
              color="primary"
              className="createAccBtn"
              onClick={(e) => {
                register(e);
              }}
              type="submit"
              variant="contained"
            >
              Criar Conta
            </Button>

            <Link className="link" to={"/login"}>
              Já possui uma conta? Faça login
            </Link>
            <Link className="link" to={"/new-password"}>
              Esqueci minha senha!
            </Link>
          </FormControl>
        </ThemeProvider>
      </div>
    </div>
  );
}
