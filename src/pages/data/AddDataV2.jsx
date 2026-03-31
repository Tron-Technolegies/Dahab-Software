import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetClientDropdown } from "../../hooks/client/useClient";
import { useGetAllMinerDropdowns } from "../../hooks/minermodels/useMinerModels";
import { useGetFarmDropdown } from "../../hooks/miningfarm/useMiningFarm";
import { useAddDataV2Mutation } from "../../hooks/data/useData";

export default function AddDataV2() {
  const [warranty, setWarranty] = useState(false);
  const { isLoading: clientLoading, data: clientData } = useGetClientDropdown();
  const { isLoading: minerLoading, data: modelsData } =
    useGetAllMinerDropdowns();
  const { isLoading: farmLoading, data: farmData } = useGetFarmDropdown();
  const { isPending, mutateAsync } = useAddDataV2Mutation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Add Data</h1>
        <Link
          to={"/data"}
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Go Back
        </Link>
      </div>
      <form
        className="my-5 flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const formdata = new FormData(e.target);
          const data = Object.fromEntries(formdata);
          await mutateAsync(data);
        }}
      >
        <label className="text-xs font-medium">Client</label>
        <select
          className="p-2 outline-none bg-neutral-100 rounded-md"
          required
          name="client"
        >
          <option value={""}>Select Client</option>
          {!clientLoading &&
            clientData.map((item) => (
              <option key={item._id} value={item._id}>
                {item.clientName}
              </option>
            ))}
        </select>
        <label className="text-xs font-medium">Miner Model</label>
        <select
          className="p-2 outline-none bg-neutral-100 rounded-md"
          required
          name="model"
        >
          <option value={""}>Select Miner</option>
          {!minerLoading &&
            modelsData.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >{`${item.manufacturer} ${item.name} (${item.hashRate}TH)`}</option>
            ))}
        </select>
        <label className="text-xs font-medium">Worker Id</label>
        <input
          required
          name="workerId"
          type="text"
          className="p-2 outline-none bg-neutral-100 rounded-md"
        />
        <label className="text-xs font-medium">Serial Number</label>
        <input
          required
          name="serialNumber"
          type="text"
          className="p-2 outline-none bg-neutral-100 rounded-md"
        />
        <label className="text-xs font-medium">Mac Address</label>
        <input
          required
          name="macAddress"
          type="text"
          className="p-2 outline-none bg-neutral-100 rounded-md"
        />
        <label className="text-xs font-medium">Pool Address</label>
        <input
          type="text"
          required
          name="poolAddress"
          className="p-2 outline-none bg-neutral-100 rounded-md"
        />
        <label className="text-xs font-medium">Connection Date</label>
        <input
          name="connectionDate"
          type="date"
          className="p-2 outline-none bg-neutral-100 rounded-md"
        />
        <label className="text-xs font-medium">Location</label>
        <select
          required
          name="location"
          className="p-2 outline-none bg-neutral-100 rounded-md"
        >
          <option>Choose Location</option>
          {!farmLoading &&
            farmData.map((item) => (
              <option key={item._id} value={item._id}>
                {item.farm}
              </option>
            ))}
        </select>
        <label className="text-xs font-medium">Status</label>
        <select
          required
          name="status"
          className="p-2 outline-none bg-neutral-100 rounded-md"
        >
          <option value={"online"}>online</option>
          <option value={"offline"}>offline</option>
        </select>
        <div className="flex gap-2 items-center">
          <label>Have Warranty?</label>
          <input
            type="checkbox"
            checked={warranty}
            onChange={(e) => setWarranty(e.target.checked)}
            className="p-2 mt-1 outline-none bg-neutral-100 rounded-md"
          />
        </div>
        {warranty && (
          <>
            <label className="text-xs font-medium">Warranty Start Date</label>
            <input
              name="warrantyStart"
              type="date"
              className="p-2 outline-none bg-neutral-100 rounded-md"
            />
            <label className="text-xs font-medium">Warranty End Date</label>
            <input
              name="warrantyEnd"
              type="date"
              className="p-2 outline-none bg-neutral-100 rounded-md"
            />
          </>
        )}
        <button
          disabled={isPending}
          className="px-5 py-2 text-white bg-homeBg hover:bg-homeBgGradient self-end"
        >
          {isPending ? "Adding.." : "Add Data"}
        </button>
      </form>
    </div>
  );
}
