"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InvoiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState(null);

  const query = `
  query {
    invoice {
      id
    }
  }
`;

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const response = await fetch(`${process.env.API_URL}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const responseData = await response.json();
        if (response.ok && responseData.data) {
          setInvoice(responseData.data.invoices);
        } else {
          throw new Error(
            responseData.errors?.map((e) => e.message).join(", ") ||
              "Error fetching invoice"
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
        // setError(error.message);
      } finally {
        // setLoading(false);
      }
    }

    if (id) {
      fetchInvoice();
    }
  }, [id, query]);

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
