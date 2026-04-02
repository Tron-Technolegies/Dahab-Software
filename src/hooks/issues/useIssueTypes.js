import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useGetIssueType = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["issue-type"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/issue/type`);
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useAddIssueType = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/issue/type`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue-type"] });
      toast.success("Added");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "Something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useUpdateIssueType = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/issue/type`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue-type"] });
      toast.success("Updated");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "Something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
