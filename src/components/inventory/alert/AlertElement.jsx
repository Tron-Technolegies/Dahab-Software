import React, { useEffect, useState } from "react";
import {
  useClearAlert,
  useUpdateRestock,
} from "../../../hooks/inventory/useInventory";
import Loading from "../../Loading";

export default function AlertElement({
  id,
  alertStatus,
  item,
  stock,
  message,
}) {
  const options = ["Pending", "Approve", "Ignore"];
  const [status, setStatus] = useState("Pending");
  const { isPending: loading, mutateAsync: updateRestock } = useUpdateRestock();
  const { isPending: clearLoading, mutateAsync: clearAlert } = useClearAlert();

  useEffect(() => {
    if (alertStatus) {
      setStatus(alertStatus);
    }
  }, [alertStatus]);
  return clearLoading ? (
    <Loading />
  ) : (
    <div className="bg-white p-5 rounded-md flex flex-col gap-3">
      <div className="flex justify-end">
        <button
          disabled={clearLoading}
          className="px-3 py-2 rounded-md text-sm bg-red-500 text-white font-semibold"
          onClick={async () => {
            await clearAlert(id);
          }}
        >
          {clearLoading ? "Clearing..." : "Clear"}
        </button>
      </div>
      {alertStatus === "Approve" && (
        <p className="text-green-600 text-lg">Approved</p>
      )}
      {alertStatus === "Ignore" && (
        <p className="text-red-600 text-lg">Cancelled</p>
      )}
      <p className="text-lg font-semibold">{item}</p>
      <p className="font-semibold">Current Stock: {stock}</p>
      <p className="font-semibold">{message}</p>
      <select
        className={`bg-gray-200 p-2 rounded-md outline-none w-fit disabled:cursor-not-allowed`}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={alertStatus === "Approve" || alertStatus === "Ignore"}
      >
        {options.map((x, index) => (
          <option key={index}>{x}</option>
        ))}
      </select>
      <button
        onClick={async () => {
          const data = { id, status };
          await updateRestock(data);
        }}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white w-fit"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}
