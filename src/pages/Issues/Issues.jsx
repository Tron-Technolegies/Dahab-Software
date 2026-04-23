import React, { useEffect, useState } from "react";
import IssueTypesSection from "../../components/issues/IssueTypesSection";
import ReportIssue1 from "../../components/issues/ReportIssue1";
import { useGetAllIssues } from "../../hooks/issues/useIssueTypes";
import Loading from "../../components/Loading";
import IssueCard from "../../components/issues/IssueCard";

export default function Issues() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState("ALL");
  const { isError, isLoading, data } = useGetAllIssues({
    search: debounced,
    currentPage,
    status,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex md:flex-row flex-col gap-5 justify-between md:items-center pb-3 border-b border-gray-200">
        <div>
          <h2 className="md:text-2xl font-medium text-lg my-2">Issues</h2>
          <p>Track and manage reported issues from users</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-homeBg hover:bg-homeBgGradient text-white"
        >
          + Add Issue
        </button>
      </div>
      <IssueTypesSection />
      <ReportIssue1 open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-medium">All Issues</h4>
        <div className="flex justify-between">
          <input
            type="search"
            className="outline-none p-2 bg-gray-100 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search.."
          />
          <select
            className="outline-none p-2 bg-gray-100 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={"ALL"}>ALL</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Warranty"}>Warranty</option>
            <option value={"Repair Center"}>Repair Center</option>
            <option value={"Resolved"}>Resolved</option>
          </select>
        </div>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p>something went wrong</p>
        ) : data.issues?.length > 0 ? (
          data.issues.map((item) => <IssueCard key={item._id} issue={item} />)
        ) : (
          <p>No Issues Found</p>
        )}
      </div>
    </div>
  );
}
