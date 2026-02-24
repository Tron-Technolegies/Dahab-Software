import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({ totalPage, page, pageChange }) {
  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination
        count={totalPage}
        page={page}
        onChange={pageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "black", // default text color
            borderColor: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#1976d2 !important", // enforce bg color
            color: "white !important", // enforce text color
          },
        }}
      />
    </Stack>
  );
}
