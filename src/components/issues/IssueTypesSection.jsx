import React, { useState } from "react";
import { useGetIssueType } from "../../hooks/issues/useIssueTypes";
import Loading from "../Loading";
import AddIssueType from "./AddIssueType";
import { FaEdit } from "react-icons/fa";
import EditIsseType from "./EditIsseType";

export default function IssueTypesSection() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { isLoading, isError, error, data } = useGetIssueType();
  return (
    <div className="p-5 bg-gray-100 rounded-md my-5 flex flex-col gap-2">
      <p className="md:text-xl text-base font-medium">Issue Types</p>
      <button
        onClick={() => setOpenAdd(true)}
        className="self-end bg-homeBg hover:bg-homeBgGradient text-white"
      >
        Add Issue Type
      </button>
      <div className="flex gap-3 items-center flex-wrap">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p>{error.message}</p>
        ) : data.length ? (
          data.map((item) => (
            <div
              key={item._id}
              className="p-3 shadow-md font-medium flex gap-2 items-center"
            >
              {item.issueType}
              <button
                onClick={() => {
                  setEditItem(item);
                  setOpenEdit(true);
                }}
              >
                <FaEdit />
              </button>
            </div>
          ))
        ) : (
          <p>No Data found</p>
        )}
      </div>
      <AddIssueType open={openAdd} handleClose={() => setOpenAdd(false)} />
      <EditIsseType
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
          setEditItem(null);
        }}
        item={editItem}
      />
    </div>
  );
}
