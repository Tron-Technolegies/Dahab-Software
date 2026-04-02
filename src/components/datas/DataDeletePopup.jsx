import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteData, useDeleteDataV2 } from "../../hooks/data/useData";

export default function DataDeletePopup({ open, handleClose, item }) {
  const { isPending, mutateAsync } = useDeleteData();
  const { isPending: isPendingV2, mutateAsync: mutateAsyncV2 } =
    useDeleteDataV2();
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
          {`Are you sure you want to delete this data for the model ${item?.modelName || item?.model} with serial number ${item?.serialNumber} of client ${item?.clientName}?`}
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
          disabled={isPending || isPendingV2}
          onClick={async () => {
            if (item?.version === "2") {
              await mutateAsyncV2(item?._id);
            } else {
              await mutateAsync(item?._id);
            }
            handleClose();
          }}
          autoFocus
          sx={{ backgroundColor: "red", color: "white" }}
        >
          {isPending || isPendingV2 ? "Deleting..." : "  Yes, Proceed"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
