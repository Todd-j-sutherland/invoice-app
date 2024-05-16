"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function NewInvoice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submissionError, setSubmissionError] = useState("");

  const onSubmit = async (data) => {
    const invoice = {
      ...data,
      debt: parseFloat(data.debt),
      dueDate: new Date(data.dueDate).toISOString(),
    };
    console.log("Invoice data:", invoice);
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
        // Optionally reset form or redirect user here
      } else {
        setSubmissionError("Failed to add invoice.");
        console.error("GraphQL Errors:", responseData.errors);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setSubmissionError("Network error, try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 max-w-xl mx-auto"
    >
      <h1 className="text-xl font-bold">Create New Invoice</h1>
      {submissionError && <p className="text-red-500">{submissionError}</p>}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Client Name
        </label>
        <input
          type="text"
          {...register("clientName", { required: "Client Name is required" })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Client Name"
        />
        {errors.clientName && (
          <p className="text-red-500 text-xs">{errors.clientName.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Debt
        </label>
        <input
          type="number"
          {...register("debt", { required: "Debt is required" })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Debt"
        />
        {errors.debt && (
          <p className="text-red-500 text-xs">{errors.debt.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Due Date
        </label>
        <input
          type="date"
          {...register("dueDate", { required: "Due Date is required" })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.dueDate && (
          <p className="text-red-500 text-xs">{errors.dueDate.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Add Invoice
      </button>
    </form>
  );
}
