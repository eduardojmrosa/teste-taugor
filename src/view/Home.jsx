import BasicModal from "../components/BasicModal";
import { TopAppBar } from "../components/TopAppBar";
import { DataGridDemo } from "../components/DataGridDemo";

export function Home() {
  return (
    <div className="homeContainer">
      <TopAppBar></TopAppBar>

      <div className="contentContainer">
        <div className="gridContainer">
          <BasicModal className="modal"></BasicModal>
          <DataGridDemo></DataGridDemo>
        </div>
      </div>
    </div>
  );
}
