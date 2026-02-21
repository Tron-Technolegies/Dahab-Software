import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useGetDataQuery = ({
  search,
  farm,
  currentPage,
  limit,
  sortData,
}) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["data", search, farm, currentPage, limit, sortData],
    queryFn: async () => {
      const { data } = await api.get(`/admin/data/getData`, {
        params: { search, farm, currentPage, limit, sortby: sortData },
      });
      return data;
    },
  });
  return { isError, isLoading, data, error };
};

export const useAddDataMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post(`/admin/data/addData`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("Success");
      navigate("/data");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useDeleteData = () => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/admin/data/deleteData/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
      toast.success("Deleted");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useGetSingleData = ({ id }) => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["single-data", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/data/getData/${id}`);
      return data.data;
    },
  });
  return { isError, isPending, data, error };
};

export const useRestrictedEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/data/updateRestricted/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
      queryClient.invalidateQueries({ queryKey: ["single-data"] });
      toast.success("Edited");
      navigate("/data");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};

export const useEditData = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/admin/data/updateData/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
      queryClient.invalidateQueries({ queryKey: ["single-data"] });
      toast.success("Edited");
      navigate("/data");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
