import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  useGetSingleItem,
  useUpdateInventory,
} from "../../hooks/inventory/useInventory";
import Loading from "../../components/Loading";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";

export default function SingleInventory() {
  const { id } = useParams();
  const {
    isLoading: loading,
    data: item,
    isError,
    error,
  } = useGetSingleItem({ id });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Repair Components");
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(1);
  const [location, setLocation] = useState("");
  const [remark, setRemark] = useState("");
  const { isPending: updateLoading, mutateAsync: updateItem } =
    useUpdateInventory();
  const user = useOutletContext();

  useEffect(() => {
    if (item) {
      setName(item.itemName);
      setCategory(item.category);
      setQuantity(item.quantity);
      setThreshold(item.threshold);
      setLocation(item.location);
      setRemark(item.remark);
    }
  }, [item, loading]);
  return loading ? (
    <Loading />
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div>
      <div className="my-5 flex justify-end">
        <Link
          to={"/inventory"}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
        >
          Go Back
        </Link>
      </div>
      <h2 className="md:text-2xl text-lg my-2">{item?.itemName}</h2>
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
          disabled={user?.role === "admin"}
          value={quantity}
          onchange={(e) => setQuantity(e.target.value)}
        />
        <FormInput
          title={"Threshold"}
          type={"number"}
          placeholder={"Enter minimum quantity"}
          disabled={user?.role === "admin"}
          admin
          defaultValue={1}
          value={threshold}
          onchange={(e) => setThreshold(e.target.value)}
        />
        <FormInput
          title={"Location"}
          type={"text"}
          placeholder={"Enter location"}
          disabled={user?.role === "admin"}
          admin
          value={location}
          notRequired
          onchange={(e) => setLocation(e.target.value)}
        />
        <FormInput
          title={"Remark"}
          type={"text"}
          placeholder={"Enter Remark"}
          disabled={user?.role === "admin"}
          admin
          notRequired
          value={remark}
          onchange={(e) => setRemark(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white disabled:cursor-not-allowed disabled:bg-gray-200"
            disabled={user?.role === "admin" || updateLoading}
            onClick={async () => {
              const data = {
                id,
                itemName: name,
                category,
                quantity,
                threshold,
                location,
                remark,
              };
              await updateItem(data);
            }}
          >
            {updateLoading ? "Updating...." : "Update  "}
          </button>
        </div>
      </div>
    </div>
  );
}
