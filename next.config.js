/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://http://18.218.119.251:8080/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};