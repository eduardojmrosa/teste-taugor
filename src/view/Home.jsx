import { useState } from "react";
import Modal from "../components/BasicModal";
import { CreateNewTicket } from "../components/CreateNewTicket";
import { TopAppBar } from "../components/TopAppBar";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridDemo } from "../components/DataGridDemo";

export function Home() {
  return (
    <div className="homeContainer">
      <TopAppBar></TopAppBar>

      <div className="contentContainer">
        <div className="gridContainer">
          <Modal className="modal"></Modal>
          <DataGridDemo></DataGridDemo>
        </div>
      </div>
    </div>
  );
}
