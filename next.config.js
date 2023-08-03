module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.davidluby.com/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};