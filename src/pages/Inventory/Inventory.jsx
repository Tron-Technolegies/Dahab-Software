import React, { useEffect, useState } from "react";
import { useGetAllInventory } from "../../hooks/inventory/useInventory";
import Loading from "../../components/Loading";
import AdminInventoryHeader from "../../components/inventory/AdminInventoryHeader";
import AdminInventoryTable from "../../components/inventory/AdminInventoryTable";
import PaginationComponent from "../../components/PaginationComponent";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [debounced, setDebounced] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading: loading,
    data,
    isError,
    error,
  } = useGetAllInventory({ search: debounced, type, currentPage });

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
    <div className="flex flex-col gap-3">
      <AdminInventoryHeader
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />
      <AdminInventoryTable items={data.items} />
      {data?.totalPages > 1 && (
        <PaginationComponent
          page={currentPage}
          totalPage={data?.totalPages}
          pageChange={(e, v) => {
            setCurrentPage(v);
          }}
        />
      )}
    </div>
  );
}
