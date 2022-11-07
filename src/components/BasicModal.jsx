import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CreateNewTicket } from "./CreateNewTicket";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./TopAppBar.jsx";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button className="modalBtn" onClick={handleOpen}>
          Criar
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="createTicketModal">
            <CreateNewTicket></CreateNewTicket>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
