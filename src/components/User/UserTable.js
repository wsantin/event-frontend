import React from "react";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import {
  userTableData,
  userTableColumns,
} from "../../shared/UserTableData";
import EnhancedTable from "../UI/EnhancedTable";

function UserTable(props) {
  const columns = userTableData;
  const data = userTableColumns;
  return (
    <Box sx={{ width: "100%", height: "400px" }}>
      <CssBaseline />
      <EnhancedTable columns={columns} data={data} />
    </Box>
  );
}

export default UserTable;
