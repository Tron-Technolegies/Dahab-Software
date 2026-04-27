import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSendIssueResponse } from "../../hooks/issues/useIssueTypes";

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

export default function RespondIssueModal({ open, handleClose, issue }) {
  const [message, setMessage] = useState("");
  const { isPending, mutateAsync } = useSendIssueResponse();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="w-full flex flex-col items-center">
          <div className="">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Respond to Issue
            </h2>

            {/* Dynamic issue info */}
            <p className="text-sm text-gray-500 mb-5">
              Send a response to <strong>{issue.username}</strong> regarding:
              <br />
              <span className="font-medium text-gray-800">
                {issue.issueName || "Unknown Issue"}
              </span>
            </p>

            {/* Form */}
            <form
              className="w-full"
              onSubmit={async (e) => {
                e.preventDefault();
                const data = {
                  message,
                  issue: issue._id,
                };
                await mutateAsync(data);
                handleClose();
              }}
            >
              <label className="text-sm text-gray-700">Your Response</label>

              <textarea
                placeholder="Type your response to the client..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-[#787878] rounded w-full p-2"
              />

              <button
                type="submit"
                disabled={isPending}
                className="bg-[#2B347A] p-2 rounded text-white text-center w-full mt-4"
              >
                {isPending ? "Sending..." : "Send Response"}
              </button>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
