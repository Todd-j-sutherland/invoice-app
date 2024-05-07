// pages/api/invoices/index.js
export default async function handler(req, res) {
  const { method } = req;
  const backendUrl = "http://localhost:4000";

  switch (method) {
    case "GET":
      try {
        const backendRes = await fetch(`${backendUrl}/invoices`, {
          method: "GET",
        });
        const data = await backendRes.json();
        res.status(backendRes.status).json(data);
      } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
      }
      break;
    case "POST":
      try {
        const backendRes = await fetch(`${backendUrl}/invoices`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        });
        const data = await backendRes.json();
        res.status(backendRes.status).json(data);
      } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
