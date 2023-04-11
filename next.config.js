module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://davidluby.com/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};