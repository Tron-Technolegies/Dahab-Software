import React, { useEffect, useState } from "react";
import { useGetMessageGroups } from "../../hooks/messages/useAdminMessages";
import Loading from "../../components/Loading";
import MessageBox from "../../components/messages/MessageBox";

export default function Messages() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { isLoading, data, error } = useGetMessageGroups({
    currentPage,
    query: debouncedQuery,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  return isLoading ? (
    <Loading />
  ) : error ? (
    <p>{error.message}</p>
  ) : (
    <div>
      <h4 className="text-xl font-semibold">All Messages</h4>
      <div className="flex md:gap-2 gap-1 items-center my-5">
        <input
          type="text"
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="py-1 px-3 rounded-lg  border border-gray-300 text-gray-900 h-11"
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {data &&
          data.messageGroups?.map((item) => (
            <MessageBox key={item._id} {...item} />
          ))}
      </div>
    </div>
  );
}
