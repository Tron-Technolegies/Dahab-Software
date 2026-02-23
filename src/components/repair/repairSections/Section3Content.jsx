import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useUploadLogImage from "../../../hooks/repair/useUploadLogImage";
import {
  useFailTesting,
  usePassTesting,
} from "../../../hooks/repair/useRepair";
import ProductImageUpload from "../../ProductImageUpload";
import Loading from "../../Loading";
import FormSelect from "../../FormSelect";
import { repairTechnicians } from "../../../utils/repairdata";
import FormInput from "../../FormInput";

const options = ["To Be Tested", "Test Passed", "Test Failed"];

export default function Section3Content({ miner }) {
  const [testStatus, setTestStatus] = useState("To Be Tested");
  const [logImageUrl, setLogImageUrl] = useState("");
  const [logImagePublicId, setLogImagePublicId] = useState("");
  const [testTechnician, setTestTechnician] = useState("Mehraj");
  const [remarks, setRemarks] = useState("");
  const user = useOutletContext();

  const { loading, uploadImage, imageDetails } = useUploadLogImage();
  const { isPending: passLoading, mutateAsync: passTesting } = usePassTesting();
  const { isPending: failLoading, mutateAsync: failTesting } = useFailTesting();

  async function handleUpdate() {
    if (testStatus === "To Be Tested") {
      return;
    } else if (testStatus === "Test Passed") {
      const data = {
        id: miner?._id,
        logImagePublicId,
        logImageUrl,
        remarks,
        testTechnician,
      };
      await passTesting(data);
    } else {
      const data = {
        id: miner?._id,
        logImagePublicId,
        logImageUrl,
        remarks,
        testTechnician,
      };
      await failTesting(data);
    }
  }

  useEffect(() => {
    if (miner && miner.testStatus) {
      setTestStatus(miner.testStatus);
    }
    if (miner && miner.successImgUrl) {
      setLogImageUrl(miner.successImgUrl);
    }
    if (miner && miner.remarks) {
      setRemarks(miner.remarks);
    }
    if (miner && miner.testTechnician) {
      setTestTechnician(miner.testTechnician);
    }
  }, [miner]);

  useEffect(() => {
    if (imageDetails) {
      setLogImageUrl(imageDetails.url);
      setLogImagePublicId(imageDetails.publicId);
    }
  }, [loading, imageDetails]);
  return (
    <div className="p-5 bg-white rounded-md">
      <h2 className="text-2xl mb-5 font-semibold">Testing Process</h2>
      <div className="flex flex-col gap-2 bg-gray-200 p-5 rounded-lg my-5">
        <label className="text-sm">Repair Status</label>
        <select
          value={testStatus}
          onChange={(e) => setTestStatus(e.target.value)}
          disabled={
            miner?.status === "Ready To Connect" && user?.role === "admin"
          }
          className="py-1 px-3 rounded-lg bg-transparent border border-[#0B578E] outline-none  text-black"
        >
          {options.map((item, index) => (
            <option
              key={index}
              className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
            >
              {item}
            </option>
          ))}
        </select>
        <div className="flex gap-3 items-center">
          <ProductImageUpload
            title={"Add Log"}
            changeFunction={(e) => uploadImage({ e })}
            disabled={
              miner?.status === "Ready To Connect" && user?.role === "admin"
            }
          />
          {logImageUrl !== "" &&
            (loading ? (
              <Loading />
            ) : (
              <img src={logImageUrl} className="w-40 object-cover" />
            ))}
        </div>
        {loading && <Loading />}
        <FormSelect
          title={"Technician"}
          list={repairTechnicians}
          disabled={
            miner?.status === "Ready To Connect" && user.role === "admin"
          }
          value={testTechnician}
          onchange={(e) => setTestTechnician(e.target.value)}
          issue
        />
        <FormInput
          type={"text"}
          title={"Remarks"}
          admin
          value={remarks}
          onchange={(e) => setRemarks(e.target.value)}
          disabled={
            miner?.status === "Ready To Connect" && user?.role === "admin"
          }
        />
        <button
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={
            loading ||
            (miner?.status === "Ready To Connect" && user?.role === "admin")
          }
          onClick={handleUpdate}
        >
          Update
        </button>
        {passLoading && <Loading />}
      </div>
    </div>
  );
}
