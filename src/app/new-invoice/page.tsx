"use client";

import { useState } from "react";

export default function NewInvoice() {
  const [clientName, setClientName] = useState("");
  const [debt, setDebt] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const invoice = { clientName, debt, dueDate };
    await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });
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
