import React from "react";
import AddInventoryItemHeader from "../../components/inventory/addInventoryItem/AddInventoryItemHeader";
import AddInventoryItemForm from "../../components/inventory/addInventoryItem/AddInventoryItemForm";

export default function AddInventory() {
  return (
    <div>
      <AddInventoryItemHeader />
      <AddInventoryItemForm />
    </div>
  );
}
