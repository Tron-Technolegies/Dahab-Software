import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import Loading from "../../Loading";
import FormInput from "../../FormInput";
import FormSelect from "../../FormSelect";
import {
  useEditData,
  useGetSingleData,
  useRestrictedEdit,
} from "../../../hooks/data/useData";

const locations = [
  "LIWA 1",
  "LIWA 2",
  "LIWA 3",
  "LIWA 4",
  "BADA ZAYED 1",
  "MBZ 1",
  "BAHYA 1",
  "BAHYA 2",
  "AL FALAH 1",
  "SWEIHAN 1",
  "AL AIN 1",
  "SHAMKHA 1",
  "ADLA 1",
  "SHAKABOUT 1",
  "BAHYA STORAGE",
  "MUSSAFAH OFFICE",
  "LIWA OFFICE",
  "WARRANTY CENTRE",
  "REPAIR CENTRE",
  "MBZ HYDRO 1",
  "ALAIN HYDRO 1",
  "ALAIN HYDRO 2",
];

export default function EditDataForm() {
  const { id } = useParams();
  const { isError, isPending, error, data } = useGetSingleData({ id });
  const [clientName, setClientName] = useState("");
  const [modelName, setModelName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [actualLocation, setActualLocation] = useState("LIWA 1");
  const [currentLocation, setCurrentLocation] = useState("LIWA 1");
  const [workerId, setWorkerId] = useState("");
  const [temporary, setTemporary] = useState("");
  const user = useOutletContext();
  const { isPending: restrictedLoading, mutateAsync: EditRestrictedData } =
    useRestrictedEdit();
  const { isPending: editLoading, mutateAsync: editData } = useEditData();

  useEffect(() => {
    if (data) {
      setClientName(data.clientName);
      setModelName(data.modelName);
      setSerialNumber(data.serialNumber);
      setMacAddress(data.macAddress);
      setTemporary(data.temporaryOwner ? data.temporaryOwner : "");
      setActualLocation(data.actualLocation);
      setCurrentLocation(data.currentLocation);
      setWorkerId(data.workerId);
    }
  }, [isPending, data]);

  const handleClick = async () => {
    if (user?.role === "superAdmin") {
      const data = {
        id,
        clientName,
        modelName,
        actualLocation,
        currentLocation,
        workerId,
        serialNumber,
        macAddress,
        temporary,
      };
      await editData(data);
    } else {
      const data = { id, currentLocation, temporary };
      await EditRestrictedData(data);
    }
  };
  return isPending ? (
    <Loading />
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div className="my-10">
      <FormInput
        title={"Client Name"}
        admin
        value={clientName}
        onchange={(e) => setClientName(e.target.value)}
        type={"text"}
        placeholder={"Enter client Name"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Model Name"}
        admin
        value={modelName}
        onchange={(e) => setModelName(e.target.value)}
        type={"text"}
        placeholder={"Enter Model Name"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Serial Number"}
        admin
        value={serialNumber}
        onchange={(e) => setSerialNumber(e.target.value)}
        type={"text"}
        placeholder={"Enter Serial No"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Worker ID"}
        admin
        type={"text"}
        value={workerId}
        onchange={(e) => setWorkerId(e.target.value)}
        placeholder={"Enter Worker ID"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Mac Address"}
        admin
        value={macAddress}
        onchange={(e) => setMacAddress(e.target.value)}
        type={"text"}
        placeholder={"Enter Mac Address"}
        disabled={user?.role === "admin" ? true : false}
      />

      {/* <FormInput
        title={"Actual Location"}
        admin
        value={actualLocation}
        onchange={(e) => setActualLocation(e.target.value)}
        type={"text"}
        placeholder={"Enter Actual Location"}
        disabled={user?.role === "admin" ? true : false}
      />
      <FormInput
        title={"Current Location"}
        admin
        value={currentLocation}
        onchange={(e) => setCurrentLocation(e.target.value)}
        type={"text"}
        placeholder={"Enter Current Location"}
      /> */}
      <FormSelect
        title={"Actual Location"}
        list={locations}
        value={actualLocation}
        onchange={(e) => setActualLocation(e.target.value)}
        issue
      />
      <FormSelect
        title={"Current Location"}
        list={locations}
        value={currentLocation}
        onchange={(e) => setCurrentLocation(e.target.value)}
        issue
      />

      <FormInput
        title={"Now Running"}
        admin
        type={"text"}
        value={temporary}
        onchange={(e) => setTemporary(e.target.value)}
        placeholder={"Enter now running"}
      />
      <div className="flex justify-end">
        <button
          disabled={restrictedLoading || editLoading}
          onClick={handleClick}
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          {restrictedLoading || editLoading ? "saving..." : "save"}
        </button>
      </div>
    </div>
  );
}
