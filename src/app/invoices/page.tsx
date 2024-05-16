"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "@/assets/icons";
import getShortId from "@/helpers/getShortId";
import { format } from "date-fns";
import { fetchInvoicesQuery } from "@/helpers/fetchInvoicesQuery";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: fetchInvoicesQuery }),
        });

        const responseData = await response.json();
        if (response.ok && responseData.data) {
          setInvoices(responseData.data.invoices);
        } else {
          throw new Error(
            responseData.errors?.map((e) => e.message).join(", ") ||
              "Error fetching invoices"
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <p>Loading invoices...</p>;
  if (error) return <p>Error loading invoices: {error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Invoices</h1>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="p-4 bg-gray-100 rounded-lg">
            <Link
              href={`/invoices/${invoice.id}`}
              className="w-full bg-white dark:bg-[#1E2139] grid-cols-2 sm:grid-cols-[50px_110px_repeat(3,1fr)_20px] grid md:grid-cols-[80px_120px_repeat(3,1fr)_20px] items-center py-6 sm:py-4 px-6 md:px-8 rounded-md font-medium text-sm text-primary gap-1 sm:gap-4"
            >
              <div className="mb-6 font-bold uppercase sm:mb-0">
                <span className="text-[#7E88C3]">#</span>
                {getShortId(invoice.id)}
              </div>
              <span className="text-[#7E88C3] dark:text-[#DFE3FA]">
                Due {format(Number(invoice.dueDate), "dd MMM yyyy")}
              </span>
              <span className="mb-6 sm:mb-0 col-start-2 row-start-1 justify-self-end sm:justify-self-start sm:col-auto sm:row-auto text-[#858BB2] dark:text-[#FFFFFF]">
                {invoice.clientName}
              </span>
              <span className="col-start-1 row-start-3 text-base font-bold sm:col-auto sm:row-auto md:pr-5 sm:justify-self-end">
                $ {invoice.debt}
              </span>
              <span className="justify-center hidden sm:flex">
                <ArrowRight />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
