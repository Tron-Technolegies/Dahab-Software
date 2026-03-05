import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useGetAllClients = ({ currentPage, query, status }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["clients", currentPage, query, status],
    queryFn: async () => {
      const { data } = await api.get(`/admin/client`, {
        params: { currentPage, query, status },
      });
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useAddClient = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/client`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
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

export const useGetSingleClient = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/client/${id}`);
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useEditClient = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/client`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client"] });
      toast.success("Updated");
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

export const useAddInternalNote = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/client/add-note`, data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["client", data.user] });
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

export const useClearInternalNotes = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/client/clear-note`, data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["client", data.user] });
      toast.success("Cleared");
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

export const useDeleteClient = () => {};
