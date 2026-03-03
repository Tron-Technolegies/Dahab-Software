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
      <div className="pb-3 border-b border-gray-200">
        <h4 className="text-xl font-medium">Notifications</h4>
        <p>Real-time notifications across clients and machines</p>
      </div>
      <div className="flex md:flex-row flex-col justify-between md:items-center">
        <p className="font-semibold">{`${data?.totalNotifications} notifications found`}</p>
        <div className="max-w-37.5 w-full ms-auto">
          <FormSelect
            issue
            list={["ALL", "read", "unread"]}
            value={status}
            onchange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>
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
