import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./TopAppBar.jsx";
import MUIRichTextEditor from "mui-rte";
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";

const descriptDataSave = (data) => {
  console.log(data);
};
export function CreateNewTicket() {
  const [product, setProduct] = useState("");
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
                name="title"
                type="text"
              />
            </li>
            <hr className="divider"></hr>
            <li>
              <ComboBox
                placeholder="texte"
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              ></ComboBox>
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
        </ThemeProvider>
      </div>
    </div>
  );
}

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      multiple={true}
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}

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
