import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleData } from "../../hooks/data/useData";
import Loading from "../../components/Loading";
import { BiChip } from "react-icons/bi";
import {
  FaBitcoin,
  FaBolt,
  FaMapMarkerAlt,
  FaTools,
  FaUser,
} from "react-icons/fa";
import { LuQrCode } from "react-icons/lu";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { diffInMonths, monthsFromNow } from "../../utils/monthCalculation";
import { MdHistory } from "react-icons/md";
import DataDeletePopup from "../../components/datas/DataDeletePopup";

const getStatusColor = (status) => {
  switch (status) {
    case "online":
      return "bg-green-500 text-white";
    case "Warning":
      return "bg-yellow-500 text-white";
    case "offline":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function DataSinglePage() {
  const { id } = useParams();
  const { isError, isPending, data, error } = useGetSingleData({ id });
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return isPending ? (
    <Loading />
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div>
      <div className="p-6 border-b border-[#DCDCDC] flex md:flex-row flex-col-reverse md:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            {data.manufacturer} {data.model}
          </h1>
          <p className="text-md text-gray-500">
            Manage all mining equipment and monitor performance
          </p>
        </div>

        <Link
          to={"/data"}
          className="bg-homeBg w-fit hover:bg-homeBgGradient text-white rounded-md px-4 py-1 transition-all"
        >
          Go Back
        </Link>
      </div>
      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          {/* Chip + titles */}
          <div className="flex items-center gap-3">
            <BiChip className="text-[#3893D0]" size={24} />
            <div>
              <h3 className="text-xl font-bold text-gray-900 break-all">
                SI No: {data.serialNumber}
              </h3>
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">{data.model}</p>
                <p className="text-sm text-gray-500">({data.workerId})</p>
              </div>
            </div>
          </div>

          <span
            className={`${getStatusColor(
              data.status,
            )} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}
          >
            {data.status === "online"
              ? "Online"
              : data.status === "offline"
                ? "Offline"
                : "In Transit"}
          </span>
        </div>

        <div className="space-y-2 text-[#777] mb-4">
          {/* Client */}
          <div className="flex items-center gap-2">
            <FaUser size={14} />
            <span>{data.clientName}</span>
          </div>

          {/* Farm */}
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={14} />
            <span>{data.actualLocation}</span>
          </div>
        </div>

        {/* ---------- METRICS BLOCK ---------- */}
        <div className="flex justify-between md:flex-row flex-col md:justify-start gap-5 md:gap-16 py-4 border-t border-b border-gray-100 mb-4">
          {/* Hashrate */}
          <div className="flex items-center gap-2">
            <BiChip size={20} />
            <div>
              <div className="text-lg font-semibold">{data.hashRate}</div>
              <div className="text-xs text-gray-500">Hash Rate</div>
            </div>
          </div>

          {/* Power */}
          <div className="flex items-center gap-2">
            <FaBolt size={20} />
            <div>
              <div className="text-lg font-semibold">{data.power} KW</div>
              <div className="text-xs text-gray-500">Power</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LuQrCode size={20} />
            <div>
              <div className="text-lg font-semibold">{data.pool}</div>
              <div className="text-xs text-gray-500">Pool Address</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaBitcoin size={20} />
            <div>
              <div className="text-lg font-semibold">{data.coins}</div>
              <div className="text-xs text-gray-500">Coins</div>
            </div>
          </div>
        </div>

        {/* ---------- WARRANTY & HISTORY ---------- */}
        <div className="flex md:flex-row flex-col justify-between gap-3 md:items-center">
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              <CiCalendarDate size={18} />
              <span>
                Purchased On:{" "}
                {data.connectionDate &&
                  new Date(data.connectionDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CiCalendar size={18} />
              {data.warrantyStartDate ? (
                <span>
                  Total Warranty:{" "}
                  {diffInMonths(data.warrantyStartDate, data.warrantyEndDate)}{" "}
                  months
                </span>
              ) : data.warranty ? (
                <span>Total Warranty: {data.warranty * 12} months</span>
              ) : (
                <span>Total Warranty: Not Available</span>
              )}
            </div>
            {data.warrantyEndDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <CiCalendar size={18} />

                <span>
                  Remaining Warranty: {monthsFromNow(data.warrantyEndDate)}{" "}
                  months
                </span>
              </div>
            )}
          </div>

          <button
            // onClick={() => {
            //   setShowHistory(true);
            // }}
            className="bg-[#3893D0] text-white px-4 py-2 rounded-lg flex justify-center items-center gap-1 cursor-pointer"
          >
            <MdHistory size={18} /> History
          </button>
        </div>

        {/* ---------- ACTION BUTTONS ---------- */}
        <div className="flex md:flex-row flex-col gap-3 mt-4">
          <Link
            to={`/data/${data._id}/editV2`}
            // onClick={() => handleEditClick(data)}
            className="text-center bg-[#787878] hover:bg-[#6c6969] w-full text-white rounded-lg py-2 font-medium cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => setOpenDelete(true)}
            className="bg-red-700 hover:bg-red-900 text-white w-full"
          >
            Delete
          </button>
          <button
            // onClick={() => setShowReport(true)}
            className="border w-full border-gray-400 text-gray-700 py-2 px-4 rounded-lg cursor-pointer"
          >
            Report Issue
          </button>
        </div>
      </div>
      <DataDeletePopup
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        item={data}
      />
    </div>
  );
}
