import React, { useState } from "react";
import MinerModelPopup from "../../components/minermodels/MinerModelPopup";
import MinerModelTable from "../../components/minermodels/MinerModelTable";

export default function MinerModels() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex md:flex-row flex-col gap-5 justify-between md:items-center pb-3 border-b border-gray-200">
        <div>
          <h4 className="md:text-2xl font-medium text-lg my-2">Miner Models</h4>
          <p>Add and Manage different models</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-homeBg text-white hover:bg-homeBgGradient"
        >
          + Add New
        </button>
      </div>
      <MinerModelPopup open={open} handleClose={() => setOpen(false)} />
      <MinerModelTable />
    </div>
  );
}
