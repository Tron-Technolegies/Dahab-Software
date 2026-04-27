import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGetIssueMessages } from "../../hooks/issues/useIssueTypes";

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

export default function ChatHistoryModal({ open, handleClose, issueId }) {
  const { isLoading, data } = useGetIssueMessages({ issueId });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Chat History</h2>

            {isLoading && <p>Loading messages...</p>}

            {!isLoading && data?.length === 0 && (
              <p className="text-gray-500">No messages found</p>
            )}

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {data?.map((msg) => (
                <div
                  key={msg._id}
                  className="p-3 bg-gray-100 rounded-lg border"
                >
                  <p className="text-sm italic">"{msg.message}"</p>
                  <p className="text-xs font-medium text-end">{msg.sendBy}</p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
