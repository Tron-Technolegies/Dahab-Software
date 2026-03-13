import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAddClient } from "../../hooks/client/useClient";

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

export default function AddClientModal({ open, handleClose }) {
  const [watchers, setWatchers] = useState([]);
  const { isPending, mutateAsync } = useAddClient();

  //functions for Watchers
  function addWatchers() {
    setWatchers([...watchers, { link: "", coin: "" }]);
  }
  function updateWatchers(index, field, value) {
    const updated = [...watchers];
    updated[index][field] = value;
    setWatchers(updated);
  }
  function removeWatchers(index) {
    setWatchers(watchers.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("watcher", JSON.stringify(watchers));
    const data = Object.fromEntries(formData);
    await mutateAsync(data);
    handleClose();
  };
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
          Add New Client
        </Typography>
        <form
          className="flex flex-col gap-2 mt-5 text-black"
          onSubmit={handleSubmit}
        >
          <label className="text-sm text-gray-700">Client Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Client ID</label>
          <input
            type="text"
            name="clientId"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500"
          />
          <div className="mb-2 flex flex-col">
            <label className="text-sm text-gray-700">Watcher Links</label>
            {watchers?.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 my-1 mb-4">
                <input
                  type="text"
                  value={item.link}
                  onChange={(e) =>
                    updateWatchers(index, "link", e.target.value)
                  }
                  placeholder="Enter the watcher link"
                  className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
                />
                <input
                  type="text"
                  value={item.coin}
                  onChange={(e) =>
                    updateWatchers(index, "coin", e.target.value)
                  }
                  placeholder="Enter the specific coin"
                  className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
                />
                <button
                  type="button"
                  className="px-2 py-2 rounded-md bg-red-700 text-white"
                  onClick={() => removeWatchers(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="px-2 mt-3 py-2 rounded-md bg-indigo-500 text-white"
              onClick={() => addWatchers()}
            >
              Add New Watcher
            </button>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#1C2340] hover:bg-[#141A32] text-white mt-4 py-2 rounded-md"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </Box>
    </Modal>
  );
}
