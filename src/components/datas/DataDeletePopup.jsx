import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteData } from "../../hooks/data/useData";

export default function DataDeletePopup({ open, handleClose, item }) {
  const { isPending, mutateAsync } = useDeleteData();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete this Data ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Are you sure you want to delete this data for the model ${item?.modelName} with serial number ${item?.serialNumber} of client ${item?.clientName}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: "gray", color: "white" }}
        >
          No
        </Button>
        <Button
          disabled={isPending}
          onClick={async () => {
            await mutateAsync(item?._id);
            handleClose();
          }}
          autoFocus
          sx={{ backgroundColor: "red", color: "white" }}
        >
          {isPending ? "Deleting..." : "  Yes, Proceed"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
