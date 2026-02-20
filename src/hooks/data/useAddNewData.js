import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useAddNewData = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addNewData = async ({
    clientName,
    serialNumber,
    modelName,
    macAddress,
    actualLocation,
    currentLocation,
    workerId,
    temporary,
  }) => {
    setLoading(true);
    try {
      const res = await api.post(`/admin/data/addData`, {
        clientName,
        serialNumber,
        modelName,
        macAddress,
        actualLocation,
        currentLocation,
        workerId,
        temporary,
      });
      const data = res.data;
      if (data.msg === "success") {
        toast.success("Data Added Successfully");
        navigate("/data");
      }
    } catch (err) {
      console.log(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
      toast.error(
        err?.response?.data?.msg || err?.error || "something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, addNewData };
};

export default useAddNewData;
