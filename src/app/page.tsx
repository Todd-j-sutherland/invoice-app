import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Invoice Management System</h1>
      <Link href="/invoices">View Invoices</Link>
      <br />
      <Link href="/new-invoice">Create New Invoice</Link>
    </div>
  );
}
