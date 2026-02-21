import React, { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import BulkUpload from "./BulkUpload";
import Loading from "../Loading";
import useDownloadCSV from "../../hooks/data/useDownloadCSV";

export default function DataPageHeader({ search, setSearch, farm, setFarm }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { loading, downloadCSV } = useDownloadCSV();

  return (
    <div>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0,0,0, 0.5)",
        })}
        open={open}
        onClick={() => setOpen(false)}
      >
        <BulkUpload file={file} setFile={setFile} setOpen={setOpen} />
      </Backdrop>
      <h4 className="md:text-2xl text-lg my-2">All Datas</h4>
      <div className="flex flex-col gap-2 items-end justify-end">
        <Link
          to={"/data/new"}
          className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link w-fit"
        >
          Add New Data
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link w-fit"
        >
          Add Bulk Data
        </button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 px-5 py-7 bg-white my-5 rounded-lg">
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
            {[
              "ALL",
              "LIWA 1",
              "LIWA 2",
              "LIWA 3",
              "LIWA 4",
              "BADA ZAYED 1",
              "MBZ 1",
              "BAHYA 1",
              "BAHYA 2",
              "AL FALAH 1",
              "SWEIHAN 1",
              "AL AIN 1",
              "SHAMKHA 1",
              "ADLA 1",
              "SHAKABOUT 1",
              "BAHYA STORAGE",
              "MUSSAFAH OFFICE",
              "LIWA OFFICE",
              "WARRANTY CENTRE",
              "REPAIR CENTRE",
              "MBZ HYDRO 1",
              "ALAIN HYDRO 1",
              "ALAIN HYDRO 2",
            ].map((x, i) => (
              <option key={i}>{x}</option>
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
    </div>
  );
}
