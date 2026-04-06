import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const useGetAllMiningFarms = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["farms"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/mining-farm`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useGetFarmDropdown = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["farms-dropdown"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/mining-farm/dropdown`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useGetMinersInFarm = ({ id }) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["farm-miners", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/mining-farm/miners/${id}`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useAddMiningFarm = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post("/admin/mining-farm", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
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

export const useCreateFarmAnnouncement = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post("/admin/mining-farm/announcement", data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      queryClient.invalidateQueries({ queryKey: ["farm-miners", data.farmId] });
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

export const useUpdateMiningFarm = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch("/admin/mining-farm", data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      queryClient.invalidateQueries({
        queryKey: ["farm-miners", data.farmId],
      });
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

export const useUpdateFarmStatus = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch("/admin/mining-farm/status", data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      queryClient.invalidateQueries({
        queryKey: ["farm-miners", data.farmId],
      });
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

export const useBulkUpdateFarmStatus = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch("/admin/mining-farm/bulk-status", data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      queryClient.invalidateQueries({
        queryKey: ["farm-miners", data.farmId],
      });
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

export const useBulkMoveFarm = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch("/admin/mining-farm/bulk-move", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      queryClient.invalidateQueries({
        queryKey: ["farm-miners"],
      });
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

export const useDeleteFarm = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/admin/mining-farm/${id}`);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      queryClient.invalidateQueries({
        queryKey: ["farm-miners", data.farmId],
      });
      toast.success("Success");
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
