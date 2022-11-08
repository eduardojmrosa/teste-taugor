import AppBar from "@mui/material/AppBar";
import { BsSearch } from "react-icons/bs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import LongMenu from "./LongMenu";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#004443",
    },
  },
});
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
export function TopAppBar() {
  return (
    <div className="appBar">
      <ThemeProvider theme={theme}>
        <AppBar className="muiAppBar">
          <div className="searchComponents">
            <div className="searchIconBtn">
              <BsSearch className="searchIcon"></BsSearch>
            </div>

            <TextField
              size="small"
              value={""}
              className="searchInput"
              id="outlined-basic"
              label="Buscar"
              variant="outlined"
              name="search"
              type="text"
            />
            <LongMenu className="lonMenu"></LongMenu>
          </div>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
