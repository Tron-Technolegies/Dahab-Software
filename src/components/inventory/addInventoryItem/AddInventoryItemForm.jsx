import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAddInventoryItem } from "../../../hooks/inventory/useInventory";
import FormInput from "../../FormInput";
import FormSelect from "../../FormSelect";

export default function AddInventoryItemForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Repair Components");
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(1);
  const [location, setLocation] = useState("");
  const [remark, setRemark] = useState("");

  const user = useOutletContext();
  const { isPending: loading, mutateAsync: addItem } = useAddInventoryItem();
  return (
    <div className="my-10">
      <FormInput
        title={"Item Name"}
        type={"text"}
        placeholder={"Enter Name"}
        admin
        value={name}
        disabled={user?.role === "admin"}
        onchange={(e) => setName(e.target.value)}
      />
      <FormSelect
        title={"Category"}
        issue
        list={["Repair Components", "Mining Facility Items"]}
        value={category}
        disabled={user?.role === "admin"}
        onchange={(e) => setCategory(e.target.value)}
      />
      <FormInput
        title={"Quantity"}
        type={"number"}
        placeholder={"Enter Quantity"}
        admin
        value={quantity}
        disabled={user?.role === "admin"}
        onchange={(e) => setQuantity(e.target.value)}
      />
      <FormInput
        title={"Threshold"}
        type={"number"}
        placeholder={"Enter minimum quantity"}
        admin
        defaultValue={1}
        disabled={user?.role === "admin"}
        value={threshold}
        onchange={(e) => setThreshold(e.target.value)}
      />
      <FormInput
        title={"Location"}
        type={"text"}
        placeholder={"Enter location"}
        notRequired
        admin
        disabled={user?.role === "admin"}
        value={location}
        onchange={(e) => setLocation(e.target.value)}
      />
      <FormInput
        title={"Remark"}
        type={"text"}
        placeholder={"Enter Remark"}
        admin
        notRequired
        disabled={user?.role === "admin"}
        value={remark}
        onchange={(e) => setRemark(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white disabled:cursor-not-allowed disabled:bg-gray-200"
          onClick={async () => {
            const data = {
              itemName: name,
              category,
              quantity,
              threshold,
              location,
              remark,
            };
            await addItem(data);
          }}
          disabled={user?.role === "admin" || loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
