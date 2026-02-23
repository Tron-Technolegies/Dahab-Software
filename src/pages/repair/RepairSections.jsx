import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetAvailableParts,
  useGetSingleMiner,
} from "../../hooks/repair/useRepair";
import HistoryElement from "../../components/repair/repairSections/HistoryElement";
import SectionHeadings from "../../components/repair/repairSections/SectionHeadings";
import Section1Content from "../../components/repair/repairSections/Section1Content";
import Section2Content from "../../components/repair/repairSections/Section2Content";
import Section3Content from "../../components/repair/repairSections/Section3Content";
import useGetAvailableQuantity from "../../hooks/repair/useGetAvailableQuantity";

export default function RepairSections() {
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(true);
  const [active3, setActive3] = useState(true);
  const { id } = useParams();
  const { isLoading: loading, data: miner } = useGetSingleMiner({ id });
  const { isLoading: componentLoading, data: components } =
    useGetAvailableParts();
  const { refetch: partRefetch, qty } = useGetAvailableQuantity();

  return (
    <div>
      <div className="my-5 flex justify-end">
        <Link
          to={"/repair"}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
        >
          Go Back
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {miner?.failHistory && (
          <h2 className="text-2xl font-semibold">History</h2>
        )}
        {miner?.failHistory &&
          miner?.report.map((x) => (
            <HistoryElement key={x._id} report={x} miner={miner} />
          ))}

        <SectionHeadings
          name={"Section 1"}
          active={active1}
          setActive={setActive1}
        />
        <Section1Content
          miner={miner}
          loading={loading}
          componentLoading={componentLoading}
          components={components}
          refetch={partRefetch}
          partQty={qty}
        />
        <SectionHeadings
          name={"Section 2"}
          active={active2}
          setActive={setActive2}
        />
        {(miner?.status === "Need Repair" ||
          miner?.status === "Need Testing" ||
          miner?.status === "Ready To Connect") && (
          <Section2Content
            miner={miner}
            components={components}
            refetch={partRefetch}
            qty={qty}
          />
        )}
        <SectionHeadings
          name={"Section 3"}
          active={active3}
          setActive={setActive3}
        />
        {(miner?.status === "Need Testing" ||
          miner?.status === "Ready To Connect") && (
          <Section3Content miner={miner} />
        )}
      </div>
    </div>
  );
}
