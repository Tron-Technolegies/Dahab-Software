import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";

const useDownloadCSV = () => {
  const [loading, setLoading] = useState(false);
  const downloadCSV = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/data/download-csv`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading CSV:", error);
      toast.error("Error downloading CSV");
    } finally {
      setLoading(false);
    }
  };

  return { loading, downloadCSV };
};

export default useDownloadCSV;
