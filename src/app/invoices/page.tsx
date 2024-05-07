"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function fetchInvoices() {
      const response = await fetch("/api/invoices");
      const data = await response.json();
      setInvoices(data);
    }

    fetchInvoices();
  }, []);

  return (
    <div>
      <h1>Invoices</h1>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <Link href={`/invoices/${invoice.id}`}>
            <a>
              {invoice.clientName} - ${invoice.debt} - Due: {invoice.dueDate}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
