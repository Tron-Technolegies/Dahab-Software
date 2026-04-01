import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetClientDropdown } from "../../hooks/client/useClient";
import { useGetAllMinerDropdowns } from "../../hooks/minermodels/useMinerModels";
import { useGetFarmDropdown } from "../../hooks/miningfarm/useMiningFarm";
import Loading from "../../components/Loading";
import { useEditDataV2, useGetSingleData } from "../../hooks/data/useData";

export default function EditDataV2() {
  const { id } = useParams();
  const {
    isError,
    isPending: dataLoading,
    error,
    data,
  } = useGetSingleData({ id });
  const [client, setClient] = useState("");
  const [model, setModel] = useState("");
  const [location, setLocation] = useState("");
  const { isLoading: clientLoading, data: clientData } = useGetClientDropdown();
  const { isLoading: minerLoading, data: modelsData } =
    useGetAllMinerDropdowns();
  const { isLoading: farmLoading, data: farmData } = useGetFarmDropdown();
  const { isPending, mutateAsync } = useEditDataV2();

  useEffect(() => {
    if (data) {
      setClient(data.client);
      setModel(data.modelId);
      setLocation(data.actualLocationId);
    }
  }, [data]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Edit Data</h1>
        <Link
          to={"/data"}
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Go Back
        </Link>
      </div>
      {dataLoading ? (
        <Loading />
      ) : (
        <form
          className="my-5 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const formdata = new FormData(e.target);
            const data = Object.fromEntries(formdata);
            data.id = id;
            await mutateAsync(data);
          }}
        >
          <label className="text-xs font-medium">Client</label>
          <select
            className="p-2 outline-none bg-neutral-100 rounded-md"
            required
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
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
            value={model}
            onChange={(e) => setModel(e.target.value)}
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
            defaultValue={data.workerId}
            type="text"
            className="p-2 outline-none bg-neutral-100 rounded-md"
          />
          <label className="text-xs font-medium">Serial Number</label>
          <input
            required
            name="serialNumber"
            defaultValue={data.serialNumber}
            type="text"
            className="p-2 outline-none bg-neutral-100 rounded-md"
          />
          <label className="text-xs font-medium">Mac Address</label>
          <input
            required
            name="macAddress"
            defaultValue={data.macAddress}
            type="text"
            className="p-2 outline-none bg-neutral-100 rounded-md"
          />
          <label className="text-xs font-medium">Pool Address</label>
          <input
            type="text"
            required
            defaultValue={data.pool}
            name="poolAddress"
            className="p-2 outline-none bg-neutral-100 rounded-md"
          />
          <label className="text-xs font-medium">Connection Date</label>
          <input
            name="connectionDate"
            type="date"
            defaultValue={data.connectionDate?.toString()?.slice(0, 10)}
            className="p-2 outline-none bg-neutral-100 rounded-md"
          />
          <label className="text-xs font-medium">Location</label>
          <select
            required
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            defaultValue={data.status}
            className="p-2 outline-none bg-neutral-100 rounded-md"
          >
            <option value={"online"}>online</option>
            <option value={"offline"}>offline</option>
          </select>

          <button
            disabled={isPending}
            className="px-5 py-2 text-white bg-homeBg hover:bg-homeBgGradient self-end"
          >
            {isPending ? "Updating.." : "Update Data"}
          </button>
        </form>
      )}
    </div>
  );
}
