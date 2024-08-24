/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'www.bing.com',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'th.bing.com',
              pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.postimg.cc',
            pathname: '/**',
          },
      ],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
