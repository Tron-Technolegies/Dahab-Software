import React, { useEffect, useState } from "react";
import IssueIdentificationElt from "./IssueIdentificationElt";
import { useOutletContext, useParams } from "react-router-dom";
import { useAddIssue } from "../../../hooks/repair/useRepair";
import Loading from "../../Loading";
import DetailElt from "../../DetailElt";

export default function Section1Content({
  miner,
  loading,
  componentLoading,
  components,
  refetch,
  partQty,
}) {
  const { id } = useParams();
  const { isPending: addLoading, mutateAsync: addIssue } = useAddIssue();
  const user = useOutletContext();
  const [issueDetail, setIssueDetail] = useState([
    {
      problem: "CHAIN: 0",
      component: "No Components needed",
      qty: 0,
      identifyTechnician: "Mehraj",
      issueRemark: "",
    },
  ]);

  function handleChange(index, field, value) {
    const newIssueDetail = [...issueDetail];
    newIssueDetail[index] = {
      ...newIssueDetail[index],
      [field]: value,
    };
    setIssueDetail(newIssueDetail);
  }

  function addNewForm() {
    setIssueDetail([
      ...issueDetail,
      {
        problem: "CHAIN: 0",
        component: "No Components needed",
        qty: 0,
        identifyTechnician: "Mehraj",
        issueRemark: "",
      },
    ]);
  }

  function removeForm(index) {
    const updated = issueDetail.filter((_, i) => i !== index);
    setIssueDetail(updated);
  }

  useEffect(() => {
    if (
      miner &&
      (miner.status === "Need Repair" ||
        miner.status === "Need Testing" ||
        miner.status === "Ready To Connect")
    ) {
      setIssueDetail(miner.problems);
    }
  }, [miner]);
  return (
    <div className="p-5 bg-white rounded-md">
      <h2 className="text-2xl mb-5 font-semibold">Issue Identification</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          <DetailElt title={"Serial No"} value={miner?.serialNumber} />
          <DetailElt title={"Mac Address"} value={miner?.macAddress} />
          <DetailElt title={"Worker ID"} value={miner?.workerId} />
          <DetailElt title={"Owner"} value={miner?.owner} />
          <DetailElt title={"Now Running"} value={miner?.nowRunning} />
        </div>
      )}

      {issueDetail.map((x, index) => (
        <IssueIdentificationElt
          key={index}
          issueDetail={x}
          index={index}
          handleChange={handleChange}
          miner={miner}
          handleRemove={removeForm}
          loading={componentLoading}
          components={components}
          refetch={refetch}
          qty={partQty}
        />
      ))}

      <div>
        <button
          className="px-4 py-2 bg-homeBg hover:bg-homeBgGradient rounded-md text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={
            (miner?.status === "Need Repair" ||
              miner?.status === "Need Testing" ||
              miner?.status === "Ready To Connect") &&
            user.role === "admin"
          }
          onClick={() => addNewForm()}
        >
          Add New Issue
        </button>
      </div>
      <div className="my-5 flex justify-end">
        <button
          className="px-4 py-2 bg-homeBg hover:bg-homeBgGradient rounded-md text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={() => addIssue({ id, issues: issueDetail })}
          disabled={
            (miner?.status === "Need Repair" ||
              miner?.status === "Need Testing" ||
              miner?.status === "Ready To Connect") &&
            user.role === "admin"
          }
        >
          Update
        </button>
      </div>
      {addLoading && <Loading />}
    </div>
  );
}
