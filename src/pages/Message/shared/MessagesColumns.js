import { toDate, format } from 'date-fns-tz'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import { COLOR_STATUS_MESSAGE } from '../../../constants/defaultValues'

export let messagesColumns = (handlerMessage) => [
  {
    accessor: "id",
    Header: "Id",
    Cell: ({ row }) => {
      return row.values.id + ' 👉'
    }
  },
  {
    accessor: "user_name",
    Header: "User",
  },
  {
    accessor: "gateway_name",
    Header: "Gateway",
  },
  {
    accessor: "sender",
    Header: "Sender",
    maxWidth : 30
  },
  {
    accessor: "status",
    Header: "Status",
    Cell: ({ row }) => {
      const status = COLOR_STATUS_MESSAGE(row.values.status) 
      return <Chip label={status.title} style={{background: status.background}} />
    },
  },
  {
    accessor: "message_detail_total",
    Header: "Total Qty",
  },
  {
    accessor: "message_detail_queue",
    Header: "Queue Qty",
  },
  {
    accessor: "message_detail_in_proccess",
    Header: "In Proccess Qty",
  },
  {
    accessor: "message_detail_failed",
    Header: "Failed Qty",
  },
  {
    accessor: "message_detail_canceled",
    Header: "Canceled Qty",
  },
  {
    accessor: "message_detail_success",
    Header: "Success Qty",
  },
  {
    accessor: "created_at",
    Header: "Date Created",
    Cell: ({row}) => {
      const parisDate = format( toDate(row.values.created_at), 'yyyy-MM-dd HH:mm')
      return parisDate
    }
  },
  {
    accessor: "options",
    Header: "Options",
    Cell: ({ row }) => {
      return <Button onClick={()=>handlerMessage(row.original)}> View Message </Button>
    }
  },
];
