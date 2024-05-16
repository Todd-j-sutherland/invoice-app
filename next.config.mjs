/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL:
      process.env.NODE_ENV === "production" ? "" : "http://localhost:4000",
    Google: process.env.PASSWORD,
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
