import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./TopAppBar.jsx";
import MUIRichTextEditor from "mui-rte";
import * as React from "react";
import { useState, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { db, storage } from "../App.js";
import { useEffect } from "react";
import {
  addDoc,
  doc,
  getDocs,
  updateDoc,
  orderBy,
  onSnapshot,
  query,
  limit,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { convertToRaw } from "draft-js";
import { Input } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

//Rte style object
Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {},
      editor: {
        height: "100px",
        maxHeight: "100px",

        width: "100%",
        border: "1px solid",
        borderColor: "#707070",
      },
      label: {
        marginLeft: "10px",
      },
    },
  },
});
const descriptDataSave = (data) => {
  console.log(data);
};
export function CreateNewTicket({ handleModalClose }) {
  const [product, setProduct] = useState("");
  const [environmentInfo, setEnvironmentInfo] = useState("");
  const [affectedUsersTotal, setAffectedUsersTotal] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [title, setTitle] = useState("");
  const [operationState, setOperationState] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [defineCategories, setDefineCategories] = useState([]);
  const [rteValue, setrteValue] = useState("");
  const [files, setFiles] = useState([]);

  const [atualId, setAtualId] = useState("");

  //File upload
  async function fileUpload() {
    if (files === null) return;

    const filesUploaded = [];

    await Promise.all(
      files.map(async (file) => {
        const fileRef = ref(
          storage,
          `ticket-files/${file.uuid}"@"${file.name}`
        );

        await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);
        filesUploaded.push({
          name: file.name,
          id: file.uuid,
          url: fileUrl,
        });
      })
    );

    const docsRef = doc(db, "tickets", atualId);
    await updateDoc(docsRef, {
      files: filesUploaded,
    });

    console.log("new url add to document");
    alert("Ticket created successfully and file upload sucefully");

    setAtualId("");
    setFiles([]);
    handleModalClose();
  }
  useEffect(() => {
    console.log(files);
    console.log(atualId);
  }, [files, atualId]);
  //Getting the rte text
  const onEditorChange = (event) => {
    //const plainText = event.getCurrentContent().getPlainText(); // for plain text
    const rteContent = convertToRaw(event.getCurrentContent()); // for rte content with text formating
    rteContent && setrteValue(JSON.stringify(rteContent)); // store your rteContent to state
  };
  //Get the collection references from firebase
  const categoriesRef = collection(db, "categories");
  const ticketsRef = collection(db, "tickets");

  //Get the categories from firebase
  useEffect(() => {
    async function getCategories() {
      const res = await getDocs(categoriesRef);

      const data = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(data);
    }
    getCategories();
  }, []);
  //Getting the last created document
  useEffect(() => {
    const q = query(
      collection(db, "tickets"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(JSON.stringify(doc.id));
      });
    });
  }, []);

  //Create ticket function / need fields validation
  async function createTicket() {
    const createdAt = new Date();

    const ticket = await addDoc(ticketsRef, {
      createdAt,
      title,
      problemDescription,
      product,
      defineCategories,
      environmentInfo,
      priorityLevel,
      affectedUsersTotal,
      operationState,
      rteValue,
    });

    const firestoreDocument = doc(db, "tickets", ticket.id);
    await updateDoc(firestoreDocument, {
      id: ticket.id,
    });

    if (ticket.id) {
      setAtualId(ticket.id);
    }
  }

  useEffect(() => {
    if (!!atualId.length) fileUpload();
  }, [atualId]);

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
                options={products}
                sx={{ width: "100%" }}
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                filterSelectedOptions={true}
                renderInput={(params) => (
                  <TextField {...params} label="Produto" />
                )}
              />
            </li>
            <li>
              <Autocomplete
                disablePortal
                aria-required={true}
                value={defineCategories}
                onChange={(event, value) => {
                  setDefineCategories(value);
                  console.log(...defineCategories);
                }}
                id="combo-box-demo"
                options={categories.map((category) => category.title)}
                sx={{ width: "100%" }}
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                filterSelectedOptions={true}
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
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                filterSelectedOptions={true}
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
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                filterSelectedOptions={true}
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
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                filterSelectedOptions={true}
                options={affectedUsers.map(
                  (affectedUser) => affectedUser.title
                )}
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
                getOptionSelected={(option, value) =>
                  option.value === value.value
                }
                filterSelectedOptions={true}
                options={operation}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Operação parada?" />
                )}
              />
            </li>
            <li>
              <Input
                type="file"
                onChange={(e) => {
                  for (let i = 0; i < e.target.files.length; i++) {
                    const newFiles = e.target.files[i];
                    newFiles["uuid"] = uuidv4();
                    setFiles((prevState) => [...prevState, newFiles]);
                  }
                }}
                inputProps={{ multiple: true }}
              ></Input>
            </li>
            <li>
              <MUIRichTextEditor
                className="muiRTE"
                label="Descrição"
                onSave={descriptDataSave}
                inlineToolbar={true}
                onChange={onEditorChange}
              ></MUIRichTextEditor>
            </li>
          </ul>
          <Button
            className="saveBtn"
            variant="contained"
            onClick={(e) => {
              createTicket();
            }}
          >
            Salvar
          </Button>
          <Button onClick={handleModalClose}>Fechar</Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

const priority = ["Alta", "Média", "Baixa"];
const products = ["Carro", "Casa", "Cavalo"];
const environment = [
  "Dados/Ambiente de testes - Somente testes",
  "Ambiente de produção - Cliete Ativo/Licença",
];
const operation = ["Sim", "Não"];
const affectedUsers = [
  { title: "Apenas 1" },
  { title: "1 a 10 Usuários" },
  { title: "11 a 30 Usuários" },
  { title: "31 a 50 Usuários" },
  { title: "Mais de 50 Usuários" },
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
