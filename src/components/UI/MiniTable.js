import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

// import { configureGlobalFilter } from "../../redux/slices/globalFilterSlice";
import { Box } from "@mui/system";


function MiniTable({ columns, data, loading }) {

  const [ isLoading, setIsLoading ] = useState(false )

  const dealersTable = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 15 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    setPageSize,
  } = dealersTable;

  const { globalFilter, pageIndex, pageSize } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(loading)
  }, [loading]);

  return (
    <>
      {/*  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <TableContainer>
        <Table {...getTableProps()} size="small">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.id !== "selection" ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? "desc" : "asc"}
                        />
                      ) : null}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {
            isLoading ? <Box xs={{textAlign:'center'}}><CircularProgress/></Box> :
              <TableBody {...getTableBodyProps()}>
              {
                  page.map((row) => {
                    prepareRow(row);
                    return (
                      <TableRow {...row.getRowProps()} hover>
                        {row.cells.map((cell) => (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
              }
            </TableBody>
          }
          
        </Table>
      </TableContainer>
    </>
  );
}

export default MiniTable;
