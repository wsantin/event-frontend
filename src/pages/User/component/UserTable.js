import React, { useEffect, useState, useCallback} from "react";

import { useHistory } from "react-router";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import {
  userCustomerColumns,
  userOperatorsColumns
} from "../shared/UsersColumns";
import EnhancedTable from "../../../components/UI/EnhancedTable";

import { getUsersCustomersPagination, getUsersOperatorsPagination} from '../../../api/User'

function UserTable(props) {
  const { userType } = props
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [ columns, setColumns] = useState(userCustomerColumns)
  const [ items, setItems] = useState([])

  const _getUsersCustomersPagination = useCallback(() => {
    setIsLoading(true)
    getUsersCustomersPagination(page, perPage, orderBy, order, search)
      .then((res) => {
        const { data: { items, total } } = res;
        setItems(items);
        setIsLoading(false);
        setTotalItems(total);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [page, perPage, orderBy, order, search]);

  const _getUsersOperatorsPagination = useCallback(() => {
    setIsLoading(true)
    getUsersOperatorsPagination(page, perPage, orderBy, order, search)
      .then((res) => {
        const { data: { items, total } } = res;
        setItems(items);
        setIsLoading(false);
        setTotalItems(total);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [page, perPage, orderBy, order, search]);

  const handlerManager= useCallback( (userId, type)=>{
    console.log("userType: ",type)
    history.push({
      pathname: `${type}/manager`,
      state: {
        userId: userId,
        userType: type
      }
    });
  }, [])

  useEffect(async () => {
    if (userType === "customers") {
      setColumns(userCustomerColumns(handlerManager))
      _getUsersCustomersPagination()
    } else if (userType === "operators") {
      setColumns(userOperatorsColumns(handlerManager))
      _getUsersOperatorsPagination()
    } else {
    }
  }, [userType]);

  return (
    <Box sx={{ width: "100%", height: "400px" }}>
      {/* <CssBaseline /> */}
      <EnhancedTable columns={columns} data={items} loading={isLoading}/>
    </Box>
  );
}

export default UserTable;
