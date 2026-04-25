import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAddBulkDataV2 } from "../../hooks/data/useBulkUploadDataV2";
import { BsUpload } from "react-icons/bs";

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

export default function BulkUploadDataV2({ open, handleClose }) {
  const { isPending, mutateAsync } = useAddBulkDataV2();
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
          sx={{ color: "black", marginBottom: 5 }}
        >
          Add Bulk Data
        </Typography>
        <form
          className="flex flex-col items-center gap-4 text-black"
          onSubmit={async (e) => {
            e.preventDefault();
            const formdata = new FormData(e.target);
            await mutateAsync(formdata);
          }}
        >
          <label
            className={`flex flex-col gap-2 justify-center bg-blue-500 border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
          >
            <input
              type="file"
              className="hidden"
              name="file"
              accept=".xlsx, .xls, .csv"
              required
              // disabled={disabled ? true : false}
            />
            <div className="text-xl">
              <BsUpload />
            </div>
            <p>Select File</p>
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="bg-homeBg hover:bg-homeBgGradient mt-2 text-white"
          >
            {isPending ? "Uploading..." : "Upload"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
