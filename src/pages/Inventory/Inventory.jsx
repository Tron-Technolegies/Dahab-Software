import React, { useEffect, useState } from "react";
import { useGetAllInventory } from "../../hooks/inventory/useInventory";
import Loading from "../../components/Loading";
import AdminInventoryHeader from "../../components/inventory/AdminInventoryHeader";
import AdminInventoryTable from "../../components/inventory/AdminInventoryTable";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [debounced, setDebounced] = useState("");
  const {
    isLoading: loading,
    data: items,
    isError,
    error,
  } = useGetAllInventory({ search: debounced, type });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 700);

    return () => clearTimeout(handler);
  }, [search]);

  return loading ? (
    <Loading />
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div>
      <AdminInventoryHeader
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />
      <AdminInventoryTable items={items} />
    </div>
  );
}
