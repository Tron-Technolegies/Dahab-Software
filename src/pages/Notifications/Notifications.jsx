import React, { useState } from "react";
import { useGetAllNotifications } from "../../hooks/notifications/useNotifications";
import FormSelect from "../../components/FormSelect";
import NotificationContainer from "../../components/notifications/NotificationContainer";
import PaginationComponent from "../../components/PaginationComponent";

export default function Notifications() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const { isLoading, data } = useGetAllNotifications({
    currentPage: page,
    status,
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <h4 className="text-xl font-semibold">All Notifications</h4>
      <div className="max-w-37.5 w-full ms-auto">
        <FormSelect
          issue
          list={["ALL", "read", "unread"]}
          value={status}
          onchange={(e) => setStatus(e.target.value)}
        />
      </div>
      <p className="font-semibold">{`${data?.totalNotifications} notifications found`}</p>
      <NotificationContainer data={data} isLoading={isLoading} />
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
  );
}
