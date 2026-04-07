import React from "react";
import { FaUser } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { LuCpu } from "react-icons/lu";
import { BiMessageDetail } from "react-icons/bi";

export default function IssueCard({ issue }) {
  return (
    <div className="bg-[#F9F9F9] border border-[#E6E6E6] rounded-2xl px-7 py-7 flex flex-col gap-2 shadow-sm">
      <p className="font-bold text-sm">ID: XXX-{issue._id.slice(15)}</p>
      {/* Top: title + status */}
      <div className="flex md:flex-row flex-col-reverse gap-2 md:gap-0 justify-between items-start">
        <div className="flex flex-col gap-2 w-full">
          {issue.type === "repair" ? (
            <h3 className=" font-semibold text-black">{issue.issueType}</h3>
          ) : (
            <p className="font-semibold text-blue-700">
              Request for Pool Change
            </p>
          )}
          {/* Description */}
          <p className="text-gray-600 text-sm -mt-2">{issue.description}</p>
        </div>

        <p className="text-xs flex flex-col items-end w-full gap-2 text-gray-500">
          <div className="flex gap-3 items-center">
            <p
              className={` text-xs w-fit self-end  ${
                issue.status === "Resolved"
                  ? "bg-green-600"
                  : issue.status === "Warranty"
                    ? "bg-blue-600"
                    : "bg-[#F2D56A]"
              } text-black font-medium px-3 py-1 rounded-full`}
            >
              {issue.status}
            </p>
            <MdHistory
              size={24}
              className="cursor-pointer"
              //   onClick={() => setOpenStatusHistory(true)}
            />
          </div>
          Last update: {new Date(issue.updatedAt).toLocaleString()}
        </p>
      </div>
      <p className="font-semibold">
        {issue.minerModel} (SI No: {issue.miner?.serialNumber})
      </p>

      {/* Client + Created + Serial */}
      <div className="flex md:flex-row flex-col justify-between md:items-center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <FaUser className="text-gray-500" />
            <span className="font-medium">{issue.username}</span>
            <span className="text-gray-400 text-xs">
              {issue.user?.clientId}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CiClock2 className="text-gray-500 text-lg" />
            Created {new Date(issue.createdAt).toLocaleString()} by{" "}
            {issue?.statusHistory[0]?.changedBy}
          </div>
          {issue.resolvedOn && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CiClock2 className="text-gray-500 text-lg" />
              Resolved {new Date(issue.resolvedOn).toLocaleString()}
            </div>
          )}
        </div>

        {issue.type === "change" && (
          <div className=" flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm text-gray-500">
              Current Worker ID:
              <span className="text-blue-700 font-semibold">
                {issue.workerAddress}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm text-gray-500">
              Requested Worker ID:
              <span className="text-blue-700 font-semibold">
                {issue.changeRequest?.worker}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm text-gray-500">
              Requested Pool Address:
              <span className="text-blue-700 font-semibold">
                {issue.changeRequest?.pool}
              </span>
            </div>
          </div>
        )}

        {issue.type === "repair" && (
          <div className="flex items-center gap-2 mt-3 sm:mt-0 text-sm font-medium text-black">
            <LuCpu className="text-xl" />
            <span>{issue.workerAddress}</span>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        {/* Left controls */}
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-3 w-full">
          <div className="flex md:flex-row flex-col gap-3 md:items-center">
            <button
              //   onClick={onRespond}
              className="px-4 py-1.5 text-sm rounded-lg cursor-pointer border border-gray-300 text-gray-700"
            >
              Send Response
            </button>
            <div className="flex items-center gap-2">
              <select
                // value={status}
                // onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700"
              >
                <option value="Pending">Pending</option>
                <option value="Warranty">Warranty</option>
                <option value="Repair Center">Repair Center</option>
                <option value="Resolved">Resolved</option>
              </select>

              <button
                // onClick={handleSave}
                className="px-4 py-1.5 text-sm cursor-pointer rounded-lg bg-blue-600 text-white"
              >
                {/* {saving ? "Saving..." : "Save"} */}
                Save
              </button>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex md:flex-row flex-col md:items-center  gap-4">
            {/* Chat History */}
            <button
              //   onClick={() => onChatOpen(issue._id)}
              className="bg-gray-200 cursor-pointer w-full md:w-fit px-4 py-2 rounded-full flex items-center gap-1 text-gray-700 justify-center"
            >
              <BiMessageDetail />
              Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
