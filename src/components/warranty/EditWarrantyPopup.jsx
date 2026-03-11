import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useUpdateWarranty } from "../../hooks/warranty/useWarranty";
import Loading from "../Loading";

const style = {
  position: "absolute",
  color: "black",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  maxHeight: 550,
  overflowY: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function EditWarrantyPopup({ open, handleClose, item }) {
  const { isPending, mutateAsync } = useUpdateWarranty();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Warranty
        </Typography>
        <p className="text-xs">{`Update Warranty for ${item?.miner?.model}`}</p>

        <form
          className="my-5 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            data.warrantyId = item?._id;
            await mutateAsync(data);
            handleClose();
            e.target.reset();
          }}
        >
          <label className="text-xs font-medium">Warranty Type</label>
          <select
            required
            name="type"
            defaultValue={item?.warrantyType}
            className="p-2 bg-neutral-100 rounded-md shadow-md outline-none"
          >
            <option value={"Manufacturer"}>Manufacturer</option>
            <option value={"Dahab"}>Dahab</option>
          </select>
          <label className="text-xs font-medium">Start Date</label>
          <input
            required
            name="startDate"
            defaultValue={item?.startDate?.toString()?.slice(0, 10)}
            className="p-2 bg-neutral-100 rounded-md shadow-md outline-none"
            type="date"
          />
          <label className="text-xs font-medium">End Date</label>
          <input
            required
            name="endDate"
            defaultValue={item?.endDate?.toString()?.slice(0, 10)}
            className="p-2 bg-neutral-100 rounded-md shadow-md outline-none"
            type="date"
          />
          <button type="submit" className="bg-blue-900 text-white mt-2">
            {isPending ? "Updating...." : "Update"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
