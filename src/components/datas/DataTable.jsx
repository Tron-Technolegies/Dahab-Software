import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { TiArrowUnsorted } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useState } from "react";
import DataDeletePopup from "./DataDeletePopup";

export default function DataTable({
  sortData,
  setSortData,
  data,
  limit,
  setLimit,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 3,
          marginBottom: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                onClick={() =>
                  sortData === "clientAZ"
                    ? setSortData("clientZA")
                    : setSortData("clientAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("client") && "#F0F0F0",
                }}
              >
                Client
                <span
                  className={`flex justify-center ${
                    sortData.includes("client") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "modelAZ"
                    ? setSortData("modelZA")
                    : setSortData("modelAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("model") && "#F0F0F0",
                }}
              >
                Model
                <span
                  className={`flex justify-center ${
                    sortData.includes("model") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "serialAZ"
                    ? setSortData("serialZA")
                    : setSortData("serialAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("serial") && "#F0F0F0",
                }}
              >
                Serial No
                <span
                  className={`flex justify-center ${
                    sortData.includes("serial") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "workerAZ"
                    ? setSortData("workerZA")
                    : setSortData("workerAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("worker") && "#F0F0F0",
                }}
              >
                Worker ID
                <span
                  className={`flex justify-center ${
                    sortData.includes("worker") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "macAZ"
                    ? setSortData("macZA")
                    : setSortData("macAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("mac") && "#F0F0F0",
                }}
              >
                Mac Id
                <span
                  className={`flex justify-center ${
                    sortData.includes("mac") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>

              <TableCell
                onClick={() =>
                  sortData === "actLocAZ"
                    ? setSortData("actLocZA")
                    : setSortData("actLocAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("actLoc") && "#F0F0F0",
                }}
              >
                Act. Location
                <span
                  className={`flex justify-center ${
                    sortData.includes("actLoc") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "currLocAZ"
                    ? setSortData("currLocZA")
                    : setSortData("currLocAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("currLoc") && "#F0F0F0",
                }}
              >
                Cur. Location
                <span
                  className={`flex justify-center ${
                    sortData.includes("currLoc") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "nowRunAZ"
                    ? setSortData("nowRunZA")
                    : setSortData("nowRunAZ")
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("nowRun") && "#F0F0F0",
                }}
              >
                Now Running
                <span
                  className={`flex justify-center ${
                    sortData.includes("nowRun") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#eff6ff" }}>
            {data?.datas?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.clientName}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "11.11%",
                    textAlign: "center",
                    maxWidth: "100px",
                  }}
                >
                  {row.model || row.modelName}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "11.11%",
                    textAlign: "center",
                    textWrap: "wrap",
                  }}
                >
                  {row.serialNumber}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "11.11%",
                    textAlign: "center",
                    textWrap: "wrap",
                  }}
                >
                  {row.workerId}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.macAddress}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.actualLocation}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.currentLocation}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.temporaryOwner || row.clientName}
                </TableCell>
                <TableCell sx={{ width: "11.11%", textAlign: "center" }}>
                  <div className="flex gap-3 justify-center items-center text-xl text-[#ABABAB]">
                    {row.version === "2" && (
                      <Link to={`/data/${row._id}`}>
                        <GrView />
                      </Link>
                    )}
                    <Link
                      to={
                        row.version === "2"
                          ? `/data/${row._id}/editV2`
                          : `/data/${row._id}/edit`
                      }
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      onClick={() => {
                        setDeleteItem(row);
                        setOpenDelete(true);
                      }}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p className="my-5 font-semibold text-lg">{`Total ${data?.totalDatas} items found`}</p>
      <div className=" bg-white w-fit rounded-md my-3">
        <select
          className="rounded-md p-2 bg-gray-100"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
          <option value={80}>80</option>
        </select>
      </div>
      <DataDeletePopup
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false);
          setDeleteItem(null);
        }}
        item={deleteItem}
      />
    </>
  );
}
