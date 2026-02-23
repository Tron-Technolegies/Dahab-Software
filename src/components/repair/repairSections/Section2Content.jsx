import React from "react";
import Section2RepairElt from "./Section2RepairElt";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { useUpdateRepairProcess } from "../../../hooks/repair/useRepair";
import Loading from "../../Loading";

export default function Section2Content({ miner, components, refetch, qty }) {
  const { isPending: loading, mutateAsync: updateProcess } =
    useUpdateRepairProcess();
  const user = useOutletContext();
  function handleUpdate() {
    const isFull = miner?.problems?.filter(
      (item) => item.issueStatus === "Repair Done",
    );
    if (isFull.length === miner?.problems?.length) {
      updateProcess(miner?._id);
    } else {
      toast.warn("Cannot update untill all miners are done repairing");
    }
  }
  return (
    <div className="p-5 bg-white rounded-md">
      <h2 className="text-2xl mb-5 font-semibold">Repair Process</h2>
      {miner?.problems?.length > 0 &&
        miner?.problems.map((x) => (
          <Section2RepairElt
            key={x._id}
            item={x}
            minerId={miner._id}
            minerStatus={miner.status}
            components={components}
            refetch={refetch}
            qty={qty}
          />
        ))}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-md text-white bg-homeBg hover:bg-homeBgGradient disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleUpdate}
          disabled={
            (miner?.status === "Need Testing" ||
              miner?.status === "Ready To Connect") &&
            user?.role === "admin"
          }
        >
          Update
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
}
