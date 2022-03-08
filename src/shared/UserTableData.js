import faker from "faker";

export let userTableData = [];
for (let i = 1; i <= 14; i++) {
  userTableData[i] = {
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.cityName(),
    amount: Math.floor(Math.random() * 120),
  };
}

export let userTableColumns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "FirstName",
    accessor: "firstName",
  },
  {
    Header: "LastName",
    accessor: "lastName",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
];
