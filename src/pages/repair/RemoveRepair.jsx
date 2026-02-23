import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetReadyToConnect,
  useRemoveMiner,
} from "../../hooks/repair/useRepair";
import useGenerateReport from "../../hooks/repair/useGenerateReport";
import Loading from "../../components/Loading";

export default function RemoveRepair() {
  const {
    isLoading: loading,
    data: miners,
    isError,
    error,
  } = useGetReadyToConnect();
  const { loading: downloadLoading, downloadReport } = useGenerateReport();
  const { isPending: removeLoading, mutateAsync: removeMiner } =
    useRemoveMiner();
  return loading ? (
    <Loading />
  ) : isError ? (
    <p>{error.message}</p>
  ) : (
    <div>
      <div className="my-5 flex justify-end">
        <Link
          to={"/repair"}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
        >
          Go Back
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                sx={{
                  width: "14.2%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Serial No
              </TableCell>
              <TableCell
                sx={{
                  width: "14.2%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Mac Address
              </TableCell>
              <TableCell
                sx={{
                  width: "14.2%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Worker ID
              </TableCell>
              <TableCell
                sx={{
                  width: "14.2%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Owner
              </TableCell>
              <TableCell
                sx={{
                  width: "14.2%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Now Running
              </TableCell>

              <TableCell
                sx={{
                  width: "14.2%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Report
              </TableCell>
              <TableCell
                sx={{
                  width: "14.2%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {miners?.map((x) => (
              <TableRow
                key={x._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "14.2%", textAlign: "center" }}
                >
                  {x.serialNumber}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "14.2%", textAlign: "center" }}
                >
                  {x.macAddress}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "14.2%", textAlign: "center" }}
                >
                  {x.workerId}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "14.2%", textAlign: "center" }}
                >
                  {x.owner}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "14.2%", textAlign: "center" }}
                >
                  {x.nowRunning}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "14.2%", textAlign: "center" }}
                >
                  <button
                    disabled={downloadLoading}
                    className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
                    onClick={() => downloadReport({ id: x._id })}
                  >
                    {downloadLoading ? "Downloading..." : "Download"}
                  </button>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "14.2%", textAlign: "center" }}
                >
                  <button
                    disabled={removeLoading}
                    className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
                    onClick={() => removeMiner(x._id)}
                  >
                    {removeLoading ? "Removing..." : "Remove"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
