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
    accessor: "gateway.description",
    Header: "Gateway",
  },
  {
    accessor: "sender",
    Header: "Sender",
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
      return <Button onClick={()=>handlerMessage(row.values.id)}> View Message </Button>
    }
  },
];
