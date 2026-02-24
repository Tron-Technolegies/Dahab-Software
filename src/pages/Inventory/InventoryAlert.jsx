import React from "react";
import { useGetAllAlerts } from "../../hooks/inventory/useInventory";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import AlertElement from "../../components/inventory/alert/AlertElement";

export default function InventoryAlert() {
  const {
    isLoading: loading,
    data: alerts,
    isError,
    error,
  } = useGetAllAlerts();
  return loading ? (
    <Loading />
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div>
      <div className="flex justify-end">
        <Link
          to={"/inventory"}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
        >
          Go Back
        </Link>
      </div>
      <h2 className="md:text-2xl text-lg my-2">Restock Alerts</h2>
      <div className="my-10 flex flex-col gap-2">
        {alerts?.alerts?.map((alert) => (
          <AlertElement
            key={alert._id}
            id={alert._id}
            alertStatus={alert.status}
            item={alert.alertItem}
            stock={alert.currentStock}
            message={alert.message}
          />
        ))}
      </div>
    </div>
  );
}
