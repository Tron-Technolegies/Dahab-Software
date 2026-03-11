import React, { useState } from "react";
import { useGetAllMiningFarms } from "../../hooks/miningfarm/useMiningFarm";
import Loading from "../../components/Loading";
import AllFarmPreview from "../../components/miningfarm/AllFarmPreview";

export default function MiningFarms() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDowntimes, setOpenDowntimes] = useState(false);
  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [openMiners, setOpenMiners] = useState(false);
  const [farmStatus, setFarmStatus] = useState(false);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { isError, isLoading, error, data } = useGetAllMiningFarms();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex md:flex-row flex-col gap-5 justify-between md:items-center pb-3 border-b border-gray-200">
        <div>
          <h2 className="md:text-2xl font-medium text-lg my-2">Mining Farms</h2>
          <p>Manage all mining farm locations and power capacity</p>
        </div>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-homeBg hover:bg-homeBgGradient text-white"
        >
          + Add Farm
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          <AllFarmPreview farms={data} />
        </>
      )}
    </div>
  );
}
