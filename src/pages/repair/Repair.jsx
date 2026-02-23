import React, { useEffect, useState } from "react";
import { useGetRepairMiners } from "../../hooks/repair/useRepair";
import AdminRepairHeader from "../../components/repair/AdminRepairHeader";
import Loading from "../../components/Loading";
import AdminRepairTable from "../../components/repair/AdminRepairTable";

export default function Repair() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const { isError, isLoading, error, data } = useGetRepairMiners({
    search: debounced,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 700);

    return () => clearTimeout(handler);
  }, [search]);
  return (
    <div>
      <AdminRepairHeader search={search} setSearch={setSearch} />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <AdminRepairTable miners={data} />
      )}
    </div>
  );
}
