import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useSendMessage } from "../../hooks/messages/useAdminMessages";

const timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Dubai", // UAE timezone
};

export default function MessageBox({
  issueId,
  issue,
  createdAt,
  miner,
  clientName,
  description,
  messages,
  _id,
  serialNumber,
}) {
  const [showMessages, setShowMessages] = useState(false);
  const [showId, setShowId] = useState("");
  const { isPending, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  return (
    <div className="bg-white rounded-lg  p-5 flex flex-col gap-2">
      <div className="border-b pb-1">
        <p className="">
          Issue No:{" "}
          <span className="font-semibold text-homeBgGradient">{issueId}</span>
        </p>
        <p className="font-bold">INTERMINE</p>
      </div>
      <div className="flex justify-between">
        <p className="text-lg text-homeBgGradient">{issue}</p>
        <p>
          Reported on:{" "}
          <span className="text-sm italic">
            {createdAt.toString().slice(0, 10)}
          </span>
        </p>
      </div>
      <div className="flex gap-7 items-center">
        <p>
          Model: <span className="font-semibold">{miner}</span>
        </p>
        <p>
          SI No: <span className="font-semibold">{serialNumber}</span>
        </p>
      </div>

      <p className="pb-2 border-b">
        Client: <span className="font-semibold">{clientName}</span>
      </p>
      {description && <p className="italic">{`"${description}"`}</p>}
      <button
        className="mt-auto text-sm w-fit flex gap-2 items-center my-3"
        onClick={() => {
          setShowMessages(!showMessages);
          setShowId(_id);
        }}
      >
        <p> Messages</p> <FaAngleDown className="mt-1" />
      </button>
      {showMessages && showId === _id && (
        <>
          <div className="flex flex-col gap-2">
            {messages?.map((item) => (
              <div
                key={item._id}
                className="bg-gray-300 p-3 rounded-md flex flex-col gap-2"
              >
                <p className="italic">"{item.message}"</p>
                <p className="text-sm flex justify-between">
                  <span>{item.sendBy}</span>
                  <span className="italic">
                    {new Date(item.createdAt).toLocaleDateString(
                      "en-US",
                      timeOptions,
                    )}
                  </span>
                </p>
                {item.status && (
                  <p className="text-xs">status: {item.status}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center my-5">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="send a message"
              className="p-2 rounded-md bg-gray-200 w-full outline-none"
            />
            <button
              disabled={isPending}
              onClick={async () => {
                await sendMessage({
                  message,
                  issueGroup: _id,
                });
                setMessage("");
              }}
              className="bg-homeBg hover:bg-homeBgGradient text-white px-3 py-2 rounded-md"
            >
              {isPending ? "Sending" : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
