import Modal from "../components/BasicModal";
import { TopAppBar } from "../components/TopAppBar";
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
