import React, { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import BulkUpload from "./BulkUpload";
import Loading from "../Loading";
import useDownloadCSV from "../../hooks/data/useDownloadCSV";
import AddSelectPopup from "./AddSelectPopup";
import BulkUploadDataV2 from "./BulkUploadDataV2";
import { useGetFarmDropdown } from "../../hooks/miningfarm/useMiningFarm";

export default function DataPageHeader({ search, setSearch, farm, setFarm }) {
  const [open, setOpen] = useState(false);
  const [openAddSelector, setOpenAddSelector] = useState(false);
  const [file, setFile] = useState(null);
  const { loading, downloadCSV } = useDownloadCSV();
  const { isLoading: farmLoading, data: farmData } = useGetFarmDropdown();

  return (
    <div>
      {/* <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0,0,0, 0.5)",
        })}
        open={open}
        onClick={() => setOpen(false)}
      >
        <BulkUpload file={file} setFile={setFile} setOpen={setOpen} />
      </Backdrop> */}
      <BulkUploadDataV2 open={open} handleClose={() => setOpen(false)} />
      <div className="flex md:flex-row flex-col justify-between gap-5 md:items-center border-b border-gray-200 pb-3">
        <div>
          <h4 className="md:text-2xl font-medium text-lg my-2">Miners</h4>
          <p>Manage all mining equipment and monitor performance</p>
        </div>
        <div className="flex flex-col gap-2 items-end justify-end">
          <button
            onClick={() => setOpenAddSelector(true)}
            className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link w-fit"
          >
            Add New Data
          </button>
          <button
            onClick={() => setOpen(true)}
            className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link w-fit"
          >
            Add Bulk Data
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 px-5 py-7 my-5 rounded-lg bg-gray-100 shadow-md">
        <div className="flex flex-col gap-3">
          <label>Search Keyword:</label>
          <input
            type="search"
            className="bg-neutral-300 p-2 rounded-md outline-none"
            placeholder="Enter Search Keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label>Farm Location:</label>
          <select
            value={farm}
            onChange={(e) => setFarm(e.target.value)}
            className={`bg-neutral-300 p-2 rounded-md outline-none`}
          >
            <option value={"ALL"}>ALL</option>
            {farmData?.map((x, i) => (
              <option key={i} value={x.farm}>
                {x.farm}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link mb-5"
        onClick={() => downloadCSV()}
      >
        Download CSV
      </button>
      {loading && <Loading />}
      <AddSelectPopup
        open={openAddSelector}
        handleClose={() => setOpenAddSelector(false)}
      />
    </div>
  );
}
