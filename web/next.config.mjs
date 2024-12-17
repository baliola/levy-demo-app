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
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com"
      },
      {
        protocol: "https",
        hostname: "mandala-hub-bucket.s3.ap-southeast-1.amazonaws.com"
      }
    ],
  },
};

export default nextConfig;
