export const fetchInvoicesQuery = `
  query {
    invoices {
      id
      clientName
      debt
      dateTime
      dueDate
      completed
    }
  }
`;
