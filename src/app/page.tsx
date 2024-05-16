"use client";

export const dynamic = "force-dynamic";

// import getCurrentUser from "./actions/getCurrentUser";
// import getInvoices, { IInvoicesParams } from "./actions/getInvoices";
import { useState, useEffect } from "react";
import InvoiceCard from "../components/invoice/InvoiceCard";
import EmptyState from "../components/shared/EmptyState";
import HeaderControls from "../components/shared/HeaderControls";
import { fetchInvoicesQuery } from "@/helpers/fetchInvoicesQuery";

interface HomeProps {
  searchParams: IInvoicesParams;
}

const Home = ({ searchParams }: HomeProps) => {
  // const invoices = null;
  const currentUser = null;
  // const invoices = await getInvoices(searchParams);
  // const currentUser = await getCurrentUser();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/graphql`, {
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

  if (invoices?.length === 0) {
    return (
      <>
        <HeaderControls
          currentUser={currentUser}
          numOfInvoices={invoices?.length}
        />
        <EmptyState
          title="There is nothing here"
          subtitle="Create a new invoice by clicking the New Invoice button and get started"
        />
      </>
    );
  }

  return (
    <>
      <HeaderControls
        currentUser={currentUser}
        numOfInvoices={invoices?.length}
      />
      <div className="flex flex-col gap-3 overflow-y-auto">
        {invoices?.map((invoice, index) => (
          <InvoiceCard key={index} invoice={invoice} />
        ))}
      </div>
    </>
  );
};

export default Home;
