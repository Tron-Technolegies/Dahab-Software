import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetClientDropdown } from "../../hooks/client/useClient";

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
  const { isLoading, isError, data } = useGetClientDropdown();
  const [selectedClientId, setSelectedClientId] = React.useState(null);
  console.log(selectedClientId);

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
        <form className="flex flex-col gap-2 text-black">
          {!isLoading && data.length && (
            <Autocomplete
              disablePortal
              options={data}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.clientName || ""}
              onChange={(event, newValue) => {
                setSelectedClientId(newValue?._id || null);
              }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          )}
        </form>
      </Box>
    </Modal>
  );
}
