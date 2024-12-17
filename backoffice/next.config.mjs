/* eslint-disable @typescript-eslint/explicit-function-return-type */
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mandalachain.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "devhub.mandalachain.io",
      },
      {
        protocol: "https",
        hostname: "mandala-hub-bucket.s3.ap-southeast-1.amazonaws.com"
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/project',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/project',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
