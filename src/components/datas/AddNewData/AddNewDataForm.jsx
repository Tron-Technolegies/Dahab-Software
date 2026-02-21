import React, { useState } from "react";
import FormInput from "../../FormInput";
import FormSelect from "../../FormSelect";
import { useAddDataMutation } from "../../../hooks/data/useData";

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

export default function AddNewDataForm() {
  const [clientName, setClientName] = useState("");
  const [modelName, setModelName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [actualLocation, setActualLocation] = useState("LIWA 1");
  const [currentLocation, setCurrentLocation] = useState("LIWA 1");
  const [temporary, setTemporary] = useState("");
  const [workerId, setWorkerId] = useState("");

  const { isPending, mutateAsync } = useAddDataMutation();
  return (
    <div className="my-10">
      <FormInput
        title={"Client Name"}
        admin
        type={"text"}
        value={clientName}
        onchange={(e) => setClientName(e.target.value)}
        placeholder={"Enter client Name"}
      />
      <FormInput
        title={"Model Name"}
        admin
        type={"text"}
        value={modelName}
        onchange={(e) => setModelName(e.target.value)}
        placeholder={"Enter Model Name"}
      />
      <FormInput
        title={"Serial Number"}
        admin
        type={"text"}
        value={serialNumber}
        onchange={(e) => setSerialNumber(e.target.value)}
        placeholder={"Enter Serial No"}
      />
      <FormInput
        title={"Worker ID"}
        admin
        type={"text"}
        value={workerId}
        onchange={(e) => setWorkerId(e.target.value)}
        placeholder={"Enter Worker ID"}
      />
      <FormInput
        title={"Mac Address"}
        admin
        type={"text"}
        value={macAddress}
        onchange={(e) => setMacAddress(e.target.value)}
        placeholder={"Enter Mac Address"}
      />

      {/* <FormInput
        title={"Actual Location"}
        admin
        type={"text"}
        value={actualLocation}
        onchange={(e) => setActualLocation(e.target.value)}
        placeholder={"Enter Actual location"}
      />
      <FormInput
        title={"Current Location"}
        admin
        type={"text"}
        value={currentLocation}
        onchange={(e) => setCurrentLocation(e.target.value)}
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
        placeholder={"Enter now running status"}
      />
      <div className="flex justify-end">
        <button
          disabled={isPending}
          onClick={async () => {
            const data = {
              clientName,
              macAddress,
              actualLocation,
              currentLocation,
              workerId,
              serialNumber,
              modelName,
              temporary,
            };
            await mutateAsync(data);
          }}
          className="bg-homeBg p-2 px-4 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          {isPending ? "saving...." : "save"}
        </button>
      </div>
    </div>
  );
}
