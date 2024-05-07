"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InvoiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    async function fetchInvoice() {
      const response = await fetch(`/api/invoices/${id}`);
      const data = await response.json();
      setInvoice(data);
    }

    if (id) {
      fetchInvoice();
    }
  }, [id]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div>
      <h1>Invoice Details</h1>
      <p>Client: {invoice.clientName}</p>
      <p>Amount Due: ${invoice.debt}</p>
      <p>Date Issued: {invoice.dateTime}</p>
      <p>Due Date: {invoice.dueDate}</p>
      <p>Completed: {invoice.completed ? "Yes" : "No"}</p>
    </div>
  );
}
