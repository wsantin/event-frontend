import { toDate, format } from 'date-fns-tz'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import { COLOR_STATUS_MESSAGE } from '../../../constants/defaultValues'

export let messagesDetailsColumns = (handlerResend) => [
  // {
  //   accessor: "id",
  //   Header: "Id",
  //   Cell: ({ row }) => {
  //     return row.values.id + ' 👉'
  //   }
  // },
  {
    accessor: "country.code",
    Header: "Country",
  },
  {
    accessor: "phone",
    Header: "Phone",
  },
  {
    accessor: "price",
    Header: "Price",
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
    accessor: "description",
    Header: "Description",
    maxWidth : 30
  },
  // {
  //   accessor: "created_at",
  //   Header: "Date Created",
  //   Cell: ({row}) => {
  //     const parisDate = format( toDate(row.values.created_at), 'yyyy-MM-dd HH:mm')
  //     return parisDate
  //   }
  // },
  {
    accessor: "sent_at",
    Header: "Date Send",
    Cell: ({row}) => {
      
      // const parisDate = format( toDate(row.values.sent_at), 'yyyy-MM-dd HH:mm')
      return row.values.sent_at
    }
  },
  {
    accessor: "options",
    Header: "Options",
    Cell: ({ row }) => {
      if(row.values.status === 'failed' || row.values.status === 'canceled'){
        return <Button onClick={()=>handlerResend(row.values.id)}> Resend </Button>
      }
      return ''
    }
  },
];
