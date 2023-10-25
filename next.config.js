module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.davidluby.com/api/:path*",//"http://127.0.0.1:5000/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};