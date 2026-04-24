import React, { useState } from "react";
import { useGetAllMiningFarms } from "../../hooks/miningfarm/useMiningFarm";
import Loading from "../../components/Loading";
import AllFarmPreview from "../../components/miningfarm/AllFarmPreview";
import AddFarmModal from "../../components/miningfarm/AddFarmModal";
import {
  RiContractFill,
  RiDeleteBin2Fill,
  RiInformationLine,
} from "react-icons/ri";
import {
  FaCalendar,
  FaLocationDot,
  FaMicrochip,
  FaRegClock,
} from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { GrAnnounce, GrStatusGood } from "react-icons/gr";
import { BiSolidCategory } from "react-icons/bi";
import { IoCloudOfflineSharp } from "react-icons/io5";
import { ImPower, ImPowerCord } from "react-icons/im";
import EditFarmModel from "../../components/miningfarm/EditFarmModel";
import DeleteFarmModal from "../../components/miningfarm/DeleteFarmModal";
import { AddAnnouncementModal } from "../../components/miningfarm/AddAnnouncementModal";
import DowntimeHistoryModal from "../../components/miningfarm/DowntimeHistoryModal";
import FarmStatusPopup from "../../components/miningfarm/FarmStatusPopup";
import MinerDetailsPopup from "../../components/miningfarm/MinerDetailsPopup";

function getStatusColor(status) {
  if (status === "Active") {
    return "bg-green-200 text-green-600";
  } else if (status === "Offline") {
    return "bg-red-200 text-red-600";
  } else if (status === "Planned") {
    return "bg-yellow-200 text-yellow-600";
  } else {
    return "bg-blue-200 text-blue-600";
  }
}

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
          <AddFarmModal open={openAdd} handleClose={() => setOpenAdd(false)} />
          <EditFarmModel
            open={openEdit}
            handleClose={() => setOpenEdit(false)}
            farm={selected}
          />
          <div className="flex flex-col gap-3 mt-3">
            <p className="text-lg font-semibold">All Farms</p>
            {data.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setSelected(item);
                  setExpanded(!expanded);
                }}
                className="p-3 rounded-md bg-[#F5F5F5] shadow-md cursor-pointer"
              >
                <div className="flex justify-between item-center">
                  <p className="font-semibold text-lg">{item.farm}</p>
                  <p
                    className={`text-xs p-2 rounded-md ${getStatusColor(item.farmStatus)}`}
                  >
                    {item.farmStatus}
                  </p>
                </div>
                <p className="italic font-sans font-semibold">{`${item.current / 1000}/${item.capacity / 1000} KW`}</p>
                {expanded && selected._id === item._id && (
                  <div className="p-2 mt-3 duration-300 ease-in-out transition-all">
                    {item.farmInfo && (
                      <p className="my-2 text-gray-600 text-sm flex gap-2 items-center">
                        <RiInformationLine />
                        {item.farmInfo}
                      </p>
                    )}
                    <div className="border-t border-b border-gray-300 py-2 flex justify-between">
                      <div className=" text-gray-600 text-sm flex flex-col gap-2">
                        <p className="flex gap-2 items-center">
                          <FaLocationDot />
                          {item.country}
                        </p>
                        <p className="flex gap-2 items-center">
                          <RiContractFill />
                          {item.contractType}
                        </p>
                        <p className="flex gap-2 items-center">
                          <BiSolidCategory />
                          {item.farmType}
                        </p>
                        <p className="flex gap-2 items-center">
                          <FaCalendar />
                          Commission Date:{" "}
                          {new Date(item.dayOfCommissioning).toLocaleString()}
                        </p>
                        <p className="flex gap-2 items-center">
                          <FaRegClock />
                          Contract Expiry:{" "}
                          {new Date(item.contractDuration).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2 h-fit">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMiners(true);
                          }}
                          className="bg-blue-500 text-white flex justify-center items-center gap-1 hover:bg-blue-700"
                        >
                          <FaMicrochip />
                          Miners
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDowntimes(true);
                          }}
                          className="bg-blue-500 text-white flex justify-center items-center gap-1 hover:bg-blue-700"
                        >
                          <IoCloudOfflineSharp />
                          Downtimes
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-5 place-items-center-safe pb-2 border-b border-gray-300">
                      <div className="flex gap-2 items-center w-full justify-center">
                        <ImPower size={28} />
                        <p className="flex flex-col">
                          <span className="font-bold">
                            {item.capacity / 1000} KW
                          </span>
                          <span className="text-xs">capacity</span>
                        </p>
                      </div>
                      <div className="flex gap-2 items-center w-full justify-center">
                        <ImPowerCord size={28} />
                        <p className="flex flex-col">
                          <span className="font-bold">
                            {item.current / 1000} KW
                          </span>
                          <span className="text-xs">current</span>
                        </p>
                      </div>
                      <div className="flex gap-2 items-center w-full justify-center">
                        <FaMicrochip size={28} />
                        <p className="flex flex-col">
                          <span className="font-bold">
                            {item.miners?.length}
                          </span>
                          <span className="text-xs">Total Miners</span>
                        </p>
                      </div>
                      <div className="flex gap-2 items-center w-full justify-center">
                        <TfiLayoutGrid3 size={28} />
                        <p className="flex flex-col">
                          <span className="font-bold">
                            {item.occupiedSlots}/{item.totalSlots}
                          </span>
                          <span className="text-xs">Slots</span>
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-4 grid-cols-2 justify-between gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenEdit(true);
                        }}
                        className="w-full text-white bg-gray-400 hover:bg-gray-600 flex justify-center items-center gap-2"
                      >
                        <FaRegEdit />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenAnnouncement(true);
                        }}
                        className="w-full text-white bg-blue-500 hover:bg-blue-700 flex justify-center items-center gap-2"
                      >
                        <GrAnnounce />
                        Announcement
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFarmStatus(true);
                        }}
                        className="w-full text-white bg-neutral-500 hover:bg-neutral-700 flex justify-center items-center gap-2"
                      >
                        <GrStatusGood />
                        Farm Status
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDelete(true);
                        }}
                        className="w-full text-white bg-red-600 hover:bg-red-800 flex justify-center items-center gap-2"
                      >
                        <RiDeleteBin2Fill />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <DeleteFarmModal
            open={openDelete}
            handleClose={() => setOpenDelete(false)}
            farm={selected}
          />
          <AddAnnouncementModal
            open={openAnnouncement}
            handleClose={() => setOpenAnnouncement(false)}
            farm={selected}
          />
          <DowntimeHistoryModal
            open={openDowntimes}
            handleClose={() => setOpenDowntimes(false)}
            farm={selected}
          />
          <FarmStatusPopup
            open={farmStatus}
            handleClose={() => setFarmStatus(false)}
            farm={selected}
          />
          <MinerDetailsPopup
            open={openMiners}
            handleClose={() => setOpenMiners(false)}
            farm={selected}
          />
        </>
      )}
    </div>
  );
}
