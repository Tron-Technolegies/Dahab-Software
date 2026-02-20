import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import useBulkUpload from "../../hooks/data/useBulkUpload";
import Loading from "../Loading";

export default function BulkUpload({ file, setFile, setOpen }) {
  const { handleFileUpload, loading } = useBulkUpload();
  return (
    <div
      className="p-10 bg-white rounded-lg w-82.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <label
          className={`flex flex-col gap-2 justify-center bg-blue-500 border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
        >
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".xlsx, .xls"
            required
            // disabled={disabled ? true : false}
          />
          <div className="text-xl">
            <BsUpload />
          </div>
          <p>Select File</p>
        </label>
        {file && <p className="text-black">{file.name}</p>}
        <button
          disabled={loading}
          onClick={async () => {
            await handleFileUpload(file);
            setFile(null);
            setOpen(false);
          }}
          className="bg-homeBg text-white px-5 py-2 rounded-lg hover:bg-homeBgGradient nav-link w-fit"
        >
          Upload
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}
