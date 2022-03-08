import { toDate, format } from 'date-fns-tz'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

export let userCustomerColumns = (handlerManager) => [
  {
    accessor: "id",
    Header: "Id",
    Cell: ({ row }) => {
      return row.values.id + ' 👉'
    }
  },
  {
    accessor: "telegram",
    Header: "Telegram",
  },
  {
    accessor: "name",
    Header: "Name",
  },
  {
    accessor: "status",
    Header: "Status",
    aggregate: 'average',
    Cell: ({ row }) => {
      const status = row.values.status
      if(status === 'code') return <Chip label="Eithout Validation Code" />
      else if(status === 'pending') return <Chip label="To Activate" />
      else if(status === 'aproved') return <Chip label="aproved" style={{background: '#28a745'}}/>
      else if(status === 'desactivate') return <Chip label="Disabled" />
      else if(status === 'desactivate_bot') return <Chip label="Disabled Bot" />
      return ""
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
    accessor: "updated_at",
    Header: "Date Updated",
    Cell: ({row}) => {
      const parisDate = format( toDate(row.values.created_at), 'yyyy-MM-dd HH:mm')
      return parisDate
    }
  },
  {
    accessor: "options",
    Header: "Options",
    Cell: ({ row }) => {
      return <Button variant="contained" onClick={()=>handlerManager(row.values.id, 'customers')}> Manage </Button>
    }
  },
];

export let userOperatorsColumns = (handlerManager) => [
  {
    accessor: "id",
    Header: "Id",
    Cell: ({ row }) => {
      return row.values.id + ' 👉'
    }
  },
  {
    accessor: "telegram",
    Header: "Telegram",
  },
  {
    accessor: "name",
    Header: "Name",
  },
  {
    accessor: "status",
    Header: "Status",
    aggregate: 'average',
    Cell: ({ row }) => {
      const status = row.values.status
      if(status === 'code') return <Chip label="Eithout Validation Code" />
      else if(status === 'pending') return <Chip label="To Activate" />
      else if(status === 'aproved') return <Chip label="aproved" style={{background: '#28a745'}}/>
      else if(status === 'desactivate') return <Chip label="Disabled" />
      else if(status === 'desactivate_bot') return <Chip label="Disabled Bot" />
      return ""
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
    accessor: "updated_at",
    Header: "Date Updated",
    Cell: ({row}) => {
      const parisDate = format( toDate(row.values.created_at), 'yyyy-MM-dd HH:mm')
      return parisDate
    }
  },
  {
    accessor: "options",
    Header: "Options",
    Cell: ({ row }) => {
      return <Button variant="contained" onClick={()=>handlerManager(row.values.id, 'operators')}> Manage </Button>
    }
  },
];

