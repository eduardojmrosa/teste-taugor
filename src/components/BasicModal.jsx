import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CreateNewTicket } from "./CreateNewTicket";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./TopAppBar.jsx";
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
  Firestore,
} from "firebase/firestore";
import { db, storage } from "../App.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vh",
  height: "100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log("Open");
  };
  const handleModalClose = () => {
    setOpen(false);
    console.log("Close");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button className="modalBtn" variant="contained" onClick={handleOpen}>
          Criar
        </Button>
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="createTicketModal">
            <CreateNewTicket
              handleModalClose={handleModalClose}
            ></CreateNewTicket>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
