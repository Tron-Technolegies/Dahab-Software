import React, { useEffect, useState } from "react";
import { useGetAllClients } from "../../hooks/client/useClient";
import Loading from "../../components/Loading";
import ClientCard from "../../components/clients/ClientCard";
import AddClientModal from "../../components/clients/AddClientModal";
import PaginationComponent from "../../components/PaginationComponent";

export default function Clients() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { isError, isLoading, error, data } = useGetAllClients({
    currentPage,
    query: debounced,
    status: "",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(query);
    }, 700);
    return () => clearTimeout(handler);
  }, [query]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex md:flex-row flex-col gap-5 justify-between md:items-center pb-3 border-b border-gray-200">
        <div>
          <h2 className="md:text-2xl font-medium text-lg my-2">Clients</h2>
          <p>Manage all mining clients and their miners</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-homeBg hover:bg-homeBgGradient text-white"
        >
          + Add Client
        </button>
      </div>
      <div className="mt-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-md bg-gray-100"
          placeholder="search..."
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <div className="my-5 flex flex-col gap-3">
          {data.clients?.map((item) => (
            <ClientCard client={item} key={item._id} />
          ))}
        </div>
      )}
      <AddClientModal open={open} handleClose={() => setOpen(false)} />
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
