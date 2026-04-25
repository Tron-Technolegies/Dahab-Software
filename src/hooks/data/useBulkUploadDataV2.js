import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useAddBulkDataV2 = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/data/bulkDataV2`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success("uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          error.response.data.msg ||
          error.message,
      );
    },
  });
  return { isPending, mutateAsync };
};
