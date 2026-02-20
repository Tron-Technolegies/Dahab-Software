import React, { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { api } from "../../services/api";

const useBulkUpload = () => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) {
      toast.error("No File Attatched");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      try {
        setLoading(true);
        const res = await api.post(`/admin/data/bulkData`, jsonData, {
          withCredentials: true,
        });
        console.log(res.data);
        toast.success("successfully uploaded");
      } catch (err) {
        console.log(err);
        toast.error(
          err?.response?.data?.msg || err?.error || "something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
    // try {
    // } catch (error) {}
  };

  return { handleFileUpload, loading };
};

export default useBulkUpload;
