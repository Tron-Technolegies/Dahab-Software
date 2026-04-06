import React, { useState } from "react";
import { useGetWarrantyStats } from "../../hooks/warranty/useWarranty";
import Loading from "../../components/Loading";
import WarrantyStatsCard from "../../components/warranty/WarrantyStatsCard";
import WarrantyTable from "../../components/warranty/WarrantyTable";
import AddWarrantyPopup from "../../components/warranty/AddWarrantyPopup";

export default function Warranty() {
  const [open, setOpen] = useState(false);
  const { isError, isLoading, error, data: stats } = useGetWarrantyStats();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex md:flex-row flex-col gap-5 justify-between md:items-center pb-3 border-b border-gray-200">
        <div>
          <h2 className="md:text-2xl font-medium text-lg my-2">Warranties</h2>
          <p>View and manage warranty information for all miners.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-homeBg hover:bg-homeBgGradient text-white"
        >
          + Add Warranty
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-6">
          <WarrantyStatsCard
            item={{
              title: "Total Warranties",
              subtitle: "All miners",
            }}
            value={stats.warranties}
          />
          <WarrantyStatsCard
            item={{
              title: "Active Warranties",
              subtitle: "Currently covered",
            }}
            value={stats.active}
          />
          <WarrantyStatsCard
            item={{
              title: "Expiring Soon",
              subtitle: "Within 30 days",
            }}
            value={stats.expireSoon}
          />
          <WarrantyStatsCard
            item={{
              title: "Expired",
              subtitle: "Need renewal",
            }}
            value={stats.expired}
          />
        </div>
      )}
      <WarrantyTable />
      <AddWarrantyPopup open={open} handleClose={() => setOpen(false)} />
    </div>
  );
}
