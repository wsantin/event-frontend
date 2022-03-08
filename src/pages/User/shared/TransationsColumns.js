import { toDate, format } from 'date-fns-tz'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

export let transationsColumns = (handlerTransaction) => [
  {
    accessor: "id",
    Header: "Id",
    Cell: ({ row }) => {
      return row.values.id + ' 👉'
    }
  },
  {
    accessor: "code",
    Header: "Code",
  },
  {
    accessor: "credit_amount",
    Header: "Credit input",
    Cell: ({ row }) => {
      return <Chip label={row.values.credit_amount} style={{background: row.values.credit_amount > 0? '#28a745': ''}}/>
    },
  },
  {
    accessor: "output_amount",
    Header: "Credit out",
    Cell: ({ row }) => {
      return <Chip label={row.values.output_amount} style={{background:  row.values.output_amount > 0? '#cb1b16': ''}}/>
    },
  },
  {
    accessor: "credit_total",
    Header: "Credit Total",
    Cell: ({ row }) => {
      return <Chip label={row.values.credit_total}/>
    },
  }
];
