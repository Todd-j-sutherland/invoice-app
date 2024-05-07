"use client";

import { useState } from "react";

export default function NewInvoice() {
  const [clientName, setClientName] = useState("");
  const [debt, setDebt] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const invoice = { clientName, debt: parseFloat(debt), dueDate };

    const mutation = `
      mutation AddInvoice($clientName: String!, $debt: Float!, $dueDate: String!) {
        addInvoice(clientName: $clientName, debt: $debt, dueDate: $dueDate) {
          id
          clientName
          debt
          dateTime
          dueDate
          completed
        }
      }
    `;

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: invoice,
        }),
      });

      const responseData = await response.json();
      if (response.ok && responseData.data) {
        console.log("Invoice added:", responseData.data);
        // Handle successful response
      } else {
        // Handle errors from the server
        console.error("GraphQL Errors:", responseData.errors);
      }
    } catch (error) {
      console.error("Network Error:", error);
      // Handle network errors
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Invoice</h1>
      <input
        type="text"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Debt"
        value={debt}
        onChange={(e) => setDebt(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Add Invoice</button>
    </form>
  );
}
