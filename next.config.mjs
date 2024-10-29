const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.basehub.com",
      },
    ],
  },
};

export default nextConfig;
