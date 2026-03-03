import React, { useEffect, useState } from "react";
import { useGetRepairMiners } from "../../hooks/repair/useRepair";
import AdminRepairHeader from "../../components/repair/AdminRepairHeader";
import Loading from "../../components/Loading";
import AdminRepairTable from "../../components/repair/AdminRepairTable";
import PaginationComponent from "../../components/PaginationComponent";

export default function Repair() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const { isError, isLoading, error, data } = useGetRepairMiners({
    search: debounced,
    currentPage: page,
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
        <div className="flex flex-col gap-3">
          <AdminRepairTable miners={data.miners} />
          {data?.totalPages > 1 && (
            <PaginationComponent
              page={page}
              totalPage={data?.totalPages}
              pageChange={(e, v) => {
                setPage(v);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
