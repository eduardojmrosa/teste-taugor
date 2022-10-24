import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";

export function CreateAccount() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const logout = async () => {
    await signOut(auth);
  };

  const register = async () => {
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
  };

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <FormControl className="form">
          <TextField
            onChange={(email) => {
              setRegisterEmail(email.target.value);
            }}
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
            className="passwordInput"
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            name="password"
            type="password"
          />
          <Button
            onClick={(e) => {
              register(e);
            }}
            type="submit"
            variant="contained"
          >
            Criar Conta
          </Button>
          <Button
            onClick={(e) => {
              logout(e);
            }}
            type="submit"
            variant="contained"
          >
            Logout
          </Button>

          <Link className="link" to={"/"}>
            Já possui uma conta? Faça login
          </Link>
          <Link className="link" to={"/new-password"}>
            Esqueci minha senha!
          </Link>
          <h1>{user?.email}</h1>
        </FormControl>
      </div>
    </div>
  );
}
