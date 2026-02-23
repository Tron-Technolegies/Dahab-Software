import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useGetRepairMiners = ({ search }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["repair-miners", search],
    queryFn: async () => {
      const { data } = await api.get(`/admin/repair`, { params: { search } });
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useSetPriority = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/repair/set-priority/${data?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      toast.success("Success");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useDeleteRepairMiner = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/admin/repair/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      toast.success("Success");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useAddRepairMiner = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/repair/add`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      toast.success("Added");
      navigate("/repair");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetRelatedMiner = ({ serialNumber }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["related-miner", serialNumber],
    queryFn: async () => {
      const { data } = await api.get(`/admin/repair/related`, {
        params: { serialNumber },
      });
      return data;
    },
  });
  return { isError, isLoading, data };
};

export const useGetReadyToConnect = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["ready-to-connect"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/repair/ready`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useRemoveMiner = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/admin/repair/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ready-to-connect"] });
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      toast.success("Removed");
      navigate("/repair");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useAddIssue = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/repair/issues/${data?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      queryClient.invalidateQueries({ queryKey: ["repair-miner"] });
      toast.success("Success");
      navigate("/repair");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetSingleMiner = ({ id }) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["repair-miner", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/repair/${id}`);
      return data;
    },
  });
  return { isError, error, data, isLoading };
};

export const useGetAvailableParts = () => {
  const { isError, error, isLoading, data } = useQuery({
    queryKey: ["repair-parts"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/repair/parts`);
      return data;
    },
  });
  return { isError, isLoading, error, data };
};

export const useUpdateRepairProcess = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.patch(`/admin/repair/updateStatus`, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      queryClient.invalidateQueries({ queryKey: ["repair-miner"] });
      queryClient.invalidateQueries({ queryKey: ["repair-parts"] });
      queryClient.invalidateQueries({ queryKey: ["repair-qty"] });
      toast.success("Success");
      navigate("/repair");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useUpdateOneRepairStatus = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/repair/updateStatus/${data?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miner"] });
      queryClient.invalidateQueries({ queryKey: ["repair-parts"] });
      queryClient.invalidateQueries({ queryKey: ["repair-qty"] });
      toast.success("Success");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const usePassTesting = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/repair/test-pass/${data?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      queryClient.invalidateQueries({ queryKey: ["repair-miner"] });
      toast.success("Success");
      navigate("/repair");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useFailTesting = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/repair/test-fail/${data?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repair-miners"] });
      queryClient.invalidateQueries({ queryKey: ["repair-miner"] });
      toast.success("Success");
      navigate("/repair");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
