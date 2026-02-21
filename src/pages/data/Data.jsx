import React, { useEffect, useState } from "react";
import DataPageHeader from "../../components/datas/DataPageHeader";
import DataTable from "../../components/datas/DataTable";
import { useGetDataQuery } from "../../hooks/data/useData";
import Loading from "../../components/Loading";

export default function Data() {
  const [sortData, setSortData] = useState("new");
  const [search, setSearch] = useState("");
  const [farm, setFarm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { isError, isLoading, data, error } = useGetDataQuery({
    search: debounced,
    sortData,
    farm,
    limit,
    currentPage,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  return (
    <div>
      <DataPageHeader
        search={search}
        setSearch={setSearch}
        farm={farm}
        setFarm={setFarm}
      />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>something went wrong</p>
      ) : (
        <DataTable
          data={data}
          setLimit={setLimit}
          limit={limit}
          sortData={sortData}
          setSortData={setSortData}
        />
      )}
    </div>
  );
}
