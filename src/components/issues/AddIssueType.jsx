import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAddIssueType } from "../../hooks/issues/useIssueTypes";

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
export default function AddIssueType({ open, handleClose }) {
  const [issueType, setIssueType] = useState("");
  const { isPending, mutateAsync } = useAddIssueType();
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
          Add New Issue Type
        </Typography>
        <p className="text-sm text-gray-500 mb-5">
          Create a new issue type that will appear in the client report issue
          dropdown.
        </p>
        <form
          className="flex flex-col gap-2 text-black"
          onSubmit={async (e) => {
            e.preventDefault();
            const data = { issueType };
            await mutateAsync(data);
            handleClose();
          }}
        >
          <label className="text-xs font-medium">Issue Type</label>
          <input
            type="text"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            required
            placeholder="Add New Issue Type"
            className="p-2 rounded-md bg-gray-100 "
          />
          <button
            disabled={isPending}
            className="bg-homeBg hover:bg-homeBgGradient mt-2 text-white"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
