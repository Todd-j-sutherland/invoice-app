/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL:
      process.env.NODE_ENV === "production" ? "" : "http://localhost:4000",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
