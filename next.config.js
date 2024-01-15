//** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remove the deprecated 'domains' property:
    // domains: ['utfs.io'],

    // Use 'remotePatterns' for secure and flexible configuration:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        // Omit the 'port' property if not required:
         port: "",
      },
    ],
  },
};

module.exports = nextConfig;
