import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../../services/api";

export const useGetUnreadNotifications = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["unread-notifications"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/notification/unread`);
      return data;
    },
    onError: (err) => {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isLoading, data, error };
};

export const useGetAllNotifications = ({ currentPage, status }) => {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["notifications", currentPage, status],
    queryFn: async () => {
      const { data } = await api.get(`/admin/notification/all`, {
        params: {
          currentPage,
          status,
        },
      });
      return data;
    },
  });
  return { isLoading, data, error, isSuccess };
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: readNotification } = useMutation({
    mutationFn: async (id) => {
      await api.patch(`/admin/notification/read`, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unread-notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
        exact: false,
      });
    },
    onError: (err) => {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, readNotification };
};
