import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useGetAllWarranties = ({ currentPage, type, query }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["warranties", currentPage, type, query],
    queryFn: async () => {
      const { data } = await api.get(`/admin/warranty`, {
        params: { currentPage, type, query },
      });
      return data;
    },
  });
  return { isError, error, isLoading, data };
};

export const useGetSingleWarranty = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["warranty", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/warranty/${id}`);
      return data;
    },
  });
  return { isError, error, isLoading, data };
};

export const useGetWarrantyStats = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["warranty-stats"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/warranty/stats`);
      return data;
    },
  });
  return { isError, error, isLoading, data };
};

export const useMinersWithoutWarranty = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["no-warranty"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/warranty/no-warranty`);
      return data;
    },
  });
  return { isError, error, isLoading, data };
};

export const useAddWarranty = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/warranty`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warranties"] });
      queryClient.invalidateQueries({ queryKey: ["warranty-stats"] });
      toast.success("Added");
    },
    onError: (error) => {
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          error.message,
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useUpdateWarranty = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/warranty`, data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["warranties"] });
      queryClient.invalidateQueries({
        queryKey: ["warranty", data.warrantyId],
      });
      toast.success("Added");
    },
    onError: (error) => {
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          error.message,
      );
    },
  });
  return { isPending, mutateAsync };
};
