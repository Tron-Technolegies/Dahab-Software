import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useGetAllInventory = ({ search, type }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["inventory", search, type],
    queryFn: async () => {
      const { data } = await api.get(`/admin/inventory`, {
        params: { search, type },
      });
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useTotalAlerts = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["total-alerts"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/alerts/count`);
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useAddInventoryItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/inventory`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Added");
      navigate("/inventory");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetSingleItem = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["single-inventory", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/inventory/${id}`);
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/inventory/${data?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["single-inventory"] });
      toast.success("Updated");
      navigate("/inventory");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useUpdateRestock = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/alerts`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["total-alerts"] });
      toast.success("Updated");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetAllAlerts = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/alerts`);
      return data;
    },
  });
  return { isLoading, isError, error, data };
};

export const useClearAlert = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/admin/alerts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["total-alerts"] });
      toast.success("Cleared");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
