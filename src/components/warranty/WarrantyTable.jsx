import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllWarranties } from "../../hooks/warranty/useWarranty";
import Loading from "../Loading";
import PaginationComponent from "../PaginationComponent";

export default function WarrantyTable() {
  const [editItem, setEditItem] = useState(null);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("ALL");

  const { isLoading, isError, error, data } = useGetAllWarranties({
    currentPage,
    type,
    query: debounced,
  });
  const calcDaysRemaining = (endDate) => {
    const diff = dayjs(endDate).diff(dayjs(), "day");
    return diff + " days";
  };

  const getStatus = (endDate) => {
    const days = dayjs(endDate).diff(dayjs(), "day");
    if (days < 0) return "Expired";
    if (days <= 30) return "Expiring Soon";
    return "Active";
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 700);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div className="mt-5 bg-[#F5F5F5] lg:p-5 p-3 rounded-2xl shadow-sm max-w-[90vw]">
      {/* SEARCH BAR */}
      <div className="flex gap-3 items-center">
        <div className="flex w-full p-3 border border-[#DCDCDCDC] rounded-xl gap-2 bg-white text-[#787878]">
          <CiSearch className="w-5 h-5" />
          <input
            type="search"
            placeholder="Search warranties by Miner ID, Model or Owner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <select className="outline-none bg-white p-3 rounded-xl">
          <option value={"ALL"}>ALL</option>
          <option value={"Manufacturer"}>Manufacturer</option>
          <option value={"Dahab"}>Dahab</option>
        </select>
      </div>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Miner
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Client
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Start Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                End Date
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Days Remaining
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#eff6ff" }}>
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <p>{error.message}</p>
            ) : (
              data?.warranties?.map((item) => {
                return (
                  <TableRow
                    key={item._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.miner?.model}
                      <br />
                      <span className="text-xs text-gray-500">
                        SN: {item.miner?.serialNumber}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.user?.clientName}
                      <br />
                      <span className="text-xs text-gray-500">
                        {item.user?.clientId}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {item.warrantyType}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {dayjs(item.startDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {dayjs(item.endDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {calcDaysRemaining(item.endDate)}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          getStatus(item.endDate) === "Active"
                            ? "bg-green-600"
                            : getStatus(item.endDate) === "Expired"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                        }`}
                      >
                        {getStatus(item.endDate)}
                      </span>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      <div className="flex justify-center">
                        <FiEdit
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => setEditItem(item)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      {data?.totalPages > 1 && (
        <PaginationComponent
          page={currentPage}
          totalPage={data?.totalPages}
          pageChange={(e, v) => {
            setCurrentPage(v);
          }}
        />
      )}
      {/* UPDATE WARRANTY MODAL */}
      {/* {editItem && (
        <UpdateWarrantyModal
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )} */}
    </div>
  );
}
