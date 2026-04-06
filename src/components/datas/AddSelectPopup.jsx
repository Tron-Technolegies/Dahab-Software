import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  maxHeight: 500,

  boxShadow: 24,
  p: 4,
};

export default function AddSelectPopup({ open, handleClose }) {
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
          Add New Data
        </Typography>
        <div className="my-4 flex flex-col gap-2">
          <Link
            to={"/data/new"}
            className="px-4 py-2 bg-homeBg hover:bg-homeBgGradient rounded-md text-center"
          >
            Add Via Manual Data
          </Link>
          <Link
            to={"/data/newV2"}
            className="px-4 py-2 bg-homeBg hover:bg-homeBgGradient rounded-md text-center"
          >
            Add Via In-App Data
          </Link>
        </div>
      </Box>
    </Modal>
  );
}
