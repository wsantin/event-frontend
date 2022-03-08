import React, { useEffect, useState, useCallback} from "react";
import { useHistory } from "react-router";
import { Home } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchReceitps,
//   selectMessage,
// } from "../redux/slices/MessageSlice";
import MessageTable from "../../../components/Message/MessageTable";
import CustomBreadcrumbs from "../../../components/UI/CustomBreadcrumbs";
import EnhancedTable from "../../../components/UI/EnhancedTable";
import { messagesColumns } from '../shared/MessagesColumns'

import { getMessagesPagination} from '../../../api/Message'

const MessageBreadcurmbs = () => {
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
      activePage={{ name: "Messages"}}
    />
  );
};


const Message = (props) => {
  
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [ items, setItems] = useState([])

  const _getMessagesPagination = useCallback(() => {
    getMessagesPagination(page, perPage, orderBy, order, search)
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

  const handlerMessage= useCallback( (message)=>{
    history.push({
      pathname: `/dashboard/messages/${message.id}/details`,
      state:{
        message: message
      }
    });
  }, [])

  useEffect(async () => {
    _getMessagesPagination()
  }, []);

  return (
    <div>
      <MessageBreadcurmbs />
      <EnhancedTable columns={messagesColumns(handlerMessage)} data={items} />
    </div>
  );
}

export default Message;
