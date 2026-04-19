const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/used-car-dealers",
        destination: "/dealers-used-cars",
        permanent: true,
      },
      {
        source: "/used-car-dealers/",
        destination: "/dealers-used-cars",
        permanent: true,
      },
      {
        source: "/accident-car-dealers",
        destination: "/dealers-accident",
        permanent: true,
      },
      {
        source: "/accident-car-dealers/",
        destination: "/dealers-accident",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
