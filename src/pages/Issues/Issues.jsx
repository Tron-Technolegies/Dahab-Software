import React, { useState } from "react";
import IssueTypesSection from "../../components/issues/IssueTypesSection";
import ReportIssue1 from "../../components/issues/ReportIssue1";

export default function Issues() {
  const [open, setOpen] = useState(false);
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
    </div>
  );
}
