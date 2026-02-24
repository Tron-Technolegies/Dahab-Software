import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export const useGetMessageGroups = ({ currentPage, query }) => {
  const { isLoading, isError, error, isSuccess, data } = useQuery({
    queryKey: ["message-groups", currentPage, query],
    queryFn: async () => {
      const { data } = await api.get(`/admin/messages/message-groups`, {
        params: { currentPage, query },
      });
      return data;
    },
  });
  return { isLoading, isError, error, isSuccess, data };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: sendMessage } = useMutation({
    mutationFn: async ({ message, issueGroup }) => {
      await api.post(`/admin/messages/send`, {
        message,
        issueGroup,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["message-groups"],
        exact: false,
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, sendMessage };
};
