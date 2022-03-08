import React from "react";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import EnhancedTable from "../UI/EnhancedTable";

function MessageTable({ data }) {
  const columns = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "date",
      accessor: "date",
    },
    {
      Header: "total",
      accessor: "totalRent",
    },
    {
      Header: "total",
      accessor: "totalValue",
    },
  ];
  return (
    <Box sx={{ width: "100%", height: "400px" }}>
      <CssBaseline />
      <EnhancedTable columns={columns} data={data} />
    </Box>
  );
}

export default MessageTable;
