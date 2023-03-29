/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://18.218.119.251/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};