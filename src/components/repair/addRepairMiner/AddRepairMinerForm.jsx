import React, { useEffect, useState } from "react";
import {
  useAddRepairMiner,
  useGetRelatedMiner,
} from "../../../hooks/repair/useRepair";
import FormInput from "../../FormInput";
import Loading from "../../Loading";

export default function AddRepairMinerForm() {
  const [debounced, setDebounced] = useState("");
  const { data: miner } = useGetRelatedMiner({ serialNumber: debounced });
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [owner, setOwner] = useState("");
  const [nowRunning, setNowRunning] = useState("");
  const { isPending: loading, mutateAsync: addMiner } = useAddRepairMiner();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(serialNumber);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [serialNumber]);

  useEffect(() => {
    if (miner) {
      setMacAddress(miner.macAddress);
      setWorkerId(miner.workerId);
      setOwner(miner.clientName);
      setNowRunning(miner.temporaryOwner);
    }
  }, [miner]);
  return (
    <div className="my-10">
      <FormInput
        type={"text"}
        placeholder={"Enter serial Number"}
        admin
        value={serialNumber}
        onchange={(e) => setSerialNumber(e.target.value)}
        title={"Serial Number"}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter Mac Address"}
        admin
        title={"Mac Address"}
        value={macAddress}
        onchange={(e) => setMacAddress(e.target.value)}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter WorkerId"}
        admin
        title={"Worker ID"}
        value={workerId}
        onchange={(e) => setWorkerId(e.target.value)}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter Owner Name"}
        admin
        title={"Owner"}
        value={owner}
        onchange={(e) => setOwner(e.target.value)}
      />
      <FormInput
        type={"text"}
        placeholder={"Enter Now Running For"}
        admin
        title={"Now Running For"}
        value={nowRunning}
        onchange={(e) => setNowRunning(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
          disabled={loading}
          onClick={async () => {
            const data = {
              serialNumber,
              macAddress,
              workerId,
              owner,
              nowRunning,
            };
            await addMiner(data);
          }}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
