import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export const useGetAllMinerModels = ({ search, currentPage }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["miner-models", search, currentPage],
    queryFn: async () => {
      const { data } = await api.get(`/admin/miner-model`, {
        params: { search, currentPage },
      });
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useGetAllMinerDropdowns = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["miner-models-dropdown"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/miner-model/dropdown`);
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useEditMinerModel = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ data, id }) => {
      await api.patch(`/admin/miner-model/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miner-models"] });
      queryClient.invalidateQueries({ queryKey: ["miner-models-dropdown"] });
      queryClient.invalidateQueries({ queryKey: ["single-miner-model"] });
      toast.success("Successfully updated");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetSingleMinerModel = ({ id }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["single-miner-model", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/miner-model/${id}`);
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useDeleteMinerModel = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/admin/miner-model/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miner-models"] });
      queryClient.invalidateQueries({ queryKey: ["miner-models-dropdown"] });
      queryClient.invalidateQueries({ queryKey: ["single-miner-model"] });
      toast.success("Deleted ");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetMinerModels = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["miner-models-dropdown"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/miner-model/dropdown`);
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useAddMinerModel = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/miner-model`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["miner-models-dropdown"] });
      queryClient.invalidateQueries({ queryKey: ["miner-models"] });
      queryClient.invalidateQueries({ queryKey: ["single-miner-model"] });
      toast.success("New miner model added successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
