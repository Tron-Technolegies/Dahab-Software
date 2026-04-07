import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetClientDropdown } from "../../hooks/client/useClient";
import { useGetDataDropdown } from "../../hooks/data/useData";
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
  maxHeight: 500,
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function ReportIssue1({ open, handleClose }) {
  const { isLoading: clientsLoading, data: clientsData } =
    useGetClientDropdown();
  const [selectedClientId, setSelectedClientId] = React.useState("");
  const [model, setModel] = useState("");
  const [worker, setWorker] = useState("");
  const { isLoading: minerLoading, data: miners } = useGetDataDropdown({
    search: selectedClientId,
  });
  const [checked, setChecked] = useState(false);
  const { isLoading: issueLoading, data: issueTypes } = useGetIssueType();
  const { isPending, mutateAsync } = useReportIssue();

  useEffect(() => {
    if (worker && miners) {
      setModel(miners.find((item) => item.workerId === worker));
    }
  }, [worker]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "black" }}
        >
          Report Issue
        </Typography>
        <p className="text-sm text-gray-500 mb-5">
          Report an issue for any existing miner
        </p>
        <form
          className="flex flex-col gap-2 text-black"
          onSubmit={async (e) => {
            e.preventDefault();
            const formdata = new FormData(e.target);
            const data = Object.fromEntries(formdata);
            data.client = selectedClientId;
            data.miner = model._id;
            data.workerId = worker;
            data.status = checked ? "offline" : "online";
            await mutateAsync(data);
            e.target.reset();
            setSelectedClientId("");
            setWorker("");
            setModel("");
            handleClose();
          }}
        >
          <label className="text-xs font-medium">Client</label>
          {!clientsLoading && clientsData.length && (
            <Autocomplete
              disablePortal
              options={clientsData}
              sx={{ width: "100%", backgroundColor: "#f3f4f6" }}
              getOptionLabel={(option) => option.clientName || ""}
              onChange={(event, newValue) => {
                setSelectedClientId(newValue?._id || null);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          <label className="text-xs font-medium">Worker Id</label>
          <select
            className="p-2 py-3 outline-none bg-gray-100"
            value={worker}
            onChange={(e) => setWorker(e.target.value)}
          >
            <option value={""}>Select worker</option>
            {!minerLoading &&
              miners.length &&
              miners.map((item) => (
                <option value={item.workerId}>{item.workerId}</option>
              ))}
          </select>
          <label className="text-xs font-medium">Miner Model</label>
          <input
            className="p-2 py-3 outline-none bg-gray-100 disabled:bg-gray-200"
            type="text"
            value={model.model}
            disabled
          />
          <label className="text-xs font-medium">Issue</label>
          <select className="p-2 py-3 outline-none bg-gray-100" name="issue">
            <option value={""}>Select Issue</option>
            {!issueLoading &&
              issueTypes.length &&
              issueTypes.map((item) => (
                <option value={item._id}>{item.issueType}</option>
              ))}
          </select>
          <label className="text-xs font-medium">Description</label>
          <textarea
            className="p-2 py-3 outline-none bg-gray-100 disabled:bg-gray-200"
            name="description"
            rows={5}
          />
          <div className="flex gap-2 items-center">
            <label className="text-xs font-medium">Turn Offline</label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </div>
          <button
            disabled={isPending}
            className="bg-homeBg hover:bg-homeBgGradient text-white"
          >
            {isPending ? "Reporting..." : "Report"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
