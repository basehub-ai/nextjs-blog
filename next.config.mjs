/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "basehub.earth",
      },
    ],
  },
};

export default nextConfig;
