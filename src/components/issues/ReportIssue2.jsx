import Switch from "@mui/material/Switch";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useGetIssueType,
  useReportIssue,
} from "../../hooks/issues/useIssueTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "black",
  maxHeight: 500,
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

function ReportIssue2({ open, handleClose, currentMiner }) {
  const [checked, setChecked] = useState(false);
  const { isPending, mutateAsync } = useReportIssue();
  const { isLoading: issueLoading, data: issues } = useGetIssueType();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);
    data.client = currentMiner?.client;
    data.miner = currentMiner?._id;
    data.workerId = currentMiner?.workerId;
    data.status = checked ? "offline" : "online";
    await mutateAsync(data);
    handleClose();
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="">
          <p className="text-lg font-semibold">Report Issue</p>
          <form className="my-5 flex flex-col gap-2" onSubmit={handleSubmit}>
            <label className="text-xs">Client</label>
            <input
              value={currentMiner?.clientName}
              required
              name="client"
              disabled
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            />

            <label className="text-xs">Worker Id</label>
            <input
              value={currentMiner?.workerId}
              required
              name="workerId"
              disabled
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            />
            <label className="text-xs">Miner Details</label>
            <input
              value={currentMiner?.model}
              required
              name="miner"
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            />
            <label className="text-xs">Issue</label>
            <select
              name="issue"
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
              required
            >
              {!issueLoading &&
                issues?.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.issueType}
                  </option>
                ))}
            </select>
            <label className="text-xs">Issue Description</label>
            <textarea
              rows={3}
              name="description"
              className="p-2 rounded-md shadow bg-gray-100 outline-none"
            ></textarea>
            <label className="text-xs">
              Turn Offline
              <Switch
                checked={checked}
                onChange={handleChange}
                slotProps={{ input: { "aria-label": "controlled" } }}
              />
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="p-2 rounded-md bg-indigo-700 text-white cursor-pointer"
            >
              {isPending ? "Creating...." : "Create Issue Ticket"}
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

export default ReportIssue2;
