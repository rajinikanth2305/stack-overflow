const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: false, // <- Set this option to false.
    serverComponents: true,
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};
module.exports = nextConfig;
