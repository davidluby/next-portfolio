module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.davidluby.com/api/:path*",
        //destination: "http://127.0.0.1:5000/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};