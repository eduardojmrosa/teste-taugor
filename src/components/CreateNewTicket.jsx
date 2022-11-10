import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./TopAppBar.jsx";
import MUIRichTextEditor from "mui-rte";
import * as React from "react";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { db } from "../App.js";
import { useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

const descriptDataSave = (data) => {
  console.log(data);
};
export function CreateNewTicket() {
  const [product, setProduct] = useState("");
  const [environmentInfo, setEnvironmentInfo] = useState("");
  const [affectedUsersTotal, setAffectedUsersTotal] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [title, setTitle] = useState("");
  const [operationState, setOperationState] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const categoriesRef = collection(db, "categories");
  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesRef);

      const categories = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categories);
    };
    getCategories();
  }, []);
  const arrayResult = categories.map((category) => {
    return { id: category.id, title: category.title };
  });
  console.log(arrayResult);
  return (
    <div>
      <div className="fields">
        <ThemeProvider theme={theme}>
          <ul className="fieldsList">
            <li>
              <h1>Preencha as informações do seu ticket!</h1>
            </li>
            <li>
              <TextField
                className="titleInput"
                id="outlined-basic"
                label="Título"
                variant="outlined"
                value={title}
                name="title"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </li>
            <li>
              <TextField
                className="titleInput"
                id="outlined-basic"
                label="Descreva seu problema em uma frase"
                variant="outlined"
                value={problemDescription}
                name="title"
                type="text"
                onChange={(e) => {
                  setProblemDescription(e.target.value);
                }}
              />
            </li>
            <hr className="divider"></hr>
            <li>
              <Autocomplete
                disablePortal
                value={product}
                onChange={(event, product) => {
                  setProduct(product);
                }}
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Produto" />
                )}
              />
            </li>
            <li>
              <Autocomplete
                disablePortal
                value={product}
                onChange={(event, product) => {
                  setProduct(product);
                }}
                id="combo-box-demo"
                options={arrayResult}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Categoria" />
                )}
              />
            </li>
            <li>
              <Autocomplete
                disablePortal
                value={environmentInfo}
                onChange={(event, environmentInfo) => {
                  setEnvironmentInfo(environmentInfo);
                }}
                id="combo-box-demo"
                options={environment}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Informações de ambiente" />
                )}
              />
            </li>
            <li>
              <Autocomplete
                disablePortal
                value={priorityLevel}
                onChange={(event, priorityLevel) => {
                  setPriorityLevel(priorityLevel);
                }}
                id="combo-box-demo"
                options={priority}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Prioridade" />
                )}
              />
            </li>
            <li>
              <Autocomplete
                disablePortal
                value={affectedUsersTotal}
                onChange={(event, affectedUsersTotal) => {
                  setAffectedUsersTotal(affectedUsersTotal);
                }}
                id="combo-box-demo"
                options={affectedUsers}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Usuários impactados" />
                )}
              />
            </li>
            <li>
              <Autocomplete
                disablePortal
                value={operationState}
                onChange={(event, operationState) => {
                  setOperationState(operationState);
                }}
                id="combo-box-demo"
                options={operation}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Operação parada?" />
                )}
              />
            </li>

            <li>
              <MUIRichTextEditor
                className="muiRTE"
                label="Descrição"
                onSave={descriptDataSave}
                inlineToolbar={true}
              ></MUIRichTextEditor>
            </li>
          </ul>
          <Button className="saveBtn" variant="contained">
            Salvar
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

const priority = ["Alta", "Média", "Baixa"];
const environment = [
  "Dados/Ambiente de testes - Somente testes",
  "Ambiente de produção - Cliete Ativo/Licença",
];
const operation = ["Sim", "Não"];
const affectedUsers = [
  "Apenas 1",
  "1 a 10 Usuários",
  "11 a 30 Usuários",
  "31 a 50 Usuários",
  "Mais de 50 Usuários",
];
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
