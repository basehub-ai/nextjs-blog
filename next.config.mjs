/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["basehub.earth"],
  },
  experimental: {
    serverComponentsExternalPackages: ["shiki"],
  },
};

export default nextConfig;
