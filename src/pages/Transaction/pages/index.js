import React, { useEffect, useState, useCallback} from "react";
import { useHistory } from "react-router";
import { Home } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchReceitps,
//   selectMessage,
// } from "../redux/slices/MessageSlice";
import CustomBreadcrumbs from "../../../components/UI/CustomBreadcrumbs";
import EnhancedTable from "../../../components/UI/EnhancedTable";
import { transationsColumns } from '../shared/TransationsColumns'

import { getTransactionsPagination} from '../../../api/Transaction'

const TransactionBreadcurmbs = () => {
  const history = useHistory();
  const nextPage = (next) => history.push(next);
  const navs = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Home fontSize="small" />,
    },
  ];
  return (
    <CustomBreadcrumbs
      nextPage={nextPage}
      navs={navs}
      activePage={{ name: "Transactions"}}
    />
  );
};


const Transaction = (props) => {
  
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [ items, setItems] = useState([])

  const _getTransactionsPagination = useCallback(() => {
    getTransactionsPagination(page, perPage, orderBy, order, search)
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

  const handlerTransaction= useCallback( (id)=>{
    console.log("id: ",id)
    // history.push({pathname: `${type}/manager`});
  }, [])

  useEffect(async () => {
    _getTransactionsPagination()
  }, []);

  return (
    <div>
      <TransactionBreadcurmbs />
      <EnhancedTable columns={transationsColumns()} data={items} />
    </div>
  );
}

export default Transaction;
